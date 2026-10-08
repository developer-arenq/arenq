const withTM = require("next-transpile-modules")([
  "react-draft-wysiwyg",
]);

const webpack = require("webpack");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  /* =========================================================
     301 PERMANENT REDIRECTS
     Old Product URL → New /products/ URL
  ========================================================= */

  async redirects() {
    return [
      // Agricultural Battery
      {
        source: "/agricultural-battery",
        destination: "/products/agricultural-battery",
        permanent: true,
      },

      // Battery Energy Storage System (BESS)
      {
        source: "/battery-energy-storage-system-bess",
        destination: "/products/battery-energy-storage-system-bess",
        permanent: true,
      },

      // Electric Vehicle Battery
      {
        source: "/electric-vehicle-battery",
        destination: "/products/electric-vehicle-battery",
        permanent: true,
      },

      // Electromagnetic Crane Battery
      {
        source: "/electromagnetic-crane-battery",
        destination: "/products/electromagnetic-crane-battery",
        permanent: true,
      },

      // Engine Cranking Battery
      {
        source: "/engine-cranking-battery",
        destination: "/products/engine-cranking-battery",
        permanent: true,
      },

      // Golf Cart / Buggy Battery
      {
        source: "/golf-cart-buggy-battery",
        destination: "/products/golf-cart-buggy-battery",
        permanent: true,
      },

      // Industrial UPS Battery
      {
        source: "/industrial-ups-battery",
        destination: "/products/industrial-ups-battery",
        permanent: true,
      },

      // Inverter Battery
      {
        source: "/inverter-battery",
        destination: "/products/inverter-battery",
        permanent: true,
      },

      // Lead Acid vs Lithium Battery
      {
        source: "/lead-acid-vs-lithium-battery",
        destination: "/products/lead-acid-vs-lithium-battery",
        permanent: true,
      },

      // Manufacturing Setup & Capacity
      {
        source: "/manufacturing-setup-capacity",
        destination: "/products/manufacturing-setup-capacity",
        permanent: true,
      },

      // Marine Battery
      {
        source: "/marine-battery",
        destination: "/products/marine-battery",
        permanent: true,
      },

      // Medical Battery
      {
        source: "/medical-battery",
        destination: "/products/medical-battery",
        permanent: true,
      },

      // MHE Battery
      {
        source: "/mhe-battery",
        destination: "/products/mhe-battery",
        permanent: true,
      },

      // Power Sector Battery
      {
        source: "/power-sector-battery",
        destination: "/products/power-sector-battery",
        permanent: true,
      },

      // Robotics Battery
      {
        source: "/robotics-battery",
        destination: "/products/robotics-battery",
        permanent: true,
      },

      // Solar Street Light Battery
      {
        source: "/solar-street-light-battery",
        destination: "/products/solar-street-light-battery",
        permanent: true,
      },

      // Telecom Battery
      {
        source: "/telecom-battery",
        destination: "/products/telecom-battery",
        permanent: true,
      },
    ];
  },

  /* =========================================================
     IMAGE CONFIGURATION
  ========================================================= */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arenq.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "arenq.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.arenq.co.in",
      },
      {
        protocol: "https",
        hostname: "arenq.co.in",
      },
    ],

    formats: ["image/avif", "image/webp"],

    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  /* =========================================================
     WEBPACK CONFIGURATION
  ========================================================= */

  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );
    }

    return config;
  },
};

/* =========================================================
   EXPORT
========================================================= */

module.exports = withTM(nextConfig);