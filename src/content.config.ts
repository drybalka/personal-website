import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

const books = defineCollection({
  loader: file("src/content/books.yaml"),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    href: z.string(),
    review: z.string(),
    isRecommended: z.boolean(),
  }),
});

const posts = defineCollection({
  loader: file("src/content/posts.yaml"),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    href: z.string(),
    review: z.string(),
  }),
});

const talks = defineCollection({
  loader: file("src/content/talks.yaml"),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    href: z.string(),
    review: z.string(),
  }),
});

export const collections = { books, blog, posts, talks };
