import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const books = defineCollection({
  loader: file("src/content/books.yaml"),
  schema: z.object({
    title: z.string(),
    href: z.string(),
    review: z.string(),
    isRecommended: z.boolean(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = { books, blog };
