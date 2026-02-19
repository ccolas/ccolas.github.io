---
title: 'Evolutionary Color Search'
subtitle: 'Visualizing evolutionary algorithms'
date: 2022-01-11 00:00:00
description: Exploring the intersection of evolutionary algorithms and visual patterns through color evolution.
featured_image: '/images/projects/color_evolution/evo_18.webp'
---

<center>
<a href="https://github.com/ccolas/color_evolution" target="_blank" rel="noopener noreferrer" class="btn">Code</a>
</center>

### The Idea

I designed this for two 9th graders during their week-long lab internship. The goal: explain evolutionary algorithms in a way you can *see*.

Each individual is a color. Its DNA is an RGB code. Its fitness? How close it is to a target color. Every generation, the fittest reproduce with random mutations applied to their color codes. Over time, the population converges: and it looks pretty!

### Reading the Visualizations

Each colored patch is an individual, each row is a generation. Time flows upward, with the target color placed in the top row.

<img src="/images/projects/color_evolution/evo_1.webp" class="responsive-image">

Here, a random population gradually converges toward the target. Selection does its job.

### Tweaking the Parameters

What happens with a smaller population? Less initial diversity makes it harder to explore the color space. The population converges too early and misses the target.

<img src="/images/projects/color_evolution/evo_pb1.webp" class="responsive-image">

Cranking up mutation strength helps. Children can differ more from their parents, reintroducing diversity. Notice the greater variation remaining in the final generation.

<img src="/images/projects/color_evolution/evo_pb2.webp" class="responsive-image">

With a larger population (~100 individuals), there's enough initial diversity to keep mutations small. The result: smooth, precise convergence.

<img src="/images/projects/color_evolution/evo_big.webp" class="responsive-image">

Play with the <a href="https://github.com/ccolas/color_evolution" target="_blank" rel="noopener noreferrer">code</a>
 (in Processing).

### Evolution Gallery

More runs with different settings:

<div class="gallery" data-columns="3">
    <img loading="lazy" src="/images/projects/color_evolution/evo_0.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_1.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_2.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_3.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_4.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_9.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_6.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_7.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_8.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_10.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_11.webp">
    <img loading="lazy" src="/images/projects/color_evolution/evo_12.webp">
</div>
