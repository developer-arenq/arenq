const withTM = require("next-transpile-modules")(["react-draft-wysiwyg"]);
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/products/himalayan-sea-buckthorn-juice",
        destination: "/products/sea-buckthorn-juice",
        permanent: true, // 308 redirect (SEO friendly)
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "arenq.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "arenq.s3.amazonaws.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.arenq.co.in" },
      { protocol: "https", hostname: "arenq.co.in" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

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

module.exports = withTM(nextConfig);