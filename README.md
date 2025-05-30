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