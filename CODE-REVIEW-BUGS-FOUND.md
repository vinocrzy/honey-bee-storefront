# Code Review Report - Potential Bugs & Issues Found
# Honey Bee Storefront - Phase 8.4 QA Testing
# Date: April 15, 2026

## Executive Summary

**Total Issues Found**: 8  
**Critical**: 2  
**High**: 3  
**Medium**: 2  
**Low**: 1

---

## Critical Issues (P0 - MUST FIX)

### BUG #1: Checkout API Mismatch - Missing Shipping Address Fields  
**File**: `src/services/checkout.ts` + `src/app/checkout/page.tsx`  
**Severity**: ❌ CRITICAL  
**Impact**: **CHECKOUT WILL FAIL** - Guest checkout cannot complete

**Problem**:
The checkout page sends detailed shipping address data:
```typescript
shipping_address: {
  first_name: form.shippingFirstName.trim(),
  last_name: form.shippingLastName.trim(),
  address_line1: form.shippingAddress1.trim(),
  address_line2: form.shippingAddress2.trim() || undefined,
  city: form.shippingCity.trim(),
  state: form.shippingState.trim(),
  postal_code: form.shippingPostalCode.trim(),
  country: form.shippingCountry.trim(),
  phone: formatPhoneToE164(form.shippingPhone),
}
```

BUT the `guestCheckout()` function in `checkout.ts` ONLY sends:
```typescript
{
  cart_token: data.cart_token,
  payment_method: 'pending',
  email: data.customer_email,
  first_name: data.shipping_address.first_name,
  last_name: data.shipping_address.last_name,
  phone: data.customer_phone,
  note: data.notes,
}
```

**Missing**: address_line1, city, state, postal_code, country (all shipping fields except name/phone!)

**Expected Backend API** (from Laravel):
```php
// POST /public/checkout
{
  "cart_token": "abc123...",
  "payment_method": "pending",
  "email": "customer@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+919876543210",
  "address_line1": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postal_code": "400001",
  "country": "IN",
  "note": "Leave at door"
}
```

**Fix Required**:  
Update `guestCheckout()` in `src/services/checkout.ts`:

```typescript
export const guestCheckout = async (data: GuestCheckoutRequest): Promise<CheckoutResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<CheckoutResponse>>(
      '/public/checkout',
      {
        cart_token: data.cart_token,
        payment_method: 'pending',
        email: data.customer_email,
        first_name: data.shipping_address.first_name,
        last_name: data.shipping_address.last_name,
        phone: data.customer_phone,
        address_line1: data.shipping_address.address_line1, // ADD
        address_line2: data.shipping_address.address_line2, // ADD
        city: data.shipping_address.city, // ADD
        state: data.shipping_address.state, // ADD
        postal_code: data.shipping_address.postal_code, // ADD
        country: data.shipping_address.country, // ADD
        note: data.notes,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
```

**Status**: 🚨 BLOCKER - Checkout cannot work without this fix

---

### BUG #2: Cart Token Not Saved After Adding First Item  
**File**: `src/contexts/CartContext.tsx`  
**Severity**: ❌ CRITICAL  
**Impact**: **CART PERSISTENCE BROKEN** - Cart will be lost on page refresh

**Problem**:  
In `addToCart()` function:
```typescript
// Add item to cart
const updatedCart = await cartApi.addItem(data, token || undefined);
setCart(updatedCart);

// Save token if cart created
if (updatedCart.token && !isAuthenticated()) {
  setCartToken(updatedCart.token);
}
```

**Issue**: `addItem()` API might not return `cart.token` field if adding to existing cart. The token should be saved when creating NEW cart, but code assumes `updatedCart.token` exists.

**Scenario**:
1. User visits for first time → no cart token
2. `addToCart()` called → creates cart with token "abc123"
3. `addItem()` returns cart object but **backend might not include token field** in response
4. Token is NOT saved to localStorage → lost on refresh

**Fix Required**:  
Update `addToCart()` in `src/contexts/CartContext.tsx`:

