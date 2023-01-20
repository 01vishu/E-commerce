/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  swcMinify: false,
  sassOptions: {
    includePaths: [path.join(__dirname), "styles"],
    prependData: `@import "./base.scss";`,
  },
  // experimental: {
  //   concurrentFeatures: true,
  // },
  env: {
    BASE_URL: "http://localhost:3000",
  },
  images: {
    domains: [
      "cdn.nutrabay.com",
      "png2.cleanpng.com",
      "e7.pngegg.com",
      "www.pngegg.com",
      "icon2.cleanpng.com",
    ],
  },
};

module.exports = nextConfig;
