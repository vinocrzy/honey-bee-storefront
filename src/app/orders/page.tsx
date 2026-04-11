'use client';

/**
 * Honey Bee â€” Orders Page (/orders)
 * Auth-aware: guest state OR real order list from API
 * Luminous Alchemist design system
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as CustomerService from '@/services/customer';
import type { Order } from '@/types';

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  processing: 'bg-purple-50 text-purple-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-[#dcfce7] text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

const ORDER_STATUS_ICONS: Record<string, string> = {
  pending: 'pending',
  confirmed: 'check_circle',
  processing: 'autorenew',
  shipped: 'local_shipping',
  delivered: 'inventory_2',
  cancelled: 'cancel',
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
    : 'â€”';

// â”€â”€â”€ Guest state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function GuestState() {
  return (
    <div className="max-w-xl mx-auto text-center py-20 space-y-8">
      <div className="w-24 h-24 rounded-full bg-[#e0e5cc] flex items-center justify-center mx-auto">
        <span
          className="material-symbols-outlined text-[#7b5800]"
          style={{ fontSize: '48px', fontVariationSettings: "'wght' 100" }}
        >
          package_2
        </span>
      </div>

      <div className="space-y-3">
        <SectionLabel className="text-center">Sign In Required</SectionLabel>
        <h2 className="font-headline text-3xl text-[#1c1c19]">
          View Your{' '}
          <span className="italic font-normal text-[#7b5800]">Orders</span>
        </h2>
        <p className="text-on-surface-variant leading-relaxed">
          Sign in to your account to view your full order history, track shipments, and
          reorder your favourite bars.
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

      <div className="bg-[#f0ede8] rounded-xl p-6 text-left space-y-4">
        <div className="flex items-start gap-3">
          <span
            className="material-symbols-outlined text-[#7b5800] flex-shrink-0 mt-0.5"
            style={{ fontSize: '20px', fontVariationSettings: "'wght' 200" }}
          >
            mail
          </span>
          <div>
            <p className="text-sm font-semibold text-[#1c1c19] mb-1">
              Placed an order as a guest?
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Check your order confirmation email for tracking details. It contains a direct
              link to your order status.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span
            className="material-symbols-outlined text-[#7b5800] flex-shrink-0 mt-0.5"
            style={{ fontSize: '20px', fontVariationSettings: "'wght' 200" }}
          >
            help_outline
          </span>
          <div>
            <p className="text-sm font-semibold text-[#1c1c19] mb-1">Need help with an order?</p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our team is happy to help.{' '}
              <Link href="/contact" className="text-[#7b5800] hover:underline">
                Contact us â†’
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Authenticated order list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function AuthenticatedOrders() {
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
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-[#7b5800]/20 border-t-[#7b5800] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-5 mt-8">
        <span className="material-symbols-outlined text-red-600" style={{ fontSize: '18px' }}>
          error
        </span>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-24 space-y-5">
        <span
          className="material-symbols-outlined text-[#7b5800]/25 block mx-auto"
          style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}
        >
          receipt_long
        </span>
        <h2 className="font-headline text-2xl text-[#1c1c19]">No orders yet</h2>
        <p className="text-sm text-on-surface-variant">
          Your order history will appear here after your first purchase.
        </p>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {orders.map((order) => {
        const statusIcon = ORDER_STATUS_ICONS[order.status] ?? 'receipt_long';
        const statusStyle = ORDER_STATUS_STYLES[order.status] ?? 'bg-[#f0ede8] text-[#7b5800]';

        return (
          <article
            key={order.id}
            className="bg-white rounded-xl sunlight-shadow overflow-hidden"
          >
            {/* Order header */}
            <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#f4f0eb]">
              <div className="space-y-0.5">
                <p className="font-semibold text-[#1c1c19]">{order.order_number}</p>
                <p className="label-caps text-on-surface-variant">
                  Placed {fmtDate(order.placed_at)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1.5 label-caps px-3 py-1.5 rounded-full capitalize ${statusStyle}`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
                    {statusIcon}
                  </span>
                  {order.status}
                </span>
                <span className="label-caps text-on-surface-variant">
                  {fmt(order.total_amount)}
                </span>
              </div>
            </div>

            {/* Line items */}
            {order.items && order.items.length > 0 && (
              <div className="px-6 py-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.product_image ? (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-[#f0ede8]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#e0e5cc] flex items-center justify-center flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-[#7b5800]/50"
                          style={{ fontSize: '20px', fontVariationSettings: "'wght' 200" }}
                        >
                          soap
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1c1c19] truncate">
                        {item.product_name}
                      </p>
                      {item.product_sku && (
                        <p className="text-xs text-on-surface-variant">SKU: {item.product_sku}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-on-surface-variant">Ã— {item.quantity}</p>
                      <p className="text-sm font-medium text-[#1c1c19]">{fmt(item.total_amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 bg-[#fcf9f4] flex items-center justify-between gap-4">
              <div className="text-sm">
                <span className="text-on-surface-variant">Total: </span>
                <span className="font-semibold text-[#7b5800]">{fmt(order.total_amount)}</span>
              </div>
              <Link
                href={`/orders/${order.id}`}
                className="label-caps text-[#7b5800] hover:underline underline-offset-4 transition-all"
              >
                View Details â†’
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function OrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/account' },
          { label: 'Orders' },
        ]}
      />

      <div className="mb-10 mt-4">
        <SectionLabel>Your Purchases</SectionLabel>
        <h1 className="font-headline text-5xl text-[#1c1c19]">Order History</h1>
      </div>

      {authLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-[#7b5800]/20 border-t-[#7b5800] animate-spin" />
        </div>
      ) : isAuthenticated ? (
        <AuthenticatedOrders />
      ) : (
        <GuestState />
      )}
    </main>
  );
}
