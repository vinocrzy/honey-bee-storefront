'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  notes: string;
}

const ORDER_ITEMS = [
  { id: 1, name: 'Wildflower & Honey Bar', price: 22, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=200&auto=format&fit=crop' },
  { id: 2, name: 'Lavender & Oat Cleanse', price: 19, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=200&auto=format&fit=crop' },
];

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const inputClass = "w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50";
const labelClass = "block label-caps text-on-surface-variant mb-2";

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    email: '', firstName: '', lastName: '', address: '', city: '',
    state: '', postcode: '', country: 'United States',
    cardName: '', cardNumber: '', cardExpiry: '', cardCvc: '', notes: '',
  });

  const set = (key: keyof FormData, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (submitted) {
    return (
      <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '40px', fontVariationSettings: "'FILL' 1, 'wght' 300" }}>check_circle</span>
        </div>
        <SectionLabel className="text-center">Order Confirmed</SectionLabel>
        <h1 className="font-headline text-4xl text-[#1c1c19]">Thank You, {form.firstName || 'Friend'}!</h1>
        <p className="text-on-surface-variant text-lg max-w-lg mx-auto">
          Your order is being prepared with care in our atelier. You'll receive a confirmation email shortly.
        </p>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Continue Shopping
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
        <h1 className="font-headline text-5xl text-[#1c1c19]">Checkout</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-4 mb-10">
        {(['shipping', 'payment', 'review'] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-label transition-colors ${
              step === s ? 'honey-glow text-white' :
              ['shipping', 'payment', 'review'].indexOf(step) > i ? 'bg-secondary-container text-primary' : 'bg-surface-container text-on-surface-variant'
            }`}>
              {['shipping', 'payment', 'review'].indexOf(step) > i
                ? <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check</span>
                : i + 1
              }
            </div>
            <span className={`label-caps hidden sm:block ${step === s ? 'text-primary' : 'text-on-surface-variant'}`}>
              {s}
            </span>
            {i < 2 && <div className="w-8 h-px bg-outline-variant" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Form */}
        <div className="flex-1 space-y-6">

          {/* Shipping Step */}
          {step === 'shipping' && (
            <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6">
              <h2 className="font-headline text-2xl text-[#1c1c19]">Shipping Details</h2>

              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Sarah" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Johnson" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Street Address</label>
                <input type="text" value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Meadow Lane" className={inputClass} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>City</label>
                  <input type="text" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Portland" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input type="text" value={form.state} onChange={e => set('state', e.target.value)} placeholder="OR" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Postcode</label>
                  <input type="text" value={form.postcode} onChange={e => set('postcode', e.target.value)} placeholder="97201" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <select value={form.country} onChange={e => set('country', e.target.value)} className={inputClass}>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Order Notes (optional)</label>
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any special instructions for your order..." rows={3} className={`${inputClass} resize-none`} />
              </div>

              <button
                onClick={() => setStep('payment')}
                className="honey-glow w-full text-white font-label font-bold uppercase tracking-widest text-sm py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6">
              <h2 className="font-headline text-2xl text-[#1c1c19]">Payment</h2>

              <div className="flex items-center gap-3 bg-secondary-container/30 rounded-xl p-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'wght' 200" }}>lock</span>
                <p className="text-sm text-on-surface-variant">Your payment details are encrypted and secure.</p>
              </div>

              <div>
                <label className={labelClass}>Name on Card</label>
                <input type="text" value={form.cardName} onChange={e => set('cardName', e.target.value)} placeholder="Sarah Johnson" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Card Number</label>
                <input type="text" value={form.cardNumber} onChange={e => set('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Expiry Date</label>
                  <input type="text" value={form.cardExpiry} onChange={e => set('cardExpiry', e.target.value)} placeholder="MM / YY" maxLength={7} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>CVC</label>
                  <input type="text" value={form.cardCvc} onChange={e => set('cardCvc', e.target.value)} placeholder="123" maxLength={4} className={inputClass} />
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep('shipping')} className="flex-1 border border-outline-variant text-on-surface-variant font-label uppercase tracking-widest text-sm py-4 rounded-xl hover:border-primary hover:text-primary transition-all">
                  Back
                </button>
                <button onClick={() => setStep('review')} className="flex-[2] honey-glow text-white font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Review Step */}
          {step === 'review' && (
            <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6">
              <h2 className="font-headline text-2xl text-[#1c1c19]">Review & Place Order</h2>

              <div className="space-y-2 bg-surface-container p-5 rounded-xl text-sm text-on-surface-variant">
                <p className="font-semibold text-[#1c1c19] mb-1">Shipping to:</p>
                <p>{form.firstName} {form.lastName}</p>
                <p>{form.address}</p>
                <p>{form.city}, {form.state} {form.postcode}</p>
                <p>{form.country}</p>
                <p className="mt-2">{form.email}</p>
              </div>

              {form.notes && (
                <div className="bg-surface-container p-5 rounded-xl text-sm">
                  <p className="font-semibold text-[#1c1c19] mb-1">Notes:</p>
                  <p className="text-on-surface-variant">{form.notes}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button onClick={() => setStep('payment')} className="flex-1 border border-outline-variant text-on-surface-variant font-label uppercase tracking-widest text-sm py-4 rounded-xl hover:border-primary hover:text-primary transition-all">
                  Back
                </button>
                <button
                  onClick={() => setSubmitted(true)}
                  className="flex-[2] honey-glow text-white font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
                >
                  Place Order — {fmt(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-5 sticky top-32">
            <h2 className="font-headline text-xl text-[#1c1c19]">Your Order</h2>
            <div className="space-y-4">
              {ORDER_ITEMS.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-14 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.imageUrl} alt={item.name} width={56} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1c1c19] leading-tight">{item.name}</p>
                    <p className="label-caps text-on-surface-variant mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">{fmt(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-4 border-t border-outline-variant text-sm">
              <div className="flex justify-between text-on-surface-variant"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-on-surface-variant"><span>Shipping</span><span>Free</span></div>
            </div>
            <div className="flex justify-between font-semibold text-lg text-[#1c1c19] pt-3 border-t border-outline-variant">
              <span className="font-headline">Total</span>
              <span className="text-primary">{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
