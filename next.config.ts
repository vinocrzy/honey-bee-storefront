import type { NextConfig } from "next";

// ✅ PERFORMANCE: Bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Enable static site generation (SSG)
  // Disabled for MVP development with API integration - will be re-enabled with ISR strategy
  // output: 'export',
  
  // ✅ PERFORMANCE: Enable image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Trailing slashes for static hosting
  trailingSlash: true,
  
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    NEXT_PUBLIC_STORE_ID: process.env.NEXT_PUBLIC_STORE_ID || '1',
    NEXT_PUBLIC_STORE_NAME: process.env.NEXT_PUBLIC_STORE_NAME || 'E-Commerce Store',
  },
};

export default withBundleAnalyzer(nextConfig);
