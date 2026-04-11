/**
 * Honey Bee — Privacy Policy Page (/privacy)
 * Legal requirement — static content
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Privacy Policy | Honey Bee Atelier',
  description: 'How Honey Bee Atelier collects, uses, and protects your personal information.',
};

const LAST_UPDATED = 'April 11, 2026';

export default function PrivacyPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        />
      </div>

      {/* Header */}
      <section className="px-6 md:px-20 pt-8 pb-16">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-6">
          Privacy <span className="italic font-normal text-[#7b5800]">Policy</span>
        </h1>
        <p className="text-on-surface-variant text-base">Last updated: {LAST_UPDATED}</p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-3xl space-y-12">

          <div className="bg-[#e0e5cc] rounded-xl p-6">
            <p className="text-sm text-[#4f4634] leading-relaxed">
              At Honey Bee Atelier (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we respect your privacy.
              This policy explains what personal information we collect, why we collect it, and how we protect it.
              We don&apos;t sell your data. We never will.
            </p>
          </div>

          <PolicySection title="1. Information We Collect">
            <p>We collect information you provide directly to us:</p>
            <ul>
              <li><strong>Account information:</strong> Name, email address, phone number, and password when you create an account.</li>
              <li><strong>Order information:</strong> Shipping address, billing details, and purchase history when you place an order.</li>
              <li><strong>Communications:</strong> Messages you send us via the contact form, email, or customer support.</li>
              <li><strong>Newsletter:</strong> Email address if you subscribe to our newsletter.</li>
            </ul>
            <p>We also collect information automatically:</p>
            <ul>
              <li><strong>Usage data:</strong> Pages visited, time spent, clicks, and referring URLs via analytics tools.</li>
              <li><strong>Device data:</strong> Browser type, operating system, and IP address.</li>
              <li><strong>Cookies:</strong> Small files stored in your browser to remember your session and cart. See our cookie section below.</li>
            </ul>
          </PolicySection>

          <PolicySection title="2. How We Use Your Information">
            <p>We use your information to:</p>
            <ul>
              <li>Process and fulfil your orders, including shipping and delivery updates</li>
              <li>Manage your account and authenticate your identity</li>
              <li>Respond to your questions, comments, and requests</li>
              <li>Send transactional emails (order confirmation, shipping notification)</li>
              <li>Send marketing emails if you&apos;ve opted in — you can unsubscribe any time</li>
              <li>Improve our website, products, and customer experience</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Sharing Your Information">
            <p>
              We do not sell, rent, or trade your personal information. We only share your data with trusted
              third parties necessary to run our business:
            </p>
            <ul>
              <li><strong>Payment processors:</strong> To securely handle payment transactions (e.g., Stripe). We never store full card details.</li>
              <li><strong>Shipping carriers:</strong> To deliver your order (e.g., USPS, UPS).</li>
              <li><strong>Analytics providers:</strong> To understand how our website is used (e.g., Google Analytics — anonymised).</li>
              <li><strong>Email service providers:</strong> To send you transactional and marketing emails.</li>
              <li><strong>Legal requirements:</strong> We may disclose information when required by law or to protect our rights.</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Cookies">
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the website to function — your shopping cart, session, and login state.</li>
              <li><strong>Analytics cookies:</strong> Help us understand site usage. You can opt out via browser settings.</li>
              <li><strong>Marketing cookies:</strong> Used only if you consent. These allow us to show relevant ads on other platforms.</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling essential cookies may affect
              site functionality such as your cart.
            </p>
          </PolicySection>

          <PolicySection title="5. Data Retention">
            <p>
              We keep your data for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul>
              <li>Account data: retained as long as your account is active.</li>
              <li>Order data: retained for 7 years for legal and tax purposes.</li>
              <li>Marketing preferences: until you unsubscribe or request deletion.</li>
            </ul>
          </PolicySection>

          <PolicySection title="6. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Ask us to correct inaccurate data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time via the link in any email.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:privacy@honeybee-atelier.com" className="text-[#7b5800] underline underline-offset-2 hover:no-underline">
                privacy@honeybee-atelier.com
              </a>. We will respond within 30 days.
            </p>
          </PolicySection>

          <PolicySection title="7. Security">
            <p>
              We use industry-standard security measures to protect your personal information, including
              SSL/TLS encryption for all data in transit and encrypted storage for sensitive data. No
              method of internet transmission is 100% secure, but we take every reasonable step to protect
              your information.
            </p>
            <p>
              We never store full payment card details — all payment processing is handled by PCI-compliant
              third-party processors.
            </p>
          </PolicySection>

          <PolicySection title="8. Children's Privacy">
            <p>
              Our website is not intended for children under 13. We do not knowingly collect personal
              information from children. If you believe we have collected data from a child, please
              contact us and we will delete it promptly.
            </p>
          </PolicySection>

          <PolicySection title="9. Changes to This Policy">
            <p>
              We may update this privacy policy from time to time. We will notify you of significant
              changes by email or by posting a prominent notice on our website. The &ldquo;Last updated&rdquo; date
              at the top of this page reflects the most recent revision.
            </p>
          </PolicySection>

          <PolicySection title="10. Contact Us">
            <p>
              If you have questions about this privacy policy or how we handle your data, please reach out:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@honeybee-atelier.com</li>
              <li><strong>Postal address:</strong> Honey Bee Atelier, 123 Botanical Lane, Portland, OR 97201</li>
            </ul>
            <p>
              Or use our{' '}
              <Link href="/contact" className="text-[#7b5800] underline underline-offset-2 hover:no-underline">
                contact form
              </Link>.
            </p>
          </PolicySection>

        </div>
      </section>

    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="font-headline text-2xl text-[#1c1c19]">{title}</h2>
      <div className="text-sm text-on-surface-variant leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-2 [&_strong]:text-[#1c1c19]">
        {children}
      </div>
    </div>
  );
}
