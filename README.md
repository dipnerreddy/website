```markdown
# Radiant High School Website

This is the official website for Radiant High School, built to provide information about academics, activities, achievements, and connect with our alumni community. The website is designed to be fast, responsive, and easily updatable.

## Table of Contents

*   [About The Project](#about-the-project)
*   [Key Features](#key-features)
*   [Built With](#built-with)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Development Server](#running-the-development-server)
*   [Environment Variables](#environment-variables)
*   [Building for Production](#building-for-production)
*   [Deployment](#deployment)
*   [Content Guidelines](#content-guidelines)
    *   [Alumni Page Images](#alumni-page-images)
    *   [Ticker News (Homepage)](#ticker-news-homepage)
    *   [Gallery Images](#gallery-images)
*   [Folder Structure (Simplified)](#folder-structure-simplified)
*   [License](#license)

## About The Project

A modern, responsive website for Radiant High School, built with Next.js for optimal performance and SEO. It features various sections including a dynamic gallery, news ticker, academic information, and alumni profiles. The site is statically generated for fast loading times and can be hosted on various static hosting platforms.

<!-- Add a link to your live demo if available -->
<!-- **Live Demo:** [your-website-url.com](https://your-website-url.com) -->

## Key Features

*   **Static Site Generation (SSG):** Optimized for performance, security, and SEO.
*   **Responsive Design:** Adapts to various screen sizes (desktops, tablets, mobiles).
*   **Dynamic News Ticker:** Fetches and displays latest announcements from a CSV file.
*   **Image Gallery:** Showcases school events and infrastructure.
*   **Comprehensive Sections:** Includes About Us, Academics, Achievements, Activities, Alumni, Faculty & Committees, Gallery, Infrastructure, and News.
*   **Type-Safe Codebase:** Built with TypeScript for improved developer experience and fewer bugs.

## Built With

This project leverages a modern web development stack:

*   **[Next.js](https://nextjs.org/) (v15.1.8 or similar):** A React framework for production-grade applications, enabling Server-Side Rendering (SSR) and Static Site Generation (SSG).
*   **[React](https://reactjs.org/):** A JavaScript library for building user interfaces.
*   **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapidly building custom user interfaces.
*   **[PapaParse](https://www.papaparse.com/):** A powerful, in-browser CSV parser used for the news ticker functionality.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   **Node.js:** Version 18.x or later recommended. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager) or **yarn**: Comes with Node.js or can be installed separately.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/my-website.git
    cd my-website
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
    Or if you use yarn:
    ```bash
    yarn install
    ```

### Running the Development Server

To start the development server (usually on `http://localhost:3000`):

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will automatically reload if you change any ofthe source files.

## Environment Variables

This project uses environment variables for configuration. Create a `.env.local` file in the root of your project and add the necessary variables.

Example `.env.local`:

```env
NEXT_PUBLIC_TICKER_NEWS_CSV_URL="https://example.com/path/to/your/ticker-news.csv"
# For local development, you can place the CSV in your public folder:
# NEXT_PUBLIC_TICKER_NEWS_CSV_URL="/data/ticker-news.csv"
# (and place ticker-news.csv in public/data/)

# Example for gallery image source (if configurable, otherwise it might be hardcoded or handled differently)
# NEXT_PUBLIC_GALLERY_IMAGE_FOLDER="radiant_high_gallery"
```

*   `NEXT_PUBLIC_TICKER_NEWS_CSV_URL`: The public URL of the CSV file used to populate the homepage news ticker. This URL is fetched client-side.

**Note:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Building for Production

To create an optimized production build suitable for static hosting:

```bash
npm run build
```

This command will:

1.  Compile your TypeScript and React code.
2.  Optimize assets (images, CSS, JS).
3.  Generate static HTML, CSS, and JavaScript files in the `out/` directory. This is configured by `output: 'export'` in `next.config.js`.

## Deployment

The `npm run build` command generates a static site in the `out/` directory. You can deploy the contents of this `out/` folder to any static hosting service.

**Recommended Hosting Platforms:**

*   **Hostinger:** Upload the contents of the `out/` folder to your `public_html` directory. You may need to configure an `.htaccess` file to handle client-side routing for Next.js:
    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
    ```
*   **Vercel:** (The creators of Next.js) Offers seamless deployment directly from your Git repository.
*   **Netlify:** Another popular option for static site hosting with Git integration.
*   **GitHub Pages:** Suitable for simple static sites.

## Content Guidelines

To ensure consistency and optimal performance, please adhere to the following content guidelines:

### Alumni Page Images

*   **Dimensions:** All images for alumni profiles **must be 400 pixels wide and 300 pixels high (400x300px)**.
*   **Aspect Ratio:** This corresponds to a 4:3 aspect ratio.
*   **Format:** Use web-optimized formats like JPG, PNG, or WebP.
*   **Optimization:** Compress images before uploading to reduce file size without significant quality loss. Tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) can be used.
*   **File Naming:** Use descriptive file names (e.g., `john-doe-batch-2005.jpg`).

### Ticker News (Homepage)

*   The news ticker content is managed via a CSV file.
*   The URL to this CSV file is set in the `NEXT_PUBLIC_TICKER_NEWS_CSV_URL` environment variable.
*   **CSV Structure:** The CSV file should have the following columns (header row is expected):
    *   `ID`: A unique identifier for the news item (e.g., 1, 2, 3).
    *   `NewsText`: The actual news content to be displayed.
    *   `IsActive` (Optional): Set to `TRUE` to display the news, `FALSE` or leave blank/omit column to hide. Case-insensitive.
    *   `Order` (Optional): A number to define the display order of active news items. Lower numbers appear first.
*   Ensure the CSV file is publicly accessible if hosted externally and that CORS headers are configured correctly if it's on a different domain.

### Gallery Images

*   Gallery images appear to be sourced from a folder named `radiant_high_gallery` during the build process (as per build logs).
*   **Management:** To add or update gallery images, [describe the process here - e.g., "add/remove images in the `public/images/gallery/radiant_high_gallery` folder and rebuild the site." or "update the image sources in the relevant data file/CMS and rebuild."].
*   **Optimization:** Like alumni images, ensure gallery images are optimized for the web to improve page load times.

## Folder Structure (Simplified)

```
my-website/
├── .next/                # Next.js build output (development)
├── out/                  # Static export output (after `npm run build`)
├── public/               # Static assets (images, fonts, CSVs if hosted locally)
│   ├── data/
│   │   └── ticker-news.csv # Example local CSV
│   └── ...
├── src/
│   ├── app/              # Next.js App Router (pages, layouts, components)
│   │   ├── (main)/       # Route group for main layout
│   │   │   ├── about-us/
│   │   │   ├── gallery/
│   │   │   └── ...       # Other page routes
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   ├── components/       # Reusable UI components
│   │   ├── homepage/
│   │   │   └── HomeComponent1.tsx # News Ticker
│   │   └── ...
│   ├── lib/              # Utility functions, helpers
│   └── styles/           # Global styles, Tailwind CSS config
├── .env.local            # Local environment variables (DO NOT COMMIT SENSITIVE INFO)
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## License

Distributed under the MIT License. See `LICENSE` file for more information (if you have one, otherwise state it here).

---

This README provides a comprehensive overview. Feel free to expand on sections as the project evolves!
```



give me this text as one single markdown code.