```typescript
const addToCart = useCallback(async (data: AddToCartRequest) => {
  setIsLoading(true);
  setError(null);

  try {
    let token = getCartToken();
    
    // If no cart token exists, create new cart FIRST
    if (!token && !isAuthenticated()) {
      const newCartResponse = await cartApi.createCart();
      token = newCartResponse.token; // Get token from CREATE response
      setCartToken(token); // SAVE IMMEDIATELY after creation
      setCart(newCartResponse.cart);
    }

    // Now add item to the cart (we already have token)
    const updatedCart = await cartApi.addItem(data, token || undefined);
    setCart(updatedCart);

    // Token already saved above, no need to re-save here
  } catch (err) {
    console.error('Failed to add to cart:', err);
    setError(err instanceof Error ? err.message : 'Failed to add to cart');
    throw err;
  } finally {
    setIsLoading(false);
  }
}, [getCartToken, setCartToken]);
```

**Status**: 🚨 BLOCKER - Cart will not persist without this fix

---

## High Priority Issues (P1 - Should Fix)

### BUG #3: Phone Validation Error Message Misleading  
**File**: `src/app/checkout/page.tsx`  
**Severity**: ⚠️ HIGH  
**Impact**: Users confused about phone format

**Problem**:  
Error message says "Invalid Indian phone number (10 digits required, e.g. 98765 43210)" BUT:
- Phone is stored as E.164: `+919876543210` (13 characters with + and country code)
- Users don't understand if they should include "+" or not
- Message doesn't mention "+91" prefix

**Fix**: Update error messages in `validate()` function:
```typescript
} else if (!validatePhoneE164(customerPhoneE164)) {
  newErrors.customerPhone = 'Invalid phone (must be 10 digits, e.g., 98765 43210)';
}
```

Change to:
```typescript
} else if (!validatePhoneE164(customerPhoneE164)) {
  newErrors.customerPhone = 'Invalid phone number. Enter 10 digits without +91 (e.g., 98765 43210)';
}
```

**Status**: ⚠️ Should fix before launch - causes user confusion

---

### BUG #4: No Loading State During Cart Operations  
**File**: `src/app/cart/page.tsx`  
**Severity**: ⚠️ HIGH  
**Impact**: Users can spam update/remove buttons, causing race conditions

**Problem**:  
```typescript
const updateQty = async (itemId: number, qty: number) => {
  if (qty < 1) return removeItem(itemId);
  try {
    await updateQuantity(itemId, qty);
  } catch (err) {
    console.error('Failed to update quantity:', err);
  }
};
```

No loading state shown → User can click "+" button 10 times rapidly → Multiple API calls fired → Race condition.

**Fix**: Add local loading state:
```typescript
const [updating, setUpdating] = useState<number | null>(null);

const updateQty = async (itemId: number, qty: number) => {
  if (qty < 1) return removeItem(itemId);
  setUpdating(itemId);
  try {
    await updateQuantity(itemId, qty);
  } catch (err) {
    console.error('Failed to update quantity:', err);
  } finally {
    setUpdating(null);
  }
};

// In render:
<button 
  onClick={() => updateQty(item.id, item.quantity + 1)}
  disabled={updating === item.id || isLoading}
>
  +
</button>
```

**Status**: ⚠️ Should fix - prevents duplicate API calls

---

### BUG #5: Cart Context Missing Error Handling for Stale Tokens  
**File**: `src/contexts/CartContext.tsx`  
**Severity**: ⚠️ HIGH  
**Impact**: User sees blank cart page if token expires

**Problem**:  
In `refreshCart()`:
```typescript
if (token) {
  try {
    const guestCart = await cartApi.getCart(token);
    setCart(guestCart);
  } catch (err) {
    console.warn('Cart token invalid, clearing:', err);
    localStorage.removeItem(CART_TOKEN_KEY);
    setCart(null);
  }
}
```

This is GOOD - clears invalid token. BUT:
- User doesn't see any message that cart was cleared
- No retry option
- Silent failure (just logs to console)

**Fix**: Show toast/notification when cart token expires:
```typescript
} catch (err) {
  console.warn('Cart token invalid, clearing:', err);
  localStorage.removeItem(CART_TOKEN_KEY);
  setCart(null);
  setError('Your cart has expired. Please add items again.');
}
```

**Status**: ⚠️ Should fix - improves UX

---

## Medium Priority Issues (P2 - Nice to Fix)

### BUG #6: Products Page Shows Static Mock Data  
**File**: `src/app/products/page.tsx`  
**Severity**: ⚠️ MEDIUM  
**Impact**: Page shows hardcoded products instead of API data

**Problem**:  
Lines 28-85 have hardcoded PRODUCTS array:
```typescript
const PRODUCTS = [
  {
    id: 1,
    slug: 'wildflower-honey-bar',
    name: 'Wildflower & Honey Bar',
    price: 22,
    ...
  },
  // ... more static data
];
```

