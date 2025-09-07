// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import { remarkTwoColumn } from './src/lib/remark-two-column';
import { remarkSectionWrapper } from './src/lib/remark-section-wrapper';
import remarkShortcodes from './src/lib/remark-shortcodes';
import { loadEnv } from 'vite';

// Load environment variables
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

// Prepare shortcode values from environment variables
const shortcodeValues = {
  businessName: env.PUBLIC_BUSINESS_NAME || 'Your Business Name',
  phone: env.PUBLIC_PHONE || '(00) 0000 0000',
  email: env.PUBLIC_EMAIL || 'info@example.com',
  formattedPhone: env.PUBLIC_PHONE_DIGITS_ONLY || env.PUBLIC_PHONE?.replace(/\D/g, '') || '0000000000',
  street: env.PUBLIC_STREET_ADDRESS || '123 Main Street',
  city: env.PUBLIC_CITY || 'Your City',
  state: env.PUBLIC_STATE || 'Your State',
  postcode: env.PUBLIC_POSTCODE || '0000',
  governingState: env.PUBLIC_STATE || 'Your State',
  governingCity: env.PUBLIC_CITY || 'Your City',
  serviceRadius: env.SERVICE_RADIUS_KM || '50',
  mainLocation: env.PUBLIC_MAIN_LOCATION || `${env.PUBLIC_CITY || 'Your City'}, ${env.PUBLIC_STATE || 'Your State'} ${env.PUBLIC_POSTCODE || '0000'}`,
};

// https://astro.build/config
export default defineConfig({
  // Site URL is required for sitemap generation
  // This should be updated to the actual production URL
  site: 'https://yourdomain.com',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [
      remarkSectionWrapper, 
      remarkTwoColumn,
      [remarkShortcodes, shortcodeValues]
    ],
    rehypePlugins: [rehypeRaw]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});