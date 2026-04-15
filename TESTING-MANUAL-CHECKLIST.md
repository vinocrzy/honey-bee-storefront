# Manual Testing Checklist - Honey Bee Storefront
# Complete this checklist while testing the storefront at http://localhost:3000

## Pre-Testing Setup
- [ ] Backend running at http://localhost:8000 (check terminal)  
- [ ] Storefront running at http://localhost:3000 (check terminal)
- [ ] Open http://localhost:3000 in Chrome
- [ ] Open DevTools (F12)
- [ ] Console tab visible
- [ ] Network tab visible  
- [ ] Note: Record ALL errors found

---

## Category 1: Functional Testing - All 26 Routes

### Instructions:
1. Click each link or type URL in address bar
2. Page should load without white screen/crash
3. Check Console tab for RED errors (warnings OK)
4. Check Network tab for FAILED requests (red text)
5. Mark ✅ if loads correctly, ❌ if errors, write bugs in notes

| # | Route | Navigate How | Expected | ✅/❌ | Console Errors? | Network Errors? | Notes/Bugs |
|---|-------|-------------|----------|------|----------------|----------------|-----------|
| 1 | `/` | Click logo | Homepage, featured products | | | | |
| 2 | `/products` | Header > Shop | Products grid | | | | |
| 3 | `/products/[any-product-slug]` | Click product card | Product detail, images, add to cart button | | | | |
| 4 | `/collections` | Header > Collections | Collections list | | | | |
| 5 | `/collections/[any-slug]` | Click collection card | Collection products | | | | |
| 6 | `/search?q=lavender` | Search bar, type "lavender", Enter | Search results | | | | |
| 7 | `/cart` | Click cart icon (top right) | Cart page (empty or items) | | | | |
| 8 | `/checkout` | Cart > "Proceed to Checkout" | Checkout form | | | | |
| 9 | `/checkout/confirmation?order=1` | (After order) or type URL | Order confirmation (or error if no order) | | | | |
| 10 | `/login` | Header > Login | Login form (phone/email + password) | | | | |
| 11 | `/register` | Header > Register | Register form | | | | |
| 12 | `/our-story` | Footer > Our Story | About page, brand story | | | | |
| 13 | `/process` | Footer > Process | Soapmaking process | | | | |
| 14 | `/contact` | Footer > Contact | Contact form | | | | |
| 15 | `/journal` | Footer > Journal | Journal/blog page | | | | |
| 16 | `/ingredients` | Footer > Ingredients | Ingredients info | | | | |
| 17 | `/rituals` | Footer > Rituals | Rituals page | | | | |
| 18 | `/shipping` | Footer > Shipping | Shipping info | | | | |
| 19 | `/returns` | Footer > Returns | Returns policy | | | | |
| 20 | `/privacy` | Footer > Privacy | Privacy policy | | | | |
| 21 | `/terms` | Footer > Terms | Terms of service | | | | |
| 22 | `/invalid-route-xyz` | Type in address bar | Custom 404 page | | | | |
| 23 | `/account` (NOT logged in) | Type in address bar | Should redirect to /login | | | | |
| 24 | `/account` (logged in) | After login > Header > Account | Account dashboard | | | | |
| 25 | `/orders` (logged in) | Account > My Orders | Orders list | | | | |
| 26 | `/orders/1` (logged in) | Click order from list | Order detail | | | | |

**CRITICAL**: If ANY route shows white screen or console errors, STOP and report immediately.

---

## Category 2: E2E Workflow Testing

### Workflow 2.1: Guest Shopping Journey ⭐ CRITICAL

**Instructions**: Follow steps exactly. Mark ✅ when step works, ❌ if fails.

| Step | Action | Expected Result | ✅/❌ | Bugs/Notes |
|------|--------|-----------------|------|-----------|
| 1 | Go to homepage (/) | Homepage loads | | |
| 2 | Click any featured product | Product detail page opens | | |
| 3 | Change quantity to 3 | Quantity input shows "3" | | |
| 4 | Click "Add to Cart" button | Success message appears | | |
| 5 | Check cart badge (top right) | Badge shows "3" | | |
| 6 | Click cart icon | Cart page shows product with qty 3 | | |
| 7 | Click "+

" button twice | Quantity changes to 5 | | |
| 8 | Check subtotal | Price = product price × 5 | | |
| 9 | Click "Proceed to Checkout" | Checkout page loads | | |
| 10 | Fill form:<br>Name: Test Customer<br>Email: test@example.com<br>Phone: +12025551234<br>Address: 123 Main St<br>City: New York<br>State: NY<br>ZIP: 10001 | Form accepts input | | |
| 11 | Click "Place Order" | Loading spinner appears | | |
| 12 | Wait for redirect | Redirects to /checkout/confirmation?order=[id] | | |
| 13 | Check confirmation page | Shows order number and details | | |
| 14 | Click cart icon again | Cart is empty (badge shows 0) | | |

