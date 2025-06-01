// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', 
  eslint: {
    // Warning: This disables ESLint during production builds!
    // Only use this temporarily if you understand the consequences.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['radianthighschool.in'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dnlczwmgv/image/upload/**', // 'dnlczwmgv' is your cloud name
      },
      // You can add other domains here if needed for other images in your app
      // e.g., { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // If you use any other Next.js specific configurations, they go here
};

module.exports = nextConfig;

