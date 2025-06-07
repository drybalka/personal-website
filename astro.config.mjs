// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
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
