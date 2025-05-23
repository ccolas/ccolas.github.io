---
title: 'Evolutionary Color Search'
date: 2022-01-11 00:00:00
description: Exploring the intersection of evolutionary algorithms and visual patterns through color evolution.
featured_image: '/images/projects/color_evolution/evo_18.webp'
---

<center>
<a href="https://github.com/ccolas/color_evolution" class="btn">Code</a>
</center>

### Digital Evolution as a Teaching Tool

A while back I designed this small project for two 9th grade students during their week-long internship in my lab. The goal was to introduce evolutionary algorithms in an accessible, visual way.

I chose **colors** as our system --- something intuitive yet powerful for demonstrating computational evolution. Each individual in our population is represented by a color, with its genome being the RGB color code. Its fitness is calculated as the negative Euclidean distance between its RGB values and those of a target color. Generation after generation, the most fit individuals reproduce more frequently, gradually shifting the population toward the objective. Parents are selected from the highest performers and reproduce asexually, with random mutations applied to their color codes.

This project transforms abstract computational concepts into immediate visual feedback. The evolutionary process becomes both a learning tool and a generator of cool visual patterns.

### Visualizing the Evolutionary Process

In our visualization system, each patch represents an individual and its color, while each horizontal line represents a generation. Time moves upward, with the target color displayed in the top line.

<img src="/images/projects/color_evolution/evo_1.webp" class="responsive-image">

The example above shows a successful evolutionary run. The initial randomness of the population gradually gives way to convergence as selection pressure and reproduction drive the colors toward the target.

### Parameter Space and Visual Diversity

The interplay between parameter settings and visual outcomes becomes evident when we experiment with population size. Below, a smaller population reduces initial diversity and makes exploring the color space more difficult. The evolutionary process converges prematurely, missing the target color.

<img src="/images/projects/color_evolution/evo_pb1.webp" class="responsive-image">

To increase diversity we can increase mutation strength, allowing children to differ more significantly from their parents. This intervention reintroduces diversity and improves exploration. Notice the greater variation across individuals in the latest generations --- this increased diversity helps solve the convergence problem.

<img src="/images/projects/color_evolution/evo_pb2.webp" class="responsive-image">

With larger populations (around 100 individuals), the initial diversity allows for smaller mutation rates. This combination leads to finer convergence with less variation in the final generations, achieving nearly perfect alignment with the target color.

<img src="/images/projects/color_evolution/evo_big.webp" class="responsive-image">

### Evolution Gallery

Each of these evolutionary runs represents a different parameter configuration and starting condition. The resulting visual patterns reveal the underlying computational dynamics – how selection pressure, mutation rates, and population size interact to create different evolutionary trajectories.

<div class="gallery" data-columns="3">
    <img src="/images/projects/color_evolution/evo_0.webp">
    <img src="/images/projects/color_evolution/evo_1.webp">
    <img src="/images/projects/color_evolution/evo_2.webp">
    <img src="/images/projects/color_evolution/evo_3.webp">
    <img src="/images/projects/color_evolution/evo_4.webp">
    <img src="/images/projects/color_evolution/evo_9.webp">
    <img src="/images/projects/color_evolution/evo_6.webp">
    <img src="/images/projects/color_evolution/evo_7.webp">
    <img src="/images/projects/color_evolution/evo_8.webp">
    <img src="/images/projects/color_evolution/evo_10.webp">
    <img src="/images/projects/color_evolution/evo_11.webp">
    <img src="/images/projects/color_evolution/evo_12.webp">
</div>
