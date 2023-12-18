/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["/**"],
  },

  env: {
    BE_URL: "http://localhost:8000/"
  }
};

module.exports = nextConfig;
