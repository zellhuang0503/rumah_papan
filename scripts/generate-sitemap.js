import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Modify this domain to match your actual production domain
const DOMAIN = process.env.VITE_SITE_URL || 'https://rumah-papan.com';

const routes = [
  '/',
  '/home',
  '/about',
  '/about/environment',
  '/stories',
  '/services',
  '/about/rental',
  '/village/activities',
  '/village/stay',
  '/village/work-swap',
  '/village/traffic',
  '/village/map',
  '/products',
  '/booking/stay',
  '/contact'
];

const generateSitemap = () => {
  const date = new Date().toISOString();

  const urls = routes.map((route) => {
    return `
    <url>
      <loc>${DOMAIN}${route === '/' ? '' : route}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const publicPath = path.resolve(__dirname, '../public');
  
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  const sitemapPath = path.join(publicPath, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');

  console.log(`✅ Sitemap successfully generated at: ${sitemapPath}`);
  console.log(`🌐 Base Domain: ${DOMAIN} (Can be configured via VITE_SITE_URL environment variable)`);
};

generateSitemap();
