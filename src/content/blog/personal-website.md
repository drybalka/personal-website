---
title: Personal website
date: 2025-11-19
---

This summer I finally got around to creating a small personal website/blog, with no purpose or agenda beyond simply having a place for myself, something public and private at the same time.
Later my experience turned out to be helpful for a friend to setup a web page for their organization.
This is why in this blog post I hope to show that it was actually quite easy and rewarding to make a website.

### Why would you even want to make a website

Maybe you already have a club or organization that wants to make its presence on the web more official.
Or maybe one of your friends has a small business and wants to make it more visible.
But even for a regular software developer building a personal website can be worthwhile:

- **Learning opportunity**:
   Building a website from scratch is a great way to learn new technologies, frameworks, and tools.
   You are not forced to build the same enterprisy React frontend in the name of tech-stack homogeneity.
   Take a look at Svelte, Solid, HTMX, or do it in pure HTML+JS.
   Write it in Elm, Scala, or Rust.
   Choose a component library that you like such as Material, Lit, or do your own thing.
   Deploy it to AWS with all the IaC fanfare, to Cloudflare with a few clicks, or if you acquired a certain disdain towards the two in light of recent outages consider smaller host providers and clouds.
- **End result**:
   Writing a website is a project of exactly the right size (~ a few evenings/weekends) to give you a sense of accomplishment, while not being trivial or overwhelming.
   Plus, in the end you will get a visible and obvious end product.
- **Fun and creativity**:
   If you`re like me and cannot paint or create anything pretty with your hands then making a website is a great way to be creative.
   You can design it however you like, whether that's minimalist or artistic, you can freely steal designs of others or let AI generate new ones until you are satisfied.
- **Visibility**:
   A personal website is a nice thing to add to your LinkedIn/GitHub profile and your resume.
   It is a great way to gather and showcase all your projects, publications, contributions, bio, and whatever else you are proud of in one place.
   And it does not matter if no one except your future self is going to read it, for me it is even rather a plus.
- **Personal domain for emails**:
   Owning a domain means you can use it in your email address (e.g., `me@mydomain.com`), which is not only cool, but also grants freedom in choosing and switching email providers.
   And if this is not enough, with a [SimpleLogin](https://simplelogin.io/) service you may have a different alias for each service (e.g., `bank@mydomain.com`, `spam@mydomain.com`, etc.).
- **Time capsule**:
   Having your own personal blog on the internet ensures your posts will not get lost.
   You are also free to write whatever you want, for yourself, without the need to stick to a particular topic or professional tone.
   And in a few years it may be fun to look back at what interested you in the past.
- **Motivation for self-improvement**:
   Finally, knowing that your work is publicly visible can motivate you to research new topics, experiment with projects and ideas, and share your results.
   The website is also a great platform for whatever prototype you want to show.
   Besides, I've heard many people from academia just simply like writing and publishing stuff =)


### How to create one

As mentioned above there are plenty of choices waiting for you along the way to your own website.
But disregarding the defeatist WordPress/Wix approach in general one would follow the following steps:

1. **Write the website**
   and make it run locally.

   Here I decided to go with [Astro](https://astro.build/), which basically compiles your JSX-like code into static HTML+CSS pages.
   It was designed for content-driven websites (for example, blogs, shops, landing pages) with possibly small interactive islands in contrast to web applications (like social networks, collaboration tools, web games), which are better served by React and others.
   And what I liked the most about Astro is its clear documentation, which will be accessible even for beginners.

2. **Choose and buy a domain.**
   First you need to decide on a good name and the top-level domain, which may either be the neutral `.com` or a more personal `.me`, `.dev`, or `.blog`.
   Then you must register it through one of the countless domain registrars for a fee of ~10€/year depending on the name.

   Here I went with a domain service at [Scaleway](https://www.scaleway.com/) cloud provider, because I initially wanted to host the website there.
   It also has a free tier for the DNS service and gives access to any cloud functionality I may want in the future.

3. **Find a hosting provider**
   and connect your domain to it, which is usually done by adding a few lines to the DNS settings.

   There are again many options here, but for my use case I was very happy to find [StaticHost.eu](https://statichost.eu/), which is simple, free for small websites, automatically issues TLS certificates, and supports automatic deployments.


In the end I can say that I enjoyed the process and am quite satisfied with the [end result](https://drybalka.com/).
I admit, I am still bad at frontend development, which you can attest to from my monochrome colorscheme and spartan design.
But there is something liberating about having your own tiny corner of the internet, just like everyone had in the early days of the internet.
