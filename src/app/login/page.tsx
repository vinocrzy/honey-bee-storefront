'use client';

/**
 * Honey Bee — Login Page (/login)
 * Phone-first authentication (primary) or email login
 * Luminous Alchemist design system
 */

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SectionLabel } from '@/components/ui/SectionLabel';

const inputClass =
  'w-full bg-white border border-[#d8d0c4] rounded-xl px-4 py-3.5 text-sm text-[#1c1c19] placeholder:text-[#9e9e90] focus:outline-none focus:border-[#7b5800] transition-colors';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [login_field, setLoginField] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/account');
    }
  }, [isAuthenticated, authLoading, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!login_field.trim() || !password) {
      setError('Please enter your phone or email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login({ login: login_field.trim(), password });
      router.push('/account');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  }

  // Show nothing while checking existing auth
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#7b5800]/20 border-t-[#7b5800] animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-16 md:py-24">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#e0e5cc] flex items-center justify-center mx-auto mb-6">
            <span
              className="material-symbols-outlined text-[#7b5800]"
              style={{ fontSize: '28px', fontVariationSettings: "'wght' 200" }}
            >
              person
            </span>
          </div>
          <SectionLabel className="text-center">Welcome back</SectionLabel>
          <h1 className="font-headline text-4xl text-[#1c1c19] leading-tight">
            Sign In to Your{' '}
            <span className="italic font-normal text-[#7b5800]">Account</span>
          </h1>
          <p className="text-sm text-on-surface-variant">
            Use your phone number or email address.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <span
                className="material-symbols-outlined text-red-600 flex-shrink-0 mt-0.5"
                style={{ fontSize: '18px' }}
              >
                error
              </span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Phone or email */}
          <div>
            <label htmlFor="login" className="block label-caps text-on-surface-variant mb-2">
              Phone or Email
            </label>
            <input
              id="login"
              type="text"
              autoComplete="username tel email"
              placeholder="+1 555 000 0000 or hello@example.com"
              value={login_field}
              onChange={(e) => setLoginField(e.target.value)}
              className={inputClass}
              required
            />
            <p className="mt-1.5 text-xs text-on-surface-variant">
              Phone number format: +1 XXX XXX XXXX (international)
            </p>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="label-caps text-on-surface-variant">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#7b5800] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full honey-glow text-white font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e8e2da]" />
          <span className="text-xs text-on-surface-variant">New to Honey Bee?</span>
          <div className="flex-1 h-px bg-[#e8e2da]" />
        </div>

        {/* Register link */}
        <Link
          href="/register"
          className="w-full block text-center border border-[#7b5800] text-[#7b5800] font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-[#7b5800] hover:text-white transition-all"
        >
          Create a Free Account
        </Link>

        {/* Back */}
        <p className="text-center text-xs text-on-surface-variant mt-8">
          <Link href="/" className="hover:text-[#7b5800] transition-colors">
            ← Back to store
          </Link>
        </p>

      </div>
    </main>
  );
}
