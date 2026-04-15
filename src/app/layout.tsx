import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { defaultTheme } from "@/config/theme.config";

/* ── Honey Bee typography: Noto Serif (headlines) + Manrope (body / labels) ── */
// ✅ PERFORMANCE: Optimized fonts with preload
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-headline",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // ✅ Reduced from 6 to 4 weights
  variable: "--font-body",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_STORE_NAME || "Honey Bee — Artisan Soaps",
  description: "Slow-made artisan soaps crafted with Ayurvedic wisdom. Handcrafted in small batches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${manrope.variable} h-full`}
    >
      <head>
        {/* Material Symbols Icons - Load synchronously for immediate display */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
        </noscript>
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fcf9f4] text-[#1c1c19] antialiased">
        {/* ✅ ACCESSIBILITY: Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="skip-to-main sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>

        <ThemeProvider initialTheme={{
          id: parseInt(process.env.NEXT_PUBLIC_STORE_ID || '1'),
          storeName: process.env.NEXT_PUBLIC_STORE_NAME || 'Honey Bee Atelier',
          domain: process.env.NEXT_PUBLIC_STORE_DOMAIN || null,
          theme: defaultTheme,
        }}>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

