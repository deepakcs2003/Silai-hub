// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://guddisilai.shop' });
  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  // Static frontend routes
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/gallery', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/details', changefreq: 'monthly', priority: 0.6 });
  sitemap.write({ url: '/login-signup', changefreq: 'monthly', priority: 0.6 });
  sitemap.write({ url: '/login', changefreq: 'monthly', priority: 0.6 });
  sitemap.write({ url: '/signup', changefreq: 'monthly', priority: 0.6 });
  sitemap.write({ url: '/admin', changefreq: 'monthly', priority: 0.5 });
  sitemap.write({ url: '/view_product', changefreq: 'monthly', priority: 0.5 });
  // Product details route (dynamic)
  sitemap.write({ url: '/product/sample-product-id', changefreq: 'weekly', priority: 0.6 });
  sitemap.write({ url: '/cart', changefreq: 'weekly', priority: 0.8 });
  sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/feedback', changefreq: 'monthly', priority: 0.7 });

  // Dynamic route examples (optional)
  // These are just placeholders. In real use, fetch dynamic IDs from a DB.
  sitemap.write({ url: '/product/sample-id/sample-type', changefreq: 'weekly', priority: 0.6 });
  sitemap.write({ url: '/order/sample-id/sample-type', changefreq: 'weekly', priority: 0.6 });

  sitemap.end();
  await streamToPromise(sitemap);
  console.log('✅ Sitemap generated successfully.');
})();
