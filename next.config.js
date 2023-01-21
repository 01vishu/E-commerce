/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname), "styles"],
    prependData: `@import "./base.scss";`,
  },

  images: {
    domains: ["cdn.nutrabay.com"],
  },
};

module.exports = nextConfig;
