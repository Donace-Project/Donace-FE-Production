/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["/**"],
    formats: ['image/webp'],
  },

};

module.exports = nextConfig;
