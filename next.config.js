const withTM = require("next-transpile-modules")(["react-draft-wysiwyg"]);
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,



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