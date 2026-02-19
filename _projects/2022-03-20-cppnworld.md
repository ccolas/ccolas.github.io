---
title: 'Breeding Visual Universes'
subtitle: 'Evolving worlds of colors'
date: 2022-03-20 00:00:00
description: Creating and evolving algorithmic universes of color through computational evolution.
featured_image: '/images/projects/cppnworld/id1.jpg'
---

<img src="/images/projects/cppnworld/id2.jpg" class="responsive-image">

### The Idea

A few years ago I discovered <a href="https://nbenko1.github.io/#/" target="_blank" rel="noopener noreferrer">Picbreeder</a>: you see a grid of images, pick your favorites, and the computer breeds new variations from them. Repeat, and you end up with images neither you nor the machine would have created alone.

I wanted to build my own version and push it further. What if each image was a window into a mathematical universe, and instead of breeding images you could breed entire worlds?

### How It Works

The images come from small networks called Compositional Pattern Producing Networks (<a href="https://gwern.net/doc/ai/nn/fully-connected/2007-stanley.pdf" target="_blank" rel="noopener noreferrer">CPPNs</a>). A CPPN does two things. It maps pixel coordinates to colors — feed it a position, it returns a color; feed it all positions and you get an image (left). And it builds complexity by composing simple functions (sine, cosine, gaussian) into a deeper computational graph (right).    



<figure class="image-pair-figure">
  <div class="image-pair-equal-height">
  <img src="/images/projects/cppnworld/cppn2.png" alt="Generating an image from a CPPN">
  <img src="/images/projects/cppnworld/cppn.png" alt="CPPN computational graph diagram">
  </div>
<br>
  <p class="caption">A CPPN maps each pixel's (x, y) coordinates through composed functions to produce a color. <a href="https://gwern.net/doc/ai/nn/fully-connected/2007-stanley.pdf" target="_blank" rel="noopener noreferrer">Left</a>, <a href="https://towardsdatascience.com/understanding-compositional-pattern-producing-networks-810f6bef1b88" target="_blank" rel="noopener noreferrer">Right</a>.</p>
</figure>

### Windows Into Other Worlds

But why stop at pixel coordinates? In this project, each CPPN takes geographic coordinates too; latitude, longitude, altitude, on top of local pixel positions. The same CPPN produces a different image depending on *where* you open a window into it. Nearby locations produce similar views, distant ones reveal different patterns. A single CPPN defines an entire visual universe: you just need to decide where to look.

I opened windows at my own place and at friends' houses closer and further away, creating a set of viewpoints into each universe.

### Breeding Universes

I start with a population of random CPPNs, each one encoding a small, unique universe. For each of them I look through the 9 windows, then I pick my favorites. The selected networks reproduce: their structures combine, mutations add new nodes or connections, and the next generation appears. Repeat over many generations, and the patterns become increasingly intricate and beautiful.

This is interactive evolution: I act as the selection pressure, and the algorithm handles variation and reproduction.

### Gallery

Eighteen evolved universes, each shown through nine windows placed ok at different locations:

<div class="gallery" data-columns="3">
    <img loading="lazy" src="/images/projects/cppnworld/id2.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id3.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id4.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id5.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id6.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id7.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id8.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id9.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id10.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id11.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id12.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id13.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id14.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id15.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id16.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id17.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id18.jpg">
    <img loading="lazy" src="/images/projects/cppnworld/id19.jpg">
</div>
