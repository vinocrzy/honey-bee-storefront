import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const ORDERS = [
  {
    id: 'HB-2026-001',
    date: 'April 1, 2026',
    status: 'Delivered',
    total: 63,
    items: [
      { name: 'Wildflower & Honey Bar', qty: 2, price: 22 },
      { name: 'Lavender & Oat Cleanse', qty: 1, price: 19 },
    ],
  },
  {
    id: 'HB-2026-002',
    date: 'April 5, 2026',
    status: 'Shipped',
    total: 22,
    items: [
      { name: 'Charcoal & Cedar Detox', qty: 1, price: 24 },
    ],
  },
  {
    id: 'HB-2026-003',
    date: 'April 8, 2026',
    status: 'Processing',
    total: 41,
    items: [
      { name: 'Rose Geranium Glow', qty: 1, price: 21 },
      { name: 'Honey Oat Nourish', qty: 1, price: 18 },
    ],
  },
];

const STATUS_CONFIG: Record<string, { color: string; icon: string }> = {
  Delivered: { color: 'bg-secondary-container text-primary', icon: 'check_circle' },
  Shipped: { color: 'bg-surface-container text-on-surface-variant', icon: 'local_shipping' },
  Processing: { color: 'bg-primary/10 text-primary', icon: 'inventory_2' },
};

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function OrdersPage() {
  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Account', href: '/account' }, { label: 'Orders' }]} />

      <div className="mb-10 mt-4">
        <SectionLabel>Your Purchases</SectionLabel>
        <h1 className="font-headline text-5xl text-[#1c1c19]">Order History</h1>
      </div>

      {ORDERS.length === 0 ? (
        <div className="text-center py-24 space-y-5">
          <span className="material-symbols-outlined text-on-surface-variant mx-auto block" style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}>package_2</span>
          <h2 className="font-headline text-3xl text-[#1c1c19]">No Orders Yet</h2>
          <p className="text-on-surface-variant">Your order history will appear here once you place your first order.</p>
          <Link href="/products" className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity">
            Shop the Collection
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {ORDERS.map(order => {
            const config = STATUS_CONFIG[order.status] ?? { color: 'bg-surface-container text-on-surface-variant', icon: 'receipt_long' };
            return (
              <div key={order.id} className="bg-surface-container-lowest rounded-xl sunlight-shadow overflow-hidden">
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-7 py-5 border-b border-outline-variant">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-[#1c1c19]">Order {order.id}</p>
                      <span className={`label-caps px-3 py-1 rounded-full flex items-center gap-1.5 ${config.color}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'wght' 300" }}>{config.icon}</span>
                        {order.status}
                      </span>
                    </div>
                    <p className="label-caps text-on-surface-variant">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-headline text-lg text-primary">{fmt(order.total)}</p>
                    <p className="label-caps text-on-surface-variant">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Item list */}
                <div className="px-7 py-5 space-y-3">
                  {order.items.map(item => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">{item.name} × {item.qty}</span>
                      <span className="text-[#1c1c19] font-medium">{fmt(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 px-7 py-5 bg-surface-container rounded-b-xl">
                  {order.status === 'Delivered' && (
                    <Link href="/products" className="border border-primary text-primary font-label text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all">
                      Reorder
                    </Link>
                  )}
                  {order.status === 'Shipped' && (
                    <button className="border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'wght' 200" }}>location_on</span>
                      Track Shipment
                    </button>
                  )}
                  <button className="text-on-surface-variant font-label text-xs uppercase tracking-widest hover:text-primary transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
