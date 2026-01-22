import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Security headers for development server
  server: {
    headers: {
      // Prevent clickjacking attacks
      'X-Frame-Options': 'SAMEORIGIN',
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      // Enable XSS protection in older browsers
      'X-XSS-Protection': '1; mode=block',
      // Control referrer information
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Permissions policy (restrict sensitive features)
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
    }
  },

  // Security headers for preview server (production-like)
  preview: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
      // Content Security Policy for production
      // Note: Adjust 'script-src' and 'style-src' based on your CDN usage
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn-uicons.flaticon.com",
        "font-src 'self' https://fonts.gstatic.com https://cdn-uicons.flaticon.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://*.sanity.io https://cdn.sanity.io",
        "frame-src https://www.google.com https://maps.google.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),
    }
  },

  // Build optimizations for security
  build: {
    // Generate source maps only in development (disabled for production security)
    sourcemap: false,
    // Minify for production
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
})
