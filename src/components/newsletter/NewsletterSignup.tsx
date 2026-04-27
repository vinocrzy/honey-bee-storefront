'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/services/commerce';

interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await subscribeToNewsletter(email.trim(), name.trim() || undefined);
      setStatus('success');
      setMessage(res.message || 'You\'re on the list!');
      setEmail('');
      setName('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className={`py-20 px-6 md:px-20 bg-[#1c1c19] ${className}`}>
      <div className="max-w-xl mx-auto text-center">
        {/* Honey icon */}
        <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#d59f2b]/20">
          <span className="text-2xl">🍯</span>
        </div>

        <p className="label-caps text-[#d59f2b] mb-3">THE HIVE</p>
        <h2 className="font-headline text-3xl lg:text-4xl text-white mb-4">
          Join Our Inner Circle
        </h2>
        <p className="text-[#9e9e90] text-sm leading-relaxed mb-8">
          Artisan stories, seasonal rituals & exclusive offers — delivered to your inbox. No noise, only nectar.
        </p>

        {status === 'success' ? (
          <div className="rounded-2xl border border-[#d59f2b]/40 bg-[#d59f2b]/10 p-6 text-[#d59f2b]">
            <p className="label-caps mb-1">WELCOME TO THE HIVE ✦</p>
            <p className="text-sm">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white placeholder-[#9e9e90] focus:border-[#d59f2b]/60 focus:outline-none text-sm"
            />
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white placeholder-[#9e9e90] focus:border-[#d59f2b]/60 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email.trim()}
                className="honey-glow rounded-xl px-6 py-3 text-white label-caps text-xs disabled:opacity-60 whitespace-nowrap"
              >
                {status === 'loading' ? '...' : 'JOIN'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-xs">{message}</p>
            )}
            <p className="text-[#9e9e90] text-xs">Unsubscribe anytime. We hate spam too.</p>
          </form>
        )}
      </div>
    </section>
  );
}
