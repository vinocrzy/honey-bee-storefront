'use client';

import { useState, type FormEvent } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to email marketing API
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto bg-white/60 rounded-xl px-6 py-5">
        <span
          className="material-symbols-outlined text-[#7b5800]"
          style={{ fontSize: '22px' }}
        >
          check_circle
        </span>
        <p className="text-sm text-[#1c1c19] font-medium">
          You&apos;re on the list. First issue coming soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none px-5 py-4 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
      />
      <button
        type="submit"
        className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none hover:opacity-90 transition-opacity flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
