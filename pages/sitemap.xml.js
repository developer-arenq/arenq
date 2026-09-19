
export async function getServerSideProps({ res }) {
  const siteUrl = "https://www.arenq.co.in";

  // Static website pages
  const staticPages = [
    "/shop",
    "/about-us",
    "/contact-us",
  ];

  // Product pages - based on pages available in /products
  const productPages = [
    "agricultural-battery",
    "battery-energy-storage-system-bess",
    "electric-vehicle-battery",
    "electromagnetic-crane-battery",
    "engine-cranking-battery",
    "golf-cart-buggy-battery",
    "industrial-ups-battery",
    "inverter-battery",
    "lead-acid-vs-lithium-battery",
    "manufacturing-setup-capacity",
    "marine-battery",
    "medical-battery",
    "mhe-battery",
    "power-sector-battery",
    "robotics-battery",
    "solar-street-light-battery",
    "telecom-battery",
  ];

  // Static URLs
  const staticUrls = staticPages
    .map(
      (page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === "/shop" ? "1.0" : "0.8"}</priority>
    </url>
  `
    )
    .join("");

  // Product URLs
  const productUrls = productPages
    .map(
      (page) => `
    <url>
      <loc>${siteUrl}/products/${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `
    )
    .join("");

  // Final XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${productUrls}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400"
  );

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null;
}

