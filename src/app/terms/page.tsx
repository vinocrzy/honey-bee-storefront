/**
 * Honey Bee — Terms of Service Page (/terms)
 * Legal requirement — static content
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Terms of Service | Honey Bee Atelier',
  description: 'Terms and conditions governing purchases from Honey Bee Atelier.',
};

const LAST_UPDATED = 'April 11, 2026';

export default function TermsPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
        />
      </div>

      {/* Header */}
      <section className="px-6 md:px-20 pt-8 pb-16">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-6">
          Terms of <span className="italic font-normal text-[#7b5800]">Service</span>
        </h1>
        <p className="text-on-surface-variant text-base">Last updated: {LAST_UPDATED}</p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-3xl space-y-12">

          <div className="bg-[#e0e5cc] rounded-xl p-6">
            <p className="text-sm text-[#4f4634] leading-relaxed">
              Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the Honey Bee Atelier
              website or placing an order. By accessing our website or making a purchase, you agree to
              be bound by these Terms.
            </p>
          </div>

          <TermsSection title="1. Who We Are">
            <p>
              Honey Bee Atelier (&ldquo;Honey Bee&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is an artisan soap company
              based in Portland, Oregon. We sell handcrafted, cold-process soap products through this
              website at honeybee-atelier.com.
            </p>
          </TermsSection>

          <TermsSection title="2. Eligibility">
            <p>
              By using our website, you confirm that you are at least 18 years old and legally
              capable of entering into a binding contract. If you are purchasing a gift for someone
              else, you represent that you have authority to accept these Terms on their behalf.
            </p>
          </TermsSection>

          <TermsSection title="3. Products">
            <p>
              We make every effort to display our products accurately. However, colours, textures, and
              sizes may appear slightly different on different screens. Product descriptions are provided
              in good faith and based on our knowledge of the ingredients.
            </p>
            <p>
              Our products are handcrafted in small batches. Slight variations in appearance between
              batches are a natural characteristic of artisan production and not a defect.
            </p>
            <p>
              We reserve the right to discontinue any product at any time without notice.
            </p>
          </TermsSection>

          <TermsSection title="4. Ordering & Payment">
            <p>
              By placing an order, you are making an offer to purchase the selected products at the
              stated price. We reserve the right to accept or decline any order at our discretion.
            </p>
            <p>
              Your order is confirmed once you receive an email confirmation from us. We accept major
              credit and debit cards and other payment methods displayed at checkout. All prices are
              in US Dollars and include applicable taxes where required.
            </p>
            <p>
              We use PCI-compliant payment processors and do not store full card details on our servers.
            </p>
          </TermsSection>

          <TermsSection title="5. Pricing & Promotions">
            <p>
              We reserve the right to change prices at any time. The price charged for an order is the
              price at the time the order is placed. Promotional discounts or codes must be applied at
              checkout — they cannot be applied retroactively.
            </p>
            <p>
              In the case of a pricing error, we reserve the right to cancel an order and provide a
              full refund.
            </p>
          </TermsSection>

          <TermsSection title="6. Shipping & Delivery">
            <p>
              We ship within the United States only. Delivery timelines are estimates and not guarantees.
              We are not responsible for delays caused by shipping carriers, weather events, or
              circumstances outside our control.
            </p>
            <p>
              Title and risk of loss pass to you upon delivery to the carrier. Please see our{' '}
              <Link href="/shipping" className="text-[#7b5800] underline underline-offset-2 hover:no-underline">
                Shipping Information
              </Link>{' '}
              page for full details.
            </p>
          </TermsSection>

          <TermsSection title="7. Returns & Refunds">
            <p>
              Our return and refund policy is described in full on our{' '}
              <Link href="/returns" className="text-[#7b5800] underline underline-offset-2 hover:no-underline">
                Returns & Exchanges
              </Link>{' '}
              page. The policy forms part of these Terms.
            </p>
          </TermsSection>

          <TermsSection title="8. Use of Website">
            <p>You may use our website for lawful, personal purposes only. You agree not to:</p>
            <ul>
              <li>Use the website for any fraudulent or unlawful purpose</li>
              <li>Reproduce, copy, or resell any part of our website or content without permission</li>
              <li>Attempt to gain unauthorised access to any portion of our systems</li>
              <li>Transmit any harmful, offensive, or disruptive content</li>
              <li>Scrape, crawl, or harvest data from our website without written permission</li>
            </ul>
          </TermsSection>

          <TermsSection title="9. Intellectual Property">
            <p>
              All content on this website — including text, images, product names, brand identity, and
              design — is the property of Honey Bee Atelier and protected by copyright and trademark law.
            </p>
            <p>
              You may not reproduce, republish, or distribute any content from this website without our
              prior written consent.
            </p>
          </TermsSection>

          <TermsSection title="10. User Accounts">
            <p>
              If you create an account, you are responsible for maintaining the confidentiality of your
              login credentials and for all activity under your account. Notify us immediately at{' '}
              <a href="mailto:hello@honeybee-atelier.com" className="text-[#7b5800] underline underline-offset-2 hover:no-underline">
                hello@honeybee-atelier.com
              </a>{' '}
              if you suspect unauthorised use.
            </p>
          </TermsSection>

          <TermsSection title="11. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Honey Bee Atelier will not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of our
              website or products.
            </p>
            <p>
              Our total liability for any claim arising from these Terms or your use of our products
              shall not exceed the amount you paid for the order in question.
            </p>
          </TermsSection>

          <TermsSection title="12. Disclaimer of Warranties">
            <p>
              Our website and products are provided &ldquo;as is&rdquo;. We make no warranties, express or implied,
              regarding the website&apos;s availability or the fitness of our products for any particular purpose.
            </p>
            <p>
              Our products are not intended to diagnose, treat, cure, or prevent any medical condition.
              If you have sensitive skin or a medical skin condition, consult a dermatologist before use.
            </p>
          </TermsSection>

          <TermsSection title="13. Governing Law">
            <p>
              These Terms are governed by the laws of the State of Oregon, United States, without regard
              to conflict of law principles. Any disputes shall be resolved in the courts of Multnomah County, Oregon.
            </p>
          </TermsSection>

          <TermsSection title="14. Changes to These Terms">
            <p>
              We may update these Terms from time to time. We will post the revised Terms on this page
              with an updated &ldquo;Last updated&rdquo; date. Continued use of our website after changes constitutes
              your acceptance of the revised Terms.
            </p>
          </TermsSection>

          <TermsSection title="15. Contact">
            <p>
              Questions about these Terms? Contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> legal@honeybee-atelier.com</li>
              <li><strong>Address:</strong> Honey Bee Atelier, 123 Botanical Lane, Portland, OR 97201</li>
            </ul>
            <p>
              Or use our{' '}
              <Link href="/contact" className="text-[#7b5800] underline underline-offset-2 hover:no-underline">
                contact form
              </Link>.
            </p>
          </TermsSection>

        </div>
      </section>

    </main>
  );
}

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="font-headline text-2xl text-[#1c1c19]">{title}</h2>
      <div className="text-sm text-on-surface-variant leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-2 [&_strong]:text-[#1c1c19]">
        {children}
      </div>
    </div>
  );
}
