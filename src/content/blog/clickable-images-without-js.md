---
title: Clickable images without JS
date: 2025-10-10
---

You probably have seen some articles or talks demonstrating the wonders of modern CSS and HTML and how they enable behaviors previously impossible without JS.
I and probably most of you, however, treat them as nothing more than some cool curiosities and keep stamping React components for any non-trivial use cases.

Well, today I got a chance to implement one of these CSS tricks in a situation where, I believe, it was the right solution.
At the Client we are developing a small website where users may read some static articles fetched from a database.
The content is in markdown and the compilation to HTML happens on the client (don't ask why, it is what it is).
Now markdown is a fine format that covered most of the Client requirements, until we got asked to make some images grow full-screen on click (like in many web-shops, for example).

This is obviously impossible to do in markdown and it was not so obvious how we could send some extra JS to the client elegantly.
Luckily, the react-markdown library we use has a plugin that understands raw HTML elements inside a markdown file.
This, however, comes with a safety feature that escapes all JS code, dashing any hope of using an on-click or `<script>` solution.
This is where the modern CSS comes to shine.

The idea is to use a simple invisible checkbox to hold the state of an image: normal or full-screen, and have separate css styles applied depending in it.
As a first step we wrap our image into a label element, which effectively transforms it into one big checkbox:

```html
<label class="zoomable">
  <input type="checkbox" />
  <img src="..." />
</label>
```

If you try it out without any CSS then clicking on the image will switch the checkbox.
Now the second piece of the puzzle is to use the `:checked` CSS pseudo-selector that can discern different states of the checkbox:

```css
.zoomable {

  /* Hide checkbox */
  input {
    display: none;
  }

  /* Full-screen the label element if it contains a checked checkbox */
  &:has(input:checked) {
    position: fixed;
    inset: 0;
    z-index: 1000;
    ...
  }
}
```

To make the behavior look even cooler we can also add some visual queues for the user to actually click on the image:

```css
.zoomable {
  /* Selects all img inside a zoomable that has no checked checkbox */
  &:not(:has(input:checked)) img {
    cursor: zoom-in;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.02);
    }
  }
}
```

The style above uses some more cool (and self-explanatory) pseudo-selectors to change the cursor shape into a looking glass and add a neat growing animation when hovering over the image.

**Update:**
After publishing this article it was brought to my attention that, first of all, the zoomable element has some accessibility problems as it is not keyboard-selectable.
Secondly, a similar (and accessible) approach is used in DaisyUI component collection, for example, see [DaisyUI's swap component](https://daisyui.com/components/swap/).
I recommend referring there for a more complete and production-ready implementation.