**IF ANY STEP FAILS**: Stop, document the bug, screenshot if possible.

---

### Workflow 2.2: Customer Registration & Login

| Step | Action | Expected Result | ✅/❌ | Bugs/Notes |
|------|--------|-----------------|------|-----------|
| 1 | Click "Register" in header | Register page loads | | |
| 2 | Fill form:<br>Name: Jane Doe<br>Email: jane@test.com<br>Phone: +12025559999<br>Password: password123<br>Confirm: password123 | Form accepts input | | |
| 3 | Click "Register" button | Loading... | | |
| 4 | Wait for response | Redirects to /account | | |
| 5 | Check account page | Shows "Jane Doe", email, phone | | |
| 6 | Check localStorage | Contains "auth_token" key | | |
| 7 | Click "Logout" | Redirects to homepage | | |
| 8 | Check localStorage | "auth_token" removed | | |
| 9 | Click "Login" | Login page loads | | |
| 10 | Enter phone: +12025559999, password: password123 | Form accepts | | |
| 11 | Click "Sign In" | Redirects to /account | | |
| 12 | Check account page | Shows "Jane Doe" profile | | |

---

### Workflow 2.3: Authenticated Checkout

**Prerequisites**: Be logged in as customer (use Workflow 2.2 account)

| Step | Action | Expected Result | ✅/❌ | Bugs/Notes |
|------|--------|-----------------|------|-----------|
| 1 | Add 2 products to cart | Cart badge shows 2+ | | |
| 2 | Go to /checkout | Checkout form loads | | |
| 3 | Check form fields | Name, email, phone pre-filled from profile | | |
| 4 | Fill address, city, state, ZIP | Form accepts | | |
| 5 | Click "Place Order" | Order creates | | |
| 6 | Go to /orders | Order appears in list | | |
| 7 | Click order | Order detail page shows items | | |

---

### Workflow 2.4: Product Search & Filtering

| Step | Action | Expected Result | ✅/❌ | Bugs/Notes |
|------|--------|-----------------|------|-----------|
| 1 | Go to /products | Products grid loads | | |
| 2 | Count products visible | Note number: _______ | | |
| 3 | Type "lavender" in search box | Search input has text | | |
| 4 | Press Enter or click search icon | Redirects to /search?q=lavender | | |
| 5 | Check results | Only products with "lavender" show | | |
| 6 | Go back to /products | All products show again | | |
| 7 | Click category filter (e.g., "Face Care") | Products filter by category | | |
| 8 | Apply price filter ($10-$20) | Products filter by price range | | |
| 9 | Select sort: "Price: Low to High" | Products re-order by price ascending | | |
| 10 | Check URL | Contains query params (e.g., ?category=face-care&min_price=10...) | | |

---

### Workflow 2.5: Cart Persistence

| Step | Action | Expected Result | ✅/❌ | Bugs/Notes |
|------|--------|-----------------|------|-----------|
| 1 | (Start fresh) Clear localStorage | localStorage empty | | |
| 2 | Add product A to cart | Cart badge shows 1 | | |
| 3 | Add product B to cart | Cart badge shows 2 | | |
| 4 | Add product C to cart | Cart badge shows 3 | | |
| 5 | Check localStorage | Contains "cart_token" key | | |
| 6 | Refresh page (F5) | Page reloads | | |
| 7 | Check cart badge | Still shows 3 | | |
| 8 | Go to /cart | All 3 products still in cart | | |
| 9 | Close browser completely | | | |
| 10 | Re-open browser, go to localhost:3000 | | | |
| 11 | Check cart badge | Should still show 3 | | |

**CRITICAL**: If cart doesn't persist, this is a P0 bug - report immediately.

---

## Category 3: Form Validation Testing

### Test 3.1: Login Form Validation

**Go to /login**

| Test | Input Value | Expected Error Message | ✅/❌ | Actual Error |
|------|------------|------------------------|------|--------------|
| Empty login | Leave "Login" field empty, click Submit | "Login is required" or "This field is required" | | |
| Empty password | Leave "Password" empty, click Submit | "Password is required" | | |
| Wrong credentials | Login: wrong@test.com, Password: wrongpass | "Invalid credentials" or "Login failed" | | |

---

### Test 3.2: Register Form Validation

**Go to /register**

| Test | Input Value | Expected Error Message | ✅/❌ | Actual Error |
|------|------------|------------------------|------|--------------|
| Empty name | Leave name empty | "Name is required" | | |
| Invalid email | Email: "notanemail" | "Valid email required" | | |
| Invalid phone (no +) | Phone: "2025551234" | "Phone must be E.164 format" or "Must start with +" | | |
| Invalid phone (too short) | Phone: "+1234" | "Invalid phone number" | | |
| Short password | Password: "123" | "Password must be at least 8 characters" | | |
| Password mismatch | Password: "password123"<br>Confirm: "different" | "Passwords must match" | | |

