export async function getServerSideProps({ res }) {
  const siteUrl = "https://www.arenq.co.in";

  /* =========================================================
     Static Website Pages
  ========================================================= */

  const staticPages = [
    "/",
    "/shop",
    "/about-us",
    "/contact-us",
  ];

  /* =========================================================
     Product Pages
     Actual URL format:
     https://www.arenq.co.in/products/product-name
  ========================================================= */

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

  /* =========================================================
     Generate Static Page URLs
  ========================================================= */

  const staticUrls = staticPages
    .map((page) => {
      const priority =
        page === "/"
          ? "1.0"
          : page === "/shop"
          ? "1.0"
          : "0.8";

      return `
        <url>
          <loc>${siteUrl}${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>${priority}</priority>
        </url>
      `;
    })
    .join("");

  /* =========================================================
     Generate Product URLs
  ========================================================= */

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

  /* =========================================================
     Generate Final Sitemap XML
  ========================================================= */

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticUrls}

${productUrls}

</urlset>`;

  /* =========================================================
     Response Headers
  ========================================================= */

  res.setHeader("Content-Type", "text/xml");

  res.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400, stale-while-revalidate"
  );

  res.write(sitemap);

  res.end();

  return {
    props: {},
  };
}

/* =========================================================
   Empty Component
========================================================= */

export default function SiteMap() {
  return null;
}