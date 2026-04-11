'use client';

/**
 * Honey Bee — Register Page (/register)
 * Phone-first customer registration (E.164 required by backend)
 * Email is optional. Password confirmation required.
 * Luminous Alchemist design system
 */

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SectionLabel } from '@/components/ui/SectionLabel';

const inputClass =
  'w-full bg-white border border-[#d8d0c4] rounded-xl px-4 py-3.5 text-sm text-[#1c1c19] placeholder:text-[#9e9e90] focus:outline-none focus:border-[#7b5800] transition-colors';

/**
 * Attempt to format a loose phone entry into E.164.
 * Digits-only India (10 digits starting 6-9) → +91XXXXXXXXXX
 * Already E.164 → return as-is
 * Otherwise return the raw trimmed string (let backend validate)
 */
function normalisePhone(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('+')) return trimmed; // Already international
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`; // Indian 10-digit mobile
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  return trimmed;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/account');
    }
  }, [isAuthenticated, authLoading, router]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!form.first_name.trim()) errors.first_name = 'First name is required.';
    if (!form.last_name.trim()) errors.last_name = 'Last name is required.';
    if (!form.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else {
      const e164 = normalisePhone(form.phone);
      if (!/^\+\d{7,15}$/.test(e164)) {
        errors.phone = 'Enter a valid Indian mobile number, e.g. +91 98765 43210';
      }
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }
    if (form.password !== form.password_confirmation) {
      errors.password_confirmation = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      await register({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: normalisePhone(form.phone),
        ...(form.email.trim() ? { email: form.email.trim() } : {}),
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      router.push('/account');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

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
              person_add
            </span>
          </div>
          <SectionLabel className="text-center">Join the atelier</SectionLabel>
          <h1 className="font-headline text-4xl text-[#1c1c19] leading-tight">
            Create Your{' '}
            <span className="italic font-normal text-[#7b5800]">Account</span>
          </h1>
          <p className="text-sm text-on-surface-variant">
            Free to join. Your phone number is your primary identifier.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* Global error */}
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

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block label-caps text-on-surface-variant mb-2">
                First Name *
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                placeholder="Priya"
                value={form.first_name}
                onChange={handleChange}
                className={inputClass}
              />
              {fieldErrors.first_name && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.first_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="last_name" className="block label-caps text-on-surface-variant mb-2">
                Last Name *
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                placeholder="Krishnan"
                value={form.last_name}
                onChange={handleChange}
                className={inputClass}
              />
              {fieldErrors.last_name && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.last_name}</p>
              )}
            </div>
          </div>

          {/* Phone — primary identifier */}
          <div>
            <label htmlFor="phone" className="block label-caps text-on-surface-variant mb-2">
              Phone Number *{' '}
              <span className="normal-case font-normal text-on-surface-variant/60">(primary)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-on-surface-variant">
              Include country code or enter a 10-digit US number. We&apos;ll format it for you.
            </p>
            {fieldErrors.phone && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Email — optional */}
          <div>
            <label htmlFor="email" className="block label-caps text-on-surface-variant mb-2">
              Email Address{' '}
              <span className="normal-case font-normal text-on-surface-variant/60">(optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="hello@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block label-caps text-on-surface-variant mb-2">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
              className={inputClass}
            />
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="password_confirmation" className="block label-caps text-on-surface-variant mb-2">
              Confirm Password *
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password_confirmation}
              onChange={handleChange}
              className={inputClass}
            />
            {fieldErrors.password_confirmation && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.password_confirmation}</p>
            )}
          </div>

          {/* Terms note */}
          <p className="text-xs text-on-surface-variant leading-relaxed">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-[#7b5800] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#7b5800] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full honey-glow text-white font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Sign in link */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e8e2da]" />
          <span className="text-xs text-on-surface-variant">Already have an account?</span>
          <div className="flex-1 h-px bg-[#e8e2da]" />
        </div>

        <Link
          href="/login"
          className="w-full block text-center border border-[#7b5800] text-[#7b5800] font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-[#7b5800] hover:text-white transition-all"
        >
          Sign In Instead
        </Link>

        <p className="text-center text-xs text-on-surface-variant mt-8">
          <Link href="/" className="hover:text-[#7b5800] transition-colors">
            ← Back to store
          </Link>
        </p>

      </div>
    </main>
  );
}