This should fetch from API using `getProducts()` service.

**Fix**: Replace static data with API call:
```typescript
export default async function ProductsPage() {
  let products = [];
  let error = null;
  
  try {
    const response = await getProducts({ per_page: 100 });
    products = response.data;
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = 'Failed to load products';
  }
  
  return <ShopClientShell initialProducts={products} error={error} />;
}
```

**Status**: ⚠️ Should fix - showing test data instead of real products

---

### BUG #7: Missing Error Boundary for Client Components  
**File**: Multiple client components  
**Severity**: ⚠️ MEDIUM  
**Impact**: White screen on unhandled errors

**Problem**:  
No global error boundary wrapping client components. If any component throws unhandled error → white screen.

**Fix**: Add error boundary in `src/app/layout.tsx`:
```typescript
'use client';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Something went wrong</h1>
        <p className="mb-4">{error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  );
}

// Wrap children in ErrorBoundary
<ErrorBoundary FallbackComponent={ErrorFallback}>
  {children}
</ErrorBoundary>
```

**Status**: ⚠️ Nice to have - improves error handling

---

## Low Priority Issues (P3 - Optional)

### BUG #8: Console.log Statements Left in Production Code  
**File**: Multiple files  
**Severity**: ℹ️ LOW  
**Impact**: Console spam, minor performance hit

**Found**:
- `src/contexts/CartContext.tsx:76`: `console.warn('Cart token invalid, clearing:', err);`
- `src/app/cart/page.tsx:24`: `console.error('Failed to update quantity:', err);`
- `src/app/cart/page.tsx:32`: `console.error('Failed to remove item:', err);`
- `src/app/page.tsx:30`: `console.error('Failed to fetch homepage data:', error);`

**Fix**: Replace with proper error logging service or remove for production.

**Status**: ℹ️ Low priority - doesn't break functionality

---

## Testing Priority Order

Based on bugs found, test in this order:

1. **CRITICAL**: Test checkout flow (Bug #1 & #2)
   - Add to cart → cart persists → checkout → verify order creates
   
2. **HIGH**: Test cart operations (Bug #4 & #5)
   - Rapid clicking update buttons
   - Expired cart token handling
   
3. **MEDIUM**: Verify products API integration (Bug #6)
   - Check if real products load from API
   
4. **LOW**: General functionality testing
   - All routes
   - Forms
   - Mobile responsive

---

## Immediate Action Required

**BEFORE TESTING THE STOREFRONT IN BROWSER**:

### Fix Bug #1 (Checkout API)
1. Open `c:\poc\e-com\client-honey-bee\src\services\checkout.ts`
2. Update `guestCheckout()` function to include shipping address fields
3. Save file

### Fix Bug #2 (Cart Token)
1. Open `c:\poc\e-com\client-honey-bee\src\contexts\CartContext.tsx`
2. Update `addToCart()` to save token immediately after cart creation
3. Save file

### Rebuild Storefront
```powershell
cd c:\poc\e-com\client-honey-bee
# Kill current dev server (Ctrl+C)
npm run dev
# Wait for rebuild
```

**THEN** proceed with manual testing checklist.

---

## Estimated Fix Time

- Bug #1 (Checkout API): 5 minutes
- Bug #2 (Cart Token): 10 minutes
- Bug #3 (Phone validation): 2 minutes
- Bug #4 (Loading states): 15 minutes
- Bug #5 (Error handling): 5 minutes
- Bug #6 (Products API): 10 minutes
- Bug #7 (Error boundary): 20 minutes
- Bug #8 (Console logs): 5 minutes

**Total**: ~1 hour 15 minutes

---

## Recommendation

❌ **DO NOT PROCEED WITH TESTING UNTIL BUGS #1 AND #2 ARE FIXED**

These are **BLOCKING BUGS** that will cause:
- ❌ Checkout to fail (no shipping address sent to backend)
- ❌ Cart to be lost on page refresh (token not saved)

**All manual testing will fail** without these fixes.

**Next Steps**:
1. Fix Bug #1 and Bug #2 immediately
2. Restart storefront dev server
3. Run automated API tests: `.\Test-HoneyBeeAPI.ps1`
4. If API tests pass, proceed with manual testing checklist
5. Fix remaining bugs based on priority

---

**QA Sign-Off**: 🔴 BLOCKED - Critical bugs must be fixed before testing can proceed.
