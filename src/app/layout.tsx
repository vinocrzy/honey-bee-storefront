import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { defaultTheme } from "@/config/theme.config";

/* ── Honey Bee typography: Noto Serif (headlines) + Manrope (body / labels) ── */
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-headline",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fcf9f4] text-[#1c1c19] antialiased">
        <ThemeProvider initialTheme={{
          id: parseInt(process.env.NEXT_PUBLIC_STORE_ID || '1'),
          storeName: process.env.NEXT_PUBLIC_STORE_NAME || 'Honey Bee Atelier',
          domain: process.env.NEXT_PUBLIC_STORE_DOMAIN || null,
          theme: defaultTheme,
        }}>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

