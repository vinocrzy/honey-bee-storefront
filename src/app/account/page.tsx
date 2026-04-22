'use client';

/**
 * Honey Bee — Account Page (/account)
 * Unified client component: guest state OR authenticated dashboard
 * Uses AuthContext — no fake data, no double exports
 * Luminous Alchemist design system
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as CustomerService from '@/services/customer';
import * as WishlistService from '@/services/wishlist';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Order, Product } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type AccountTab = 'details' | 'orders' | 'addresses' | 'wishlist';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputClass =
  'w-full bg-white border border-[#d8d0c4] rounded-xl px-4 py-3.5 text-sm text-[#1c1c19] placeholder:text-[#9e9e90] focus:outline-none focus:border-[#7b5800] transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
const labelClass = 'block label-caps text-on-surface-variant mb-2';

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  processing: 'bg-purple-50 text-purple-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-[#dcfce7] text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const fmtDate = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(iso))
    : '—';

// ─── Guest state (not authenticated) ─────────────────────────────────────────

const BENEFITS = [
  { icon: 'receipt_long', title: 'Order History', desc: 'View all past purchases and easily reorder your favourites.' },
  { icon: 'local_shipping', title: 'Saved Addresses', desc: 'Save shipping addresses for faster checkout every time.' },
  { icon: 'notifications', title: 'Order Updates', desc: 'Real-time shipping notifications straight to your inbox.' },
  { icon: 'star', title: 'Early Access', desc: 'Be first to know about new bars, limited editions, and member-only events.' },
];

function GuestState() {
  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="w-20 h-20 rounded-full bg-[#e0e5cc] flex items-center justify-center mx-auto">
            <span
              className="material-symbols-outlined text-[#7b5800]"
              style={{ fontSize: '36px', fontVariationSettings: "'wght' 100" }}
            >
              person
            </span>
          </div>
          <div className="space-y-3">
            <SectionLabel className="text-center">Your Account</SectionLabel>
            <h1 className="font-headline text-5xl text-[#1c1c19] leading-tight">
              Sign In to<br />
              <span className="italic font-normal text-[#7b5800]">Continue</span>
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed">
              Access your order history, saved addresses, and preferences.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity text-center"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="border border-[#7b5800] text-[#7b5800] font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl hover:bg-[#7b5800] hover:text-white transition-all text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f0ede8] px-6 md:px-20 py-16">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <span
            className="material-symbols-outlined text-[#7b5800] mx-auto block"
            style={{ fontSize: '32px', fontVariationSettings: "'wght' 200" }}
          >
            package_2
          </span>
          <h2 className="font-headline text-3xl text-[#1c1c19]">Track an Order</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm mx-auto">
            Placed an order as a guest? Check your confirmation email for tracking details.
          </p>
          <Link
            href="/orders"
            className="inline-block label-caps text-[#7b5800] underline underline-offset-4 hover:no-underline transition-all"
          >
            View Order Tracking →
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Member Benefits</SectionLabel>
            <h2 className="font-headline text-4xl text-[#1c1c19] mt-3">
              Why create an{' '}
              <span className="italic font-normal text-[#7b5800]">account?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-surface-container-lowest rounded-xl sunlight-shadow p-6 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e0e5cc] flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-[#7b5800]"
                    style={{ fontSize: '20px', fontVariationSettings: "'wght' 200" }}
                  >
                    {b.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#1c1c19] mb-1">{b.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NursePromiseBand
        quote="Every bar was made to be felt — not just used. When you're ready, we'd love to know your name."
        attribution="Sarah, Founder"
      />
    </main>
  );
}

// ─── Orders tab — fetches live data ──────────────────────────────────────────

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    CustomerService.getOrders()
      .then(setOrders)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load orders.')
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-[#7b5800]/20 border-t-[#7b5800] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-5">
        <span className="material-symbols-outlined text-red-600" style={{ fontSize: '18px' }}>
          error
        </span>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <span
          className="material-symbols-outlined text-[#7b5800]/30 block mx-auto"
          style={{ fontSize: '56px', fontVariationSettings: "'wght' 100" }}
        >
          receipt_long
        </span>
        <h3 className="font-headline text-2xl text-[#1c1c19]">No orders yet</h3>
        <p className="text-sm text-on-surface-variant">
          Your order history will appear here after your first purchase.
        </p>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-md shadow-primary/10 hover:opacity-90 transition-opacity mt-4"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-headline text-2xl text-[#1c1c19] mb-6">Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl sunlight-shadow p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <p className="font-semibold text-[#1c1c19]">{order.order_number}</p>
              <p className="label-caps text-on-surface-variant mt-1">
                {fmtDate(order.placed_at)}
              </p>
            </div>
            <span
              className={`label-caps px-3 py-1.5 rounded-full capitalize ${
                ORDER_STATUS_STYLES[order.status] ?? 'bg-[#f0ede8] text-[#7b5800]'
              }`}
            >
              {order.status}
            </span>
          </div>
          {order.items && order.items.length > 0 && (
            <div className="mb-4 space-y-2">
              {order.items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 text-sm text-on-surface-variant"
                >
                  <span
                    className="material-symbols-outlined text-[#7b5800]/40"
                    style={{ fontSize: '14px' }}
                  >
                    circle
                  </span>
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                </div>
              ))}
              {order.items.length > 3 && (
                <p className="text-xs text-on-surface-variant pl-5">
                  +{order.items.length - 3} more item
                  {order.items.length - 3 !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}
          <div className="flex items-center justify-between text-sm pt-3 border-t border-[#f0ede8]">
            <span className="font-semibold text-[#7b5800]">{fmt(order.total_amount)}</span>
            <Link
              href={`/orders/${order.id}`}
              className="label-caps text-[#7b5800] hover:underline underline-offset-4 transition-all"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Wishlist tab — fetches live data ────────────────────────────────────────

function WishlistTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    WishlistService.getWishlist(1)
      .then((res) => setProducts(res.data))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load wishlist.')
      )
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (productId: number) => {
    await toggleWishlist(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart({ product_id: productId, quantity: 1 });
    } catch { /* ignore */ }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-[#7b5800]/20 border-t-[#7b5800] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-5">
        <span className="material-symbols-outlined text-red-600" style={{ fontSize: '18px' }}>error</span>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <span
          className="material-symbols-outlined text-[#7b5800]/30 block mx-auto"
          style={{ fontSize: '56px', fontVariationSettings: "'wght' 100" }}
        >
          favorite
        </span>
        <h3 className="font-headline text-2xl text-[#1c1c19]">Your wishlist is empty</h3>
        <p className="text-sm text-on-surface-variant">
          Browse our collection and save items you love.
        </p>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-md shadow-primary/10 hover:opacity-90 transition-opacity mt-4"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl text-[#1c1c19] mb-6">My Wishlist ({products.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl sunlight-shadow p-5 flex gap-5">
            <Link href={`/products/${product.slug}`} className="flex-shrink-0 w-24 h-28 rounded-xl overflow-hidden">
              <img
                src={product.primary_image?.url || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=200&auto=format&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-headline text-lg text-[#1c1c19] hover:text-primary transition-colors leading-tight">
                  {product.name}
                </h3>
              </Link>
              <p className="font-semibold text-primary mt-1">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="honey-glow text-white font-label font-bold uppercase tracking-widest text-[10px] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="border border-error text-error font-label font-bold uppercase tracking-widest text-[10px] px-4 py-2 rounded-lg hover:bg-error/10 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main page export ─────────────────────────────────────────────────────────

export default function AccountPage() {
  const { customer, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (['details', 'orders', 'addresses', 'wishlist'] as const).includes(
    searchParams.get('tab') as AccountTab
  ) ? (searchParams.get('tab') as AccountTab) : 'details';
  const [tab, setTab] = useState<AccountTab>(initialTab);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await logout();
      router.push('/');
    } catch {
      setSigningOut(false);
    }
  }

  // Waiting for localStorage auth check
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#7b5800]/20 border-t-[#7b5800] animate-spin" />
      </div>
    );
  }

  // Not authenticated → show guest CTA
  if (!isAuthenticated || !customer) {
    return <GuestState />;
  }

  // ── Authenticated dashboard ───────────────────────────────────────────────

  const navItem = (id: AccountTab, icon: string, label: string) => (
    <button
      key={id}
      onClick={() => setTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
        tab === id
          ? 'honey-glow text-white font-semibold'
          : 'text-on-surface-variant hover:bg-[#f0ede8] hover:text-[#1c1c19]'
      }`}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}
      >
        {icon}
      </span>
      {label}
    </button>
  );

  return (
    <main className="max-w-[1920px] mx-auto">
      <div className="px-6 md:px-20 pt-12 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Account' }]} />
      </div>

      <div className="px-6 md:px-20 py-8">
        <SectionLabel>Your Account</SectionLabel>
        <h1 className="font-headline text-5xl text-[#1c1c19] mt-2 mb-8">
          Hello,{' '}
          <span className="italic font-normal text-[#7b5800]">{customer.first_name}</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar nav */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl sunlight-shadow p-4 space-y-1">
              {/* Avatar row */}
              <div className="flex items-center gap-3 px-4 py-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#e0e5cc] flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-[#7b5800]"
                    style={{ fontSize: '20px', fontVariationSettings: "'wght' 200" }}
                  >
                    person
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1c1c19] truncate">
                    {customer.first_name} {customer.last_name}
                  </p>
                  <p className="text-xs text-on-surface-variant truncate">{customer.phone}</p>
                </div>
              </div>

              {navItem('details', 'account_circle', 'My Profile')}
              {navItem('orders', 'receipt_long', 'Orders')}
              {navItem('addresses', 'home_pin', 'Addresses')}
              {navItem('wishlist', 'favorite', 'Wishlist')}

              <div className="pt-2">
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}
                  >
                    logout
                  </span>
                  {signingOut ? 'Signing out…' : 'Sign Out'}
                </button>
              </div>
            </div>
          </aside>

          {/* Tab content */}
          <div className="flex-1 min-w-0">

            {/* Profile */}
            {tab === 'details' && (
              <div className="bg-white rounded-xl sunlight-shadow p-7 space-y-6">
                <h2 className="font-headline text-2xl text-[#1c1c19]">Personal Information</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input
                      type="text"
                      defaultValue={customer.first_name}
                      className={inputClass}
                      disabled
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input
                      type="text"
                      defaultValue={customer.last_name}
                      className={inputClass}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={customer.phone}
                    className={inputClass}
                    disabled
                  />
                </div>
                {customer.email && (
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      defaultValue={customer.email}
                      className={inputClass}
                      disabled
                    />
                  </div>
                )}
                <p className="text-xs text-on-surface-variant bg-[#f0ede8] rounded-xl px-4 py-3">
                  <span
                    className="material-symbols-outlined align-middle mr-1.5 text-[#7b5800]"
                    style={{ fontSize: '14px' }}
                  >
                    info
                  </span>
                  To update your contact details, please use our{' '}
                  <Link href="/contact" className="text-[#7b5800] hover:underline">
                    contact page
                  </Link>
                  .
                </p>
                <div className="pt-4 border-t border-[#f0ede8]">
                  <p className={labelClass}>Member Since</p>
                  <p className="text-sm text-[#1c1c19]">{fmtDate(customer.created_at)}</p>
                </div>
              </div>
            )}

            {/* Orders */}
            {tab === 'orders' && <OrdersTab />}

            {/* Addresses */}
            {tab === 'addresses' && (
              <div className="space-y-5">
                <h2 className="font-headline text-2xl text-[#1c1c19] mb-6">My Addresses</h2>
                {customer.addresses && customer.addresses.length > 0 ? (
                  customer.addresses.map((addr) => (
                    <div
                      key={addr.id ?? addr.address_line1}
                      className="bg-white rounded-xl sunlight-shadow p-6"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {addr.is_default && (
                          <span className="label-caps bg-[#e0e5cc] text-[#7b5800] px-2.5 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <span className="label-caps text-on-surface-variant capitalize">
                          {addr.type}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#1c1c19]">
                        {addr.first_name} {addr.last_name}
                      </p>
                      <p className="text-sm text-on-surface-variant">{addr.address_line1}</p>
                      {addr.address_line2 && (
                        <p className="text-sm text-on-surface-variant">{addr.address_line2}</p>
                      )}
                      <p className="text-sm text-on-surface-variant">
                        {addr.city}, {addr.state_province ?? addr.state} {addr.postal_code}
                      </p>
                      <p className="text-sm text-on-surface-variant">{addr.country}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 space-y-4">
                    <span
                      className="material-symbols-outlined text-[#7b5800]/30 block mx-auto"
                      style={{ fontSize: '48px', fontVariationSettings: "'wght' 100" }}
                    >
                      home_pin
                    </span>
                    <h3 className="font-headline text-xl text-[#1c1c19]">No saved addresses</h3>
                    <p className="text-sm text-on-surface-variant">
                      Addresses saved during checkout will appear here.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist */}
            {tab === 'wishlist' && <WishlistTab />}

          </div>
        </div>
      </div>
    </main>
  );
}
