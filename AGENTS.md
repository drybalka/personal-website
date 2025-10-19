# AGENT.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build for production**: `pnpm build` or `npm run build`
- **Preview production build**: `pnpm preview` or `npm run preview`
- **Format code**: `prettier --write .` (Prettier is configured with Astro and Tailwind plugins)

## Architecture Overview

This is an Astro-based personal website with blog and bookshelf functionality. Key architectural components:

### Content Management
- **Blog posts**: Markdown files in `src/content/blog/` with frontmatter (title, date)
- **Books/Posts/Talks**: YAMLs in `src/content` with structured entries
- **Content collections**: Defined in `src/content.config.ts` using Astro's content collections API

### Styling & Theming
- **Tailwind CSS v4**: Used for styling with dark theme (zinc-900 background, zinc-200 text)
- **Custom fonts**: Google Fonts integration (Roboto Mono, Lato, Montserrat) via Astro's experimental font loading
- **Prose styling**: Custom `prose-blog` class for blog content with KaTeX math rendering support

### Page Structure
- **Layout system**: Base layout in `src/layouts/Layout.astro` with consistent header/navigation
- **Dynamic routing**: Blog posts use `[id].astro` dynamic routing pattern
- **Static generation**: All pages are statically generated at build time

### Math & Content Processing
- **Mathematical notation**: Configured with remark-math and rehype-katex for LaTeX-style math rendering
- **Conditional KaTeX loading**: Blog posts automatically load KaTeX CSS only when math symbols are detected
- **Code highlighting**: Shiki with "rose-pine" theme for syntax highlighting

### Components
- Navigation with responsive hamburger menu
- Project showcase components
- Book table for bookshelf display
- SVG logo and icon components

Content is managed through Astro's file-based routing and content collections, with blog posts sorted by date in descending order.

## Writing Style & Content Guidelines

Based on the existing blog posts, maintain these stylistic elements when creating or editing content:

### Technical Writing Style
- **Conversational yet authoritative**: Posts blend personal experience with technical depth
- **Problem-first approach**: Start with real-world problems before diving into solutions
- **Educational focus**: Explain concepts thoroughly with context and background
- **Practical examples**: Include concrete code examples, calculations, and visual aids

### Content Characteristics
- **Physics background influence**: Mathematical notation (LaTeX), scientific approach to problem-solving
- **Software development focus**: Backend development, systems architecture, open-source contributions
- **Tool recommendations**: Critical evaluation of technologies with specific alternatives (e.g., jOOQ over Hibernate)
- **Visual storytelling**: Include diagrams, graphs, and images to illustrate concepts
- **Follow-up questions**: End sections with thought-provoking extensions or considerations

### Technical Topics Covered
- System architecture and dependency management
- Development tools and workflows (mitmproxy, AWS, package management)
- Mathematical/physics applications in software
- Critical analysis of popular frameworks and tools
- Back-of-the-envelope calculations and system design

### Tone Guidelines
- Slightly informal but professional
- Self-deprecating humor when appropriate
- Critical but constructive when discussing tools/frameworks
- Encouraging toward readers ("if you haven't tried X, I strongly advise...")
- Physics/academic background occasionally referenced for credibility
