'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';

type AccountTab = 'details' | 'orders' | 'addresses' | 'preferences';

const ORDERS = [
  { id: 'HB-2026-001', date: 'Apr 1, 2026', status: 'Delivered', total: 63, items: 3 },
  { id: 'HB-2026-002', date: 'Apr 5, 2026', status: 'Shipped', total: 22, items: 1 },
  { id: 'HB-2026-003', date: 'Apr 8, 2026', status: 'Processing', total: 41, items: 2 },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: 'bg-secondary-container text-primary',
  Shipped: 'bg-surface-container text-on-surface-variant',
  Processing: 'bg-primary/10 text-primary',
};

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const inputClass = "w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors";
const labelClass = "block label-caps text-on-surface-variant mb-2";

export default function AccountPage() {
  const [tab, setTab] = useState<AccountTab>('details');
  const [saved, setSaved] = useState(false);

  const navItem = (id: AccountTab, icon: string, label: string) => (
    <button
      key={id}
      onClick={() => { setTab(id); setSaved(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-label text-sm ${
        tab === id
          ? 'honey-glow text-white shadow-sm'
          : 'text-on-surface-variant hover:bg-surface-container'
      }`}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}>{icon}</span>
      {label}
    </button>
  );

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">
      <div className="mb-8">
        <SectionLabel>Welcome back</SectionLabel>
        <h1 className="font-headline text-5xl text-[#1c1c19]">My Account</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 flex-shrink-0">
          <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-4 space-y-1 sticky top-32">
            <div className="text-center py-5 border-b border-outline-variant mb-3">
              <div className="w-16 h-16 rounded-full honey-glow flex items-center justify-center mx-auto mb-3">
                <span className="font-headline text-2xl text-white">S</span>
              </div>
              <p className="font-headline text-lg text-[#1c1c19]">Sarah</p>
              <p className="label-caps text-on-surface-variant">Member since 2025</p>
            </div>
            {navItem('details', 'person', 'Account Details')}
            {navItem('orders', 'package_2', 'My Orders')}
            {navItem('addresses', 'location_on', 'Addresses')}
            {navItem('preferences', 'tune', 'Preferences')}
            <div className="pt-3 border-t border-outline-variant mt-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-error hover:bg-error/10 transition-colors font-label text-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}>logout</span>
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">

          {tab === 'details' && (
            <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6">
              <h2 className="font-headline text-2xl text-[#1c1c19]">Personal Information</h2>
              {saved && (
                <div className="flex items-center gap-3 bg-secondary-container/40 rounded-xl p-4 text-sm text-[#1c1c19]">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>check_circle</span>
                  Changes saved successfully.
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className={labelClass}>First Name</label><input type="text" defaultValue="Sarah" className={inputClass} /></div>
                <div><label className={labelClass}>Last Name</label><input type="text" defaultValue="Johnson" className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>Email Address</label><input type="email" defaultValue="sarah@example.com" className={inputClass} /></div>
              <div><label className={labelClass}>Phone Number</label><input type="tel" defaultValue="+1 503 555 0123" className={inputClass} /></div>
              <div className="pt-2 border-t border-outline-variant">
                <h3 className="font-headline text-xl text-[#1c1c19] mb-5">Change Password</h3>
                <div className="space-y-4">
                  <div><label className={labelClass}>Current Password</label><input type="password" placeholder="••••••••" className={inputClass} /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>New Password</label><input type="password" placeholder="••••••••" className={inputClass} /></div>
                    <div><label className={labelClass}>Confirm Password</label><input type="password" placeholder="••••••••" className={inputClass} /></div>
                  </div>
                </div>
              </div>
              <button onClick={() => setSaved(true)} className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>
          )}

          {tab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-headline text-2xl text-[#1c1c19] mb-6">Order History</h2>
              {ORDERS.map(order => (
                <div key={order.id} className="bg-surface-container-lowest rounded-xl sunlight-shadow p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-[#1c1c19]">Order {order.id}</p>
                      <p className="label-caps text-on-surface-variant mt-1">{order.date}</p>
                    </div>
                    <span className={`label-caps px-3 py-1.5 rounded-full ${STATUS_STYLES[order.status] ?? 'bg-surface-container text-on-surface-variant'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant">{order.items} item{order.items !== 1 ? 's' : ''}</span>
                    <div className="flex items-center gap-6">
                      <span className="font-semibold text-primary">{fmt(order.total)}</span>
                      <Link href={`/orders/${order.id}`} className="text-primary label-caps hover:underline underline-offset-4">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'addresses' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-headline text-2xl text-[#1c1c19]">My Addresses</h2>
                <button className="border border-primary text-primary font-label text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all">
                  + Add New
                </button>
              </div>
              {[
                { label: 'Default', name: 'Sarah Johnson', address: '123 Meadow Lane', city: 'Portland, OR 97201', country: 'United States' },
                { label: 'Work', name: 'Sarah Johnson', address: '456 Oak Street Suite 200', city: 'Portland, OR 97204', country: 'United States' },
              ].map(addr => (
                <div key={addr.label} className="bg-surface-container-lowest rounded-xl sunlight-shadow p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="label-caps text-primary font-bold">{addr.label}</span>
                      {addr.label === 'Default' && (
                        <span className="label-caps bg-secondary-container text-primary px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#1c1c19]">{addr.name}</p>
                    <p className="text-sm text-on-surface-variant">{addr.address}</p>
                    <p className="text-sm text-on-surface-variant">{addr.city}</p>
                    <p className="text-sm text-on-surface-variant">{addr.country}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-on-surface-variant hover:text-primary transition-colors p-2">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}>edit</span>
                    </button>
                    <button className="text-on-surface-variant hover:text-error transition-colors p-2">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}>delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'preferences' && (
            <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-8">
              <h2 className="font-headline text-2xl text-[#1c1c19]">Preferences</h2>
              {[
                { title: 'New Product Announcements', desc: 'Be first to know about new bar releases and limited editions.' },
                { title: 'Rituals & Tips Newsletter', desc: 'Monthly newsletter with slow-living rituals and skin care guidance.' },
                { title: 'Order Updates', desc: 'Shipping and delivery notifications for your orders.' },
                { title: 'Exclusive Member Discounts', desc: 'Early access to sales and member-only promotions.' },
              ].map((pref, i) => (
                <div key={pref.title} className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-semibold text-sm text-[#1c1c19]">{pref.title}</p>
                    <p className="text-sm text-on-surface-variant mt-1">{pref.desc}</p>
                  </div>
                  <button
                    className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${i !== 1 ? 'honey-glow' : 'bg-surface-container'}`}
                    role="switch"
                    aria-checked={i !== 1}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${i !== 1 ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
              <button onClick={() => setSaved(true)} className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity">
                Save Preferences
              </button>
              {saved && (
                <p className="text-sm text-secondary flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check</span>
                  Preferences saved.
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
