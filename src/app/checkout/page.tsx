'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCart } from '@/contexts/CartContext';
import { guestCheckout, type GuestCheckoutRequest } from '@/services/checkout';
import { formatPhoneToE164, validatePhoneE164, formatPhoneInput } from '@/lib/phoneUtils';

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingPhone: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

const inputClass = "w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50";
const labelClass = "block label-caps text-on-surface-variant mb-2";
const errorClass = "text-error text-xs mt-1";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading: cartLoading, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Read applied coupon from localStorage (set on cart page)
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('applied_coupon');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAppliedCouponCode(parsed.code || null);
      }
    } catch { /* ignore */ }
  }, []);
  
  const [form, setForm] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress1: '',
    shippingAddress2: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: 'IN',
    shippingPhone: '',
    notes: '',
  });

  const set = (key: keyof FormData, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  // Handle phone input with formatting
  const setPhone = (key: 'customerPhone' | 'shippingPhone', val: string) => {
    const formatted = formatPhoneInput(val);
    setForm(prev => ({ ...prev, [key]: formatted }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Customer info
    if (!form.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!form.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }
    
    const customerPhoneE164 = formatPhoneToE164(form.customerPhone);
    if (!form.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone is required';
    } else if (!validatePhoneE164(customerPhoneE164)) {
      newErrors.customerPhone = 'Invalid phone number. Enter 10 digits without +91 (e.g., 98765 43210)';
    }

    // Shipping address
    if (!form.shippingFirstName.trim()) newErrors.shippingFirstName = 'First name is required';
    if (!form.shippingLastName.trim()) newErrors.shippingLastName = 'Last name is required';
    if (!form.shippingAddress1.trim()) newErrors.shippingAddress1 = 'Address is required';
    if (!form.shippingCity.trim()) newErrors.shippingCity = 'City is required';
    if (!form.shippingState.trim()) newErrors.shippingState = 'State is required';
    if (!form.shippingPostalCode.trim()) newErrors.shippingPostalCode = 'Postal code is required';
    if (!form.shippingCountry.trim()) newErrors.shippingCountry = 'Country is required';
    
    const shippingPhoneE164 = formatPhoneToE164(form.shippingPhone);
    if (!form.shippingPhone.trim()) {
      newErrors.shippingPhone = 'Phone is required';
    } else if (!validatePhoneE164(shippingPhoneE164)) {
      newErrors.shippingPhone = 'Invalid phone number. Enter 10 digits without +91 (e.g., 98765 43210)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit checkout
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      setGeneralError('Please fix the errors above before submitting.');
      return;
    }

    if (!cart || !cart.token) {
      setGeneralError('Your cart is empty. Please add items before checking out.');
      return;
    }

    setSubmitting(true);
    setGeneralError(null);

    try {
      const checkoutData: GuestCheckoutRequest = {
        customer_name: form.customerName.trim(),
        customer_email: form.customerEmail.trim().toLowerCase(),
        customer_phone: formatPhoneToE164(form.customerPhone),
        shipping_address: {
          first_name: form.shippingFirstName.trim(),
          last_name: form.shippingLastName.trim(),
          company: undefined,
          address_line1: form.shippingAddress1.trim(),
          address_line2: form.shippingAddress2.trim() || undefined,
          city: form.shippingCity.trim(),
          state: form.shippingState.trim(),
          postal_code: form.shippingPostalCode.trim(),
          country: form.shippingCountry.trim(),
          phone: formatPhoneToE164(form.shippingPhone),
        },
        notes: form.notes.trim() || undefined,
        cart_token: cart.token,
        ...(appliedCouponCode ? { coupon_code: appliedCouponCode } : {}),
      };

      const result = await guestCheckout(checkoutData);
      
      // Clear cart after successful checkout
      await clearCart();
      
      // Clear applied coupon
      localStorage.removeItem('applied_coupon');
      
      // Redirect to confirmation page
      router.push(`/orders/confirmation?order=${result.order.order_number}`);
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to place order. Please try again.';
      setGeneralError(errorMessage);
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shipping = cart?.shipping || 0;
  const tax = cart?.tax || 0;
  const total = cart?.total || subtotal;

  // Empty cart state
  if (!cart || items.length === 0) {
    return (
      <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-24 text-center space-y-6">
        <span className="material-symbols-outlined text-on-surface-variant mx-auto block" style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}>
          shopping_bag
        </span>
        <h1 className="font-headline text-4xl text-[#1c1c19]">Your Cart is Empty</h1>
        <p className="text-on-surface-variant text-lg">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Shop the Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/cart" className="inline-flex items-center gap-2 text-primary label-caps hover:gap-3 transition-all mb-4">
          <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'wght' 300" }}>arrow_back</span>
          Back to basket
        </Link>
        <h1 className="font-headline text-5xl text-[#1c1c19]">Guest Checkout</h1>
        <p className="text-on-surface-variant mt-2">Complete your order securely</p>
      </div>

      {/* Global Error */}
      {generalError && (
        <div className="mb-8 bg-error/10 border border-error rounded-xl p-5 flex items-start gap-3">
          <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'wght' 300" }}>error</span>
          <div className="flex-1">
            <p className="font-semibold text-error">Checkout Error</p>
            <p className="text-sm text-error/80 mt-1">{generalError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1 space-y-6">
          {/* Customer Information */}
          <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6">
            <h2 className="font-headline text-2xl text-[#1c1c19]">Contact Information</h2>

            <div>
              <label className={labelClass}>Full Name *</label>
              <input 
                type="text" 
                value={form.customerName} 
                onChange={e => set('customerName', e.target.value)} 
                placeholder="Priya Nair" 
                className={inputClass}
                disabled={submitting}
              />
              {errors.customerName && <p className={errorClass}>{errors.customerName}</p>}
            </div>

            <div>
              <label className={labelClass}>Email Address *</label>
              <input 
                type="email" 
                value={form.customerEmail} 
                onChange={e => set('customerEmail', e.target.value)} 
                placeholder="you@example.com" 
                className={inputClass}
                disabled={submitting}
              />
              {errors.customerEmail && <p className={errorClass}>{errors.customerEmail}</p>}
            </div>

            <div>
              <label className={labelClass}>Phone Number * (India)</label>
              <input 
                type="tel" 
                value={form.customerPhone} 
                onChange={e => setPhone('customerPhone', e.target.value)} 
                placeholder="98765 43210" 
                className={inputClass}
                maxLength={11}
                disabled={submitting}
              />
              <p className="text-xs text-on-surface-variant mt-1">We'll use this for order updates</p>
              {errors.customerPhone && <p className={errorClass}>{errors.customerPhone}</p>}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6">
            <h2 className="font-headline text-2xl text-[#1c1c19]">Shipping Address</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input 
                  type="text" 
                  value={form.shippingFirstName} 
                  onChange={e => set('shippingFirstName', e.target.value)} 
                  placeholder="Priya" 
                  className={inputClass}
                  disabled={submitting}
                />
                {errors.shippingFirstName && <p className={errorClass}>{errors.shippingFirstName}</p>}
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input 
                  type="text" 
                  value={form.shippingLastName} 
                  onChange={e => set('shippingLastName', e.target.value)} 
                  placeholder="Nair" 
                  className={inputClass}
                  disabled={submitting}
                />
                {errors.shippingLastName && <p className={errorClass}>{errors.shippingLastName}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Street Address *</label>
              <input 
                type="text" 
                value={form.shippingAddress1} 
                onChange={e => set('shippingAddress1', e.target.value)} 
                  placeholder="42, Gandhi Road" 
                className={inputClass}
                disabled={submitting}
              />
              {errors.shippingAddress1 && <p className={errorClass}>{errors.shippingAddress1}</p>}
            </div>

            <div>
              <label className={labelClass}>Apartment, Suite, etc. (Optional)</label>
              <input 
                type="text" 
                value={form.shippingAddress2} 
                onChange={e => set('shippingAddress2', e.target.value)} 
                placeholder="Apt 4B" 
                className={inputClass}
                disabled={submitting}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className={labelClass}>City *</label>
                <input 
                  type="text" 
                  value={form.shippingCity} 
                  onChange={e => set('shippingCity', e.target.value)} 
                  placeholder="Chennai" 
                  className={inputClass}
                  disabled={submitting}
                />
                {errors.shippingCity && <p className={errorClass}>{errors.shippingCity}</p>}
              </div>
              <div>
                <label className={labelClass}>State *</label>
                <input 
                  type="text" 
                  value={form.shippingState} 
                  onChange={e => set('shippingState', e.target.value)} 
                  placeholder="TN" 
                  maxLength={2}
                  className={inputClass}
                  disabled={submitting}
                />
                {errors.shippingState && <p className={errorClass}>{errors.shippingState}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Postal Code *</label>
                <input 
                  type="text" 
                  value={form.shippingPostalCode} 
                  onChange={e => set('shippingPostalCode', e.target.value)} 
                  placeholder="600001" 
                  className={inputClass}
                  disabled={submitting}
                />
                {errors.shippingPostalCode && <p className={errorClass}>{errors.shippingPostalCode}</p>}
              </div>
              <div>
                <label className={labelClass}>Country *</label>
                <select 
                  value={form.shippingCountry} 
                  onChange={e => set('shippingCountry', e.target.value)} 
                  className={inputClass}
                  disabled={submitting}
                >
                  <option value="IN">India</option>
                </select>
                {errors.shippingCountry && <p className={errorClass}>{errors.shippingCountry}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Shipping Phone * (India)</label>
              <input 
                type="tel" 
                value={form.shippingPhone} 
                onChange={e => setPhone('shippingPhone', e.target.value)} 
                placeholder="98765 43210" 
                className={inputClass}
                maxLength={11}
                disabled={submitting}
              />
              <p className="text-xs text-on-surface-variant mt-1">For delivery contact</p>
              {errors.shippingPhone && <p className={errorClass}>{errors.shippingPhone}</p>}
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6">
            <h2 className="font-headline text-2xl text-[#1c1c19]">Order Notes (Optional)</h2>
            <textarea 
              value={form.notes} 
              onChange={e => set('notes', e.target.value)} 
              placeholder="Any special instructions for your order..." 
              rows={4} 
              className={`${inputClass} resize-none`}
              disabled={submitting}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || cartLoading}
            className="honey-glow w-full text-white font-label font-bold uppercase tracking-widest text-sm py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Placing Your Order...
              </span>
            ) : (
              `Place Order — ${fmt(total)}`
            )}
          </button>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-5 sticky top-32">
            <h2 className="font-headline text-xl text-[#1c1c19]">Your Order</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-14 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.product_image || 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=200&auto=format&fit=crop'} 
                      alt={item.product_name} 
                      width={56} 
                      height={64} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1c1c19] leading-tight">{item.product_name}</p>
                    <p className="label-caps text-on-surface-variant mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">{fmt(item.total_price)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-4 border-t border-outline-variant text-sm">
              <div className="flex justify-between text-on-surface-variant"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              {tax > 0 && (
                <div className="flex justify-between text-on-surface-variant"><span>Tax</span><span>{fmt(tax)}</span></div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg text-[#1c1c19] pt-3 border-t border-outline-variant">
              <span className="font-headline">Total</span>
              <span className="text-primary">{fmt(total)}</span>
            </div>
            
            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-outline-variant">
              {[
                { icon: 'lock', text: 'Secure' },
                { icon: 'verified', text: 'Safe' },
                { icon: 'eco', text: 'Eco Packed' },
              ].map(s => (
                <div key={s.text} className="text-center space-y-1">
                  <span className="material-symbols-outlined text-on-surface-variant mx-auto block" style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}>{s.icon}</span>
                  <p className="label-caps text-on-surface-variant" style={{ fontSize: '9px' }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
