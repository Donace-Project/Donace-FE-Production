/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["/**"],
  },

  env: {
    BE_URL: "http://171.245.205.120:8082/"
  }
};

module.exports = nextConfig;
