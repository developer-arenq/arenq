import dbConnect from "../database/conn";
import Product from "../models/productSchema";

export async function getServerSideProps({ res }) {
  const siteUrl = "https://www.arenq.co.in";

  await dbConnect();

  const products = await Product.find(
    {},
    "slug updatedAt images name alt_text main_image category_id"
  ).lean();

  /* 🔥 STATIC PAGES */
  const staticPages = [
    "",
    "/shop",
    "/about-us",
    "/contact-us",
  ];

  const staticUrls = staticPages
    .map(
      (page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <changefreq>daily</changefreq>
      <priority>${page === "" ? "1.0" : "0.9"}</priority>
    </url>
  `
    )
    .join("");

  /* 🔥 CATEGORY URLS */
  const categories = [
    "himalayan-products",
    "organic-products",
    "handmade-products",
    "handlooms",
    "skincare-and-beauty",
    "handcrafts",
    "Natural-Food-Products",
    "health-care",
    "gift-and-hamper",
  ];

  const categoryUrls = categories
    .map(
      (cat) => `
    <url>
      <loc>${siteUrl}/collections/${cat}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join("");

  /* 🔥 PRODUCT URLS */
  const productUrls = products
    .map((product) => {
      const url = `${siteUrl}/products/${product.slug}`;

      const lastmod = new Date(
        product.updatedAt || Date.now()
      ).toISOString();

      const rawImages = [
        product.main_image,
        ...(Array.isArray(product.images) ? product.images : []),
      ].filter(Boolean);

      const images = [...new Set(rawImages)];

      const imageBlocks = images
        .slice(0, 5)
        .map(
          (img) => `
      <image:image>
        <image:loc>${img}</image:loc>
        <image:title><![CDATA[${product.name}]]></image:title>
        <image:caption><![CDATA[${product.alt_text || product.name
            }]]></image:caption>
      </image:image>
    `
        )
        .join("");

      return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
        ${imageBlocks}
      </url>
    `;
    })
    .join("");

  /* 🔥 FINAL XML */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  ${staticUrls}
  ${categoryUrls}
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