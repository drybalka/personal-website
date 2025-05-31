// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "rose-pine",
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Roboto Mono",
        cssVariable: "--font-mono",
        fallbacks: ["monospace"],
        subsets: ["latin"],
      },
      {
        provider: fontProviders.google(),
        name: "Lato",
        cssVariable: "--font-main",
        subsets: ["latin"],
      },
      {
        provider: fontProviders.google(),
        name: "Montserrat",
        cssVariable: "--font-title",
        subsets: ["latin"],
      },
    ],
  },
});
