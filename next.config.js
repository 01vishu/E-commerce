/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname), "styles"],
    prependData: `@import "./base.scss";`,
  },

  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
