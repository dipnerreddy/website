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

// If you are using @tailwindcss/aspect-ratio, your tailwind.config.js should have it in plugins:
/*
// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/** /*.{js,ts,jsx,tsx,mdx}",
    "./src/components/** /*.{js,ts,jsx,tsx,mdx}",
    "./src/app/** /*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // Make sure this is installed and added
    // other plugins...
  ],
};
*/