---

### Test 3.3: Checkout Form Validation

**Go to /checkout (with items in cart)**

| Test | Input Value | Expected Error Message | ✅/❌ | Actual Error |
|------|------------|------------------------|------|--------------|
| Empty name | Leave name empty, submit | "Name is required" | | |
| Invalid email | Email: "notanemail" | "Valid email required" | | |
| Phone without + | Phone: "2025551234" | "Must start with +" | | |
| Phone invalid | Phone: "+1234" | "Invalid phone" | | |
| Empty address | Leave address empty | "Address is required" | | |
| Empty city | Leave city empty | "City is required" | | |
| Empty ZIP | Leave ZIP empty | "ZIP code is required" | | |

---

## Category 4: API Integration Testing

**Use PowerShell to test backend APIs**

### Quick API Test Commands (PowerShell)

```powershell
# Test 1: Get all products
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/public/products" -Headers @{"X-Store-ID"="2"; "Accept"="application/json"} | ConvertTo-Json -Depth 2

# Test 2: Search products
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/public/products?search=lavender" -Headers @{"X-Store-ID"="2"} | ConvertTo-Json -Depth 2

# Test 3: Get single product
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/public/products/manuka-honey-cleansing-bar" -Headers @{"X-Store-ID"="2"} | ConvertTo-Json -Depth 2

# Test 4: Get categories
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/public/categories" -Headers @{"X-Store-ID"="2"} | ConvertTo-Json -Depth 2

# Test 5: Create cart
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/public/cart" -Method POST -Headers @{"X-Store-ID"="2"; "Content-Type"="application/json"} | ConvertTo-Json -Depth 2

# Save the cart token from above, then:
# Test 6: Get cart
$token = "PASTE_TOKEN_HERE"
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/public/cart/$token" -Headers @{"X-Store-ID"="2"} | ConvertTo-Json -Depth 2

# Test 7: Add item to cart
$body = @{product_id=26; quantity=2} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/public/cart/$token/items" -Method POST -Headers @{"X-Store-ID"="2"; "Content-Type"="application/json"} -Body $body | ConvertTo-Json -Depth 3
```

### API Test Results Table

| # | Endpoint | Method | Expected Status | ✅/❌ | Response Time | Notes |
|---|----------|--------|-----------------|------|---------------|-------|
| 1 | `/public/products` | GET | 200 | | ms | |
| 2 | `/public/products?search=lavender` | GET | 200 | | ms | |
| 3 | `/public/products/{slug}` | GET | 200 | | ms | |
| 4 | `/public/products?is_featured=1` | GET | 200 | | ms | |
| 5 | `/public/categories` | GET | 200 | | ms | |
| 6 | `/public/categories/{slug}` | GET | 200 | | ms | |
| 7 | `/public/cart` | POST | 201 | | ms | Returns token |
| 8 | `/public/cart/{token}` | GET | 200 | | ms | |
| 9 | `/public/cart/{token}/items` | POST | 201 | | ms | Add item |
| 10 | `/public/cart/items/{id}` | PATCH | 200 | | ms | Update qty |
| 11 | `/public/cart/items/{id}` | DELETE | 200 | | ms | Remove |
| 12 | `/public/customer/register` | POST | 201 | | ms | |
| 13 | `/public/customer/login` | POST | 200 | | ms | |
| 14 | `/public/customer/profile` | GET | 200 | | ms | Needs auth |
| 15 | `/public/customer/orders` | GET | 200 | | ms | Needs auth |
| 16 | `/public/customer/orders/{id}` | GET | 200 | | ms | Needs auth |
| 17 | `/public/customer/logout` | POST | 200 | | ms | |
| 18 | `/public/checkout/guest` | POST | 201 | | ms | |
| 19 | `/public/checkout` | POST | 201 | | ms | Needs auth |

---

## Category 5: Error Handling Testing

### Test 5.1: Network Error Simulation

1. [ ] Stop backend (Ctrl+C in backend terminal)
2. [ ] Go to http://localhost:3000/products
3. [ ] Check: Does it show error message? (✅ if yes, ❌ if crash/white screen)
4. [ ] Check: Is there a "Retry" button? (✅ if yes)
5. [ ] Restart backend (`php artisan serve`)
6. [ ] Click "Retry" button
7. [ ] Check: Does page load correctly now? (✅ if yes)

**Result**: ✅/❌ ______  
**Notes**: _______________________

---

### Test 5.2: 404 Page

1. [ ] Go to http://localhost:3000/this-page-does-not-exist
2. [ ] Check: Custom 404 page shows? (not default Next.js 404)
3. [ ] Check: "Back to Home" button exists?
4. [ ] Click button, redirects to homepage?

