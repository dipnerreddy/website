// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Safelist for dynamically generated classes like event.ColorClass
  safelist: [
    // Add all the specific bg-color-xxx classes you intend to use from your CSV
    // for the timeline icon backgrounds
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500', // Example
    'bg-indigo-500', // Example
    'bg-pink-500',   // Example
    'bg-teal-500',   // Example
    'bg-gray-400',   // Your fallback color
    // Add any other dynamic classes you might be constructing
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // You can also extend your colors here if needed
      // colors: {
      //   'custom-blue': '#1A3E72',
      //   'custom-gold': '#FFD700',
      // }
    },
  },
  plugins: [],
};
export default config;