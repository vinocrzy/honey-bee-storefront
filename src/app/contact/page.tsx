'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';

const inputClass = "w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50";
const labelClass = "block label-caps text-on-surface-variant mb-2";

const FAQS = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days within the US. Free shipping on orders over $75.' },
  { q: 'Are your soaps suitable for sensitive skin?', a: 'Many of our bars are formulated specifically for sensitive skin and are clinically reviewed for pH balance. Look for the "Sensitive Skin" tag on product pages.' },
  { q: 'What is cold-process soap?', a: 'Cold-process is a traditional soap-making method where oils and lye are combined at room temperature. No heat shortcuts — this preserves nutrients and creates a naturally glycerin-rich bar that cures over six weeks.' },
  { q: 'Do you offer wholesale?', a: 'Yes! We work with select boutiques and spas. Email us at trade@honeybee-atelier.com for our wholesale brochure.' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <main className="max-w-[1920px] mx-auto">

      {/* Hero */}
      <section className="px-6 md:px-20 py-16 text-center space-y-4">
        <SectionLabel className="text-center">We'd Love to Hear From You</SectionLabel>
        <h1 className="font-headline text-5xl md:text-6xl text-[#1c1c19]">
          Get in <span className="italic font-normal">Touch</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
          Whether you have a question about your order, want to collaborate, or just want to say hello — our team responds within one business day.
        </p>
      </section>

      {/* Contact info row */}
      <section className="bg-surface-container px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {[
            { icon: 'mail', title: 'Email Us', value: 'hello@honeybee-atelier.com', sub: 'Replies within 1 business day' },
            { icon: 'phone', title: 'Call Us', value: '+1 (503) 555-0182', sub: 'Mon–Fri, 9am–5pm PT' },
            { icon: 'storefront', title: 'Atelier', value: '123 Botanical Lane', sub: 'Portland, OR 97201' },
          ].map(c => (
            <div key={c.title} className="space-y-3">
              <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px', fontVariationSettings: "'wght' 200" }}>{c.icon}</span>
              </div>
              <p className="font-headline text-lg text-[#1c1c19]">{c.title}</p>
              <p className="text-sm font-semibold text-primary">{c.value}</p>
              <p className="label-caps text-on-surface-variant">{c.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + FAQ */}
      <section className="px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Form */}
        <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-8 space-y-6">
          <h2 className="font-headline text-3xl text-[#1c1c19]">Send a Message</h2>

          {sent ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1, 'wght' 300" }}>check_circle</span>
              </div>
              <p className="font-headline text-2xl text-[#1c1c19]">Message Sent!</p>
              <p className="text-on-surface-variant">Thank you for reaching out. We'll get back to you within one business day.</p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="text-primary label-caps hover:underline underline-offset-4">
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Your Name</label><input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Sarah Johnson" className={inputClass} /></div>
                <div><label className={labelClass}>Email Address</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" className={inputClass} /></div>
              </div>
              <div>
                <label className={labelClass}>Subject</label>
                <select value={form.subject} onChange={e => set('subject', e.target.value)} className={inputClass}>
                  <option value="">Choose a topic…</option>
                  <option>Order Enquiry</option>
                  <option>Product Question</option>
                  <option>Wholesale & Trade</option>
                  <option>Press & Collaboration</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Message</label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us how we can help..." rows={6} className={`${inputClass} resize-none`} />
              </div>
              <button
                onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                className="honey-glow w-full text-white font-label font-bold uppercase tracking-widest text-sm py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-5">
          <h2 className="font-headline text-3xl text-[#1c1c19] mb-8">Frequently Asked</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl sunlight-shadow overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-headline text-lg text-[#1c1c19] pr-4 leading-snug">{faq.q}</span>
                <span
                  className="material-symbols-outlined text-primary flex-shrink-0 transition-transform duration-200"
                  style={{
                    fontVariationSettings: "'wght' 200",
                    transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  expand_more
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Promise band */}
      <NursePromiseBand
        quote="Every question matters to us just as much as every ingredient in our bars. We're a small team — you'll always hear from a real person."
        attribution="The Honey Bee Atelier Team"
        eyebrow="OUR SERVICE PROMISE"
      />

    </main>
  );
}
