/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["/**"],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: '' // Đặt giá trị CSP mong muốn hoặc để trống để tắt CSP
          },
        ],
      },
    ];
  },

};

module.exports = nextConfig;
