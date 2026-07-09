import React from "react";
import Head from "next/head";
import mime from "mime-types";

/* ------------------ HELPERS ------------------ */

// Extract clean text from draft.js JSON
const extractPlainTextFromDesc = (desc) => {
  try {
    const parsed = JSON.parse(desc);
    if (parsed?.blocks?.length) {
      return parsed.blocks
        .map((block) => block.text)
        .join(" ")
        .replace(/[\r\n]+/g, " ")
        .slice(0, 160);
    }
  } catch {
    return "";
  }
  return "";
};

// Get lowest variant price
const getLowestPrice = (product) => {
  if (Array.isArray(product?.variants) && product.variants.length > 0) {
    return Math.min(...product.variants.map((v) => v.price));
  }
  return product?.price || 199;
};

// Check stock
const isOutOfStock = (product) => {
  if (Array.isArray(product?.variants)) {
    return product.variants.every((v) => v.stock <= 0);
  }
  return product?.out_of_stock;
};

// ✅ SAFE IMAGE HANDLER (CRITICAL FIX)
const getValidImage = (product) => {
  const candidates = [
    product?.main_image,
    ...(product?.images || []),
  ];

  for (const img of candidates) {
    if (
      img &&
      img !== "null" &&
      img !== "undefined" &&
      typeof img === "string" &&
      img.startsWith("http")
    ) {
      return img;
    }
  }

  return "https://www.arenq.co.in/default-product.jpg";
};

/* ------------------ MAIN COMPONENT ------------------ */

const ProductSEOHead = ({ product }) => {
  if (!product) return null;

  const host = "https://www.arenq.co.in";

  const productName = product.name || "ARENQ Product";
  const categoryName =
    product?.category_id?.name ||
    product?.subcat ||
    "Energy Storage Solutions";

  const canonicalUrl = `${host}/products/${product.slug}`;

  // ✅ FIXED IMAGE
  const rawImage = getValidImage(product);
  const imageUrl = encodeURI(rawImage);

  const mimeType = mime.lookup(imageUrl.split("?")[0]) || "image/jpeg";

  const description =
    product?.seo?.description ||
    extractPlainTextFromDesc(product?.desc) ||
    `${productName} by ARENQ - Advanced lithium battery and energy storage solutions`
  const brandName = product?.brand_id?.name || "ARENQ";
  const price = getLowestPrice(product);
  const outOfStock = isOutOfStock(product);

  const autoKeywords = [
    productName,
    categoryName,
    brandName,
    product?.subcat,
    "lithium battery",
    "LiFePO4 battery",
    "energy storage system",
    "EV battery",
    "solar battery",
    "industrial battery",
    "UPS battery",
    "BESS",
    "battery manufacturer India",
    "ARENQ",
  ].filter(Boolean);

  const keywordsSource = [
    ...(product?.seo?.keywords || []),
    ...(product?.semantic_keywords || []),
    ...autoKeywords,
  ];

  const keywords = Array.from(new Set(keywordsSource)).slice(0, 20);

  // price valid until (1 year)
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split("T")[0];

  /* ------------------ STRUCTURED DATA ------------------ */

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": canonicalUrl + "#product",



    name: productName,
    image: [imageUrl],
    description: description,
    sku: product.SKU || product._id,
    category: categoryName,

    countryOfOrigin: {
      "@type": "Country",
      name: product.country_of_origin || "India",
    },

    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Battery Type",
        value: product.subcat
      },
      {
        "@type": "PropertyValue",
        name: "Technology",
        value: "Lithium LiFePO4"
      },
      {
        "@type": "PropertyValue",
        name: "Application",
        value: product.applications?.join(", ")
      }
    ].filter(x => x.value),
    brand: {
      "@type": "Brand",
      name: "ARENQ"
    },


    manufacturer: {
      "@type": "Organization",
      name: "Sunlit Power Pvt Ltd - ARENQ"
    },

    ...(product?.structured_data?.ratingValue > 0
      ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(product.structured_data.ratingValue),
          reviewCount: String(product.structured_data.reviewCount),
        },

      }
      : {}),

    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "INR",
      price: price,
      priceValidUntil: priceValidUntil,

      availability: outOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",

      itemCondition: "https://schema.org/NewCondition",

      seller: {
        "@type": "Organization",
        name: "ARENQ"
      },

      // ✅ ADD THIS BLOCK
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 7,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "d",
          },
        },
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },


  };

  const videoSchema =
    product.videos?.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: product.name,
        description: description,
        thumbnailUrl: [imageUrl],
        contentUrl: product.videos[0],
        uploadDate: product.createdAt,
      }
      : null;

  const faqSchema =
    Array.isArray(product.faq)
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faq.flatMap((item) => {
          const normalized = item.replace(/,Ans\./g, " Ans.");

          const matches =
            normalized.match(
              /Q\d+\.\s*(.*?)\?\s*Ans\.\s*(.*?)(?=Q\d+\.|$)/gs
            ) || [];

          return matches.map((entry) => {
            const parts = entry.split("Ans.");

            return {
              "@type": "Question",
              name: parts[0]
                .replace(/Q\d+\./, "")
                .trim(),
              acceptedAnswer: {
                "@type": "Answer",
                text: parts[1]?.trim() || "",
              },
            };
          });
        }),
      }
      : null;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "ARENQ",

    legalName: "Sunlit Power Pvt Ltd",

    url: "https://www.arenq.co.in",

    logo:
      "https://arenq.s3.ap-south-1.amazonaws.com/Arenq_light.png",

    description:
      "ARENQ provides advanced lithium battery technology, EV batteries, solar energy storage and industrial power solutions.",

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8956225134",
      contactType: "customer support",
      areaServed: "IN"
    },

    sameAs: [
      "https://www.linkedin.com/company/arenq",
      "https://www.facebook.com/arenq"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.arenq.co.in"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category_id?.name,
        item: `https://www.arenq.co.in/collections/${product.category_id?.slug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: canonicalUrl
      }
    ]
  };
  /* ------------------ RENDER ------------------ */

  return (
    <Head>
      {/* TITLE */}
      <title key="title">
        {product?.seo?.title || `${productName} | ${categoryName} | ARENQ`}
      </title>

      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <meta property="og:image:alt" content={product.image_caption || product.name} />
      <meta name="author" content="ARENQ" />
      {product.semantic_keywords?.length > 0 && (
        <meta property="article:tag" content={product.semantic_keywords.join(", ")} />
      )}
      <meta name="googlebot" content="index,follow" />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:site" content="@arenq" />
      <meta name="twitter:creator" content="@arenq" />
      <meta property="product:availability" content={outOfStock ? "out_of_stock" : "in_stock"} />
      <meta property="product:brand" content={brandName} />

      {/* BASIC SEO */}
      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* OPEN GRAPH */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={productName} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ARENQ" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={productName} />
      <meta property="og:image:type" content={mimeType} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={productName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <meta property="product:price:amount" content={price} />
      <meta property="product:price:currency" content="INR" />
      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema)
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgSchema),
        }}
      />
    </Head >

  );
};

export default ProductSEOHead;