**Result**: ✅/❌ ______  
**Notes**: _______________________

---

### Test 5.3: Out of Stock Product

**Manual setup required**: Edit a product in backend to set `stock_quantity = 0`

1. [ ] Go to product detail page for out-of-stock product
2. [ ] Check: Shows "Out of Stock" message?
3. [ ] Check: "Add to Cart" button disabled/hidden?
4. [ ] Try to add to cart (if button still visible)
5. [ ] Check: Should show error or prevent adding

**Result**: ✅/❌ ______  
**Notes**: _______________________

---

## Category 6: Cross-Browser Testing

### Test on 3 Browsers

**Run Workflow 2.1 (Guest Shopping) on each browser**:

1. **Google Chrome**:
   - [ ] Workflow 2.1 passes
   - [ ] No console errors
   - [ ] No visual glitches
   - **Notes**: _______________________

2. **Mozilla Firefox**:
   - [ ] Workflow 2.1 passes
   - [ ] No console errors
   - [ ] No visual glitches
   - **Notes**: _______________________

3. **Microsoft Edge**:
   - [ ] Workflow 2.1 passes
   - [ ] No console errors
   - [ ] No visual glitches
   - **Notes**: _______________________

---

## Category 7: Mobile Responsive Testing

**Use Chrome DevTools Device Emulation** (Ctrl+Shift+M)

### Test 7.1: iPhone 12 Pro (390x844)

1. [ ] Open DevTools (F12)
2. [ ] Click device icon (Ctrl+Shift+M)
3. [ ] Select "iPhone 12 Pro" from dropdown
4. [ ] Test these pages:

| Page | Layout Check | ✅/❌ | Issues |
|------|-------------|------|--------|
| Homepage (/) | Hero text readable, images not cut off | | |
| Products (/products) | Grid shows 2 columns | | |
| Product detail | Images stack vertically, add to cart button visible | | |
| Cart | Table responsive, not horizontally scrolling | | |
| Checkout | Form fields stack vertically | | |

5. [ ] Check navigation: Hamburger menu works?
6. [ ] Check buttons: Min 44x44px (tap-friendly)?
7. [ ] Check text: Min 16px (readable without zoom)?

**Overall Result**: ✅/❌ ______  
**Critical Issues**: _______________________

---

### Test 7.2: iPad Air (820x1180)

1. [ ] Select "iPad Air" in DevTools
2. [ ] Products grid: Shows 3-4 columns? ✅/❌ ______
3. [ ] Navigation: Desktop or tablet nav? _______
4. [ ] Layout: Proper spacing? ✅/❌ ______

**Result**: ✅/❌ ______

---

### Test 7.3: Desktop 1920x1080

1. [ ] Select "Responsive" → 1920 × 1080
2. [ ] Check max-width container (content not ultra-wide)? ✅/❌ ______
3. [ ] Products grid: 4 columns? ✅/❌ ______
4. [ ] Footer: 4 columns? ✅/❌ ______

**Result**: ✅/❌ ______

---

## Bug Reporting

### Instructions:
For each bug found, fill out this template and add to the list below.

---

### Bug #1: [Title]

**Severity**: Critical / High / Medium / Low  
**Page**: [URL or route]  
**Steps to Reproduce**:
1. 
2. 
3. 

**Expected**: [What should happen]  
**Actual**: [What actually happened]  
**Browser**: Chrome / Firefox / Edge  
**Console Errors**: [Paste any console errors]  
**Screenshot**: [Describe or attach]  
**Status**: 🐛 OPEN

---

### Bug #2: [Title]

(Copy template above for each new bug)

---

## Testing Summary

**Total Tests Completed**: ___ / 144  
**Passed**: ___  
**Failed**: ___  
**Critical Bugs Found**: ___  
**High Priority Bugs**: ___  
**Medium/Low Bugs**: ___  

**Time Spent**: ___ hours

---

## Final Recommendation

**Production Readiness**:  
- [ ] ✅ APPROVED FOR PRODUCTION (zero critical bugs, all workflows work)  
- [ ] ⚠️  APPROVED WITH FIXES (minor bugs, can launch with hot-fix plan)  
- [ ] ❌ BLOCKED (critical bugs, must fix before launch)

**Critical Fixes Required Before Launch**:
1. [List critical bug #1]
2. [List critical bug #2]

**Nice-to-Have Improvements** (post-launch):
1. [Improvement 1]
2. [Improvement 2]

**Tester**: __________________  
**Date**: April 15, 2026  
**Sign-Off**: ✅/❌

---

**Next Steps**:
- [ ] Fix all critical bugs
- [ ] Re-test critical workflows
- [ ] Deploy to honeybee.net.in staging
- [ ] Final smoke test on staging
- [ ] Deploy to production
