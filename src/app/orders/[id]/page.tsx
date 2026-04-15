'use client';

/**
 * Honey Bee — Order Detail Page (/orders/[id])
 * Protected route: Shows full order details for authenticated customers
 * Stitch "Luminous Alchemist" design system
 */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import * as CustomerService from '@/services/customer';
import type { Order } from '@/types';

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const fmtDate = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(iso))
    : '—';

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  processing: 'bg-purple-50 text-purple-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-[#dcfce7] text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop';

// ─── Component ──────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { customer, isLoading: authLoading } = useAuth();
  
  const orderId = parseInt(params.id as string);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    // Redirect if not authenticated
    if (!customer) {
      router.push('/login?redirect=/orders/' + orderId);
      return;
    }

    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await CustomerService.getOrderDetail(orderId);
        setOrder(data);
      } catch (err) {
        console.error('Failed to load order:', err);
        setError('Unable to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, customer, authLoading, router]);

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f4]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e0e5cc] border-t-[#7b5800] rounded-full animate-spin mx-auto mb-4" />
          <p className="label-caps text-[#5c614d]">LOADING ORDER...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f4]">
        <div className="text-center px-6">
          <span className="material-symbols-outlined text-[#e0e5cc] text-8xl mb-6">
            error_outline
          </span>
          <h2 className="font-headline text-2xl text-[#1c1c19] mb-4">Order Not Found</h2>
          <p className="text-[#5c614d] mb-8 max-w-md">
            {error || 'We couldn\'t find this order. It may have been removed or you may not have permission to view it.'}
          </p>
          <Link
            href="/account"
            className="honey-glow inline-block text-white font-label tracking-wider rounded-xl px-8 py-4"
          >
            BACK TO ACCOUNT
          </Link>
        </div>
      </div>
    );
  }

  // ─── Main Render ────────────────────────────────────────────────────────

  return (
    <main className="bg-[#fcf9f4] min-h-screen py-20">
      <div className="px-6 md:px-20 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-[#5c614d] hover:text-[#7b5800] mb-6 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span className="label-caps">BACK TO ACCOUNT</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-headline text-4xl text-[#1c1c19] mb-2">
                Order #{order.order_number}
              </h1>
              <p className="text-[#5c614d]">
                Placed on {fmtDate(order.placed_at || order.created_at)}
              </p>
            </div>
            <span
              className={`label-caps px-4 py-2 rounded-full self-start md:self-center ${
                ORDER_STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {order.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Order Items - 2 cols */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Items List */}
            <div className="bg-white rounded-xl sunlight-shadow p-6">
              <h2 className="label-caps text-[#1c1c19] mb-6">ORDER ITEMS</h2>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-[#e0e5cc] last:border-0"
                  >
                    <Image
                      src={item.product_image || PLACEHOLDER_IMAGE}
                      alt={item.product_name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline text-lg text-[#1c1c19] hover:text-[#7b5800] truncate">
                        {item.product_name}
                      </h3>
                      {item.product_sku && (
                        <p className="text-xs text-[#5c614d] mt-1">SKU: {item.product_sku}</p>
                      )}
                      <p className="text-sm text-[#5c614d] mt-1">
                        Quantity: {item.quantity} × {fmt(item.unit_price)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-[#7b5800]">{fmt(item.total_amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl sunlight-shadow p-6">
              <h2 className="label-caps text-[#1c1c19] mb-4">SHIPPING ADDRESS</h2>
              <div className="text-[#5c614d] space-y-1">
                <p className="font-medium text-[#1c1c19]">
                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                </p>
                {order.shipping_address.company && (
                  <p>{order.shipping_address.company}</p>
                )}
                <p>{order.shipping_address.address_line1}</p>
                {order.shipping_address.address_line2 && (
                  <p>{order.shipping_address.address_line2}</p>
                )}
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state || order.shipping_address.state_province}{' '}
                  {order.shipping_address.postal_code}
                </p>
                <p>{order.shipping_address.country}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl sunlight-shadow p-6">
              <h2 className="label-caps text-[#1c1c19] mb-4">CONTACT INFORMATION</h2>
              <div className="text-[#5c614d] space-y-1">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'wght' 200" }}>
                    mail
                  </span>
                  {order.customer_email}
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'wght' 200" }}>
                    call
                  </span>
                  {order.customer_phone}
                </p>
              </div>
            </div>

            {/* Customer Notes */}
            {order.customer_notes && (
              <div className="bg-white rounded-xl sunlight-shadow p-6">
                <h2 className="label-caps text-[#1c1c19] mb-4">ORDER NOTES</h2>
                <p className="text-[#5c614d] leading-relaxed">{order.customer_notes}</p>
              </div>
            )}
          </div>

          {/* Order Summary - 1 col (Sticky) */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl sunlight-shadow p-6 sticky top-24 space-y-6">
              <h2 className="label-caps text-[#1c1c19]">ORDER SUMMARY</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5c614d]">Subtotal</span>
                  <span className="text-[#1c1c19]">{fmt(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5c614d]">Tax</span>
                  <span className="text-[#1c1c19]">{fmt(order.tax_amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5c614d]">Shipping</span>
                  <span className="text-[#1c1c19]">
                    {order.shipping_amount > 0 ? fmt(order.shipping_amount) : (
                      <span className="text-[#d59f2b]">FREE</span>
                    )}
                  </span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5c614d]">Discount</span>
                    <span className="text-green-600">-{fmt(order.discount_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-4 border-t border-[#e0e5cc]">
                  <span className="font-semibold text-[#1c1c19]">Total</span>
                  <span className="text-xl font-semibold text-[#7b5800]">
                    {fmt(order.total_amount)}
                  </span>
                </div>
              </div>

              {/* Payment Information */}
              <div className="pt-6 border-t border-[#e0e5cc]">
                <h3 className="label-caps text-[#1c1c19] mb-3">PAYMENT</h3>
                <div className="space-y-2">
                  <p className="text-sm text-[#5c614d]">
                    Status:{' '}
                    <span
                      className={
                        order.payment_status === 'paid'
                          ? 'text-green-600 font-medium'
                          : 'text-yellow-600 font-medium'
                      }
                    >
                      {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                    </span>
                  </p>
                  {order.payments && order.payments.length > 0 && (
                    <p className="text-sm text-[#5c614d]">
                      Method: {order.payments[0].payment_method.replace(/_/g, ' ').toUpperCase()}
                    </p>
                  )}
                  {order.payment_status === 'pending' && (
                    <p className="text-xs text-[#5c614d] mt-3 p-3 bg-[#f0ede8] rounded-lg">
                      💳 We will contact you with payment instructions via email.
                    </p>
                  )}
                </div>
              </div>

              {/* Tracking Information */}
              {order.status === 'shipped' && (
                <div className="pt-6 border-t border-[#e0e5cc]">
                  <h3 className="label-caps text-[#1c1c19] mb-3">TRACKING</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-[#5c614d]">
                      Your order has been shipped!
                    </p>
                    {order.shipped_at && (
                      <p className="text-sm text-[#5c614d]">
                        Shipped on {fmtDate(order.shipped_at)}
                      </p>
                    )}
                    <p className="text-xs text-[#5c614d] mt-3 p-3 bg-[#f0ede8] rounded-lg">
                      📦 Tracking details will be sent to your email.
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/products"
                className="honey-glow block text-center text-white font-label tracking-wider rounded-xl px-6 py-3"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
