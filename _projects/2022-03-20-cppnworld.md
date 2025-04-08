---
title: 'Breeding Visual Universes'
date: 2022-03-20 00:00:00
description: Creating and evolving algorithmic universes of color through computational evolution.
featured_image: '/images/projects/cppnworld/id1.webp'
---

![](/images/projects/cppnworld/id1.webp)

### Creating Algorithmic Universes

In this project, I explore the intersection of evolutionary algorithms and generative art by breeding alternative universes made entirely of colors. Each universe exists as a mathematical function, waiting to be visualized through windows that open at specific coordinates in our world.

These visual universes aren't just random --- they're evolved through a process mimicking natural selection, where aesthetic qualities determine which universes reproduce and which features are passed on to the next generation.

### The Architecture of Alternative Worlds

Each universe is encoded by a specific **Compositional Pattern Producing Networks** (CPPNs): a mathematical functions mapping spatial coordinates to colors. In my implementation, CPPNs transform GPS coordinates (latitude, longitude, altitude) along with local positional data (x, y, z) into RGB color values.

<img class="small-image" src="/images/projects/cppnworld/cppn2.webp" alt=""/>
<p class="legend">
<i><b>Generating an image from a CPPN.</b> For each pixel (x, y) of a 2D image, the CPPN computes a corresponding color. (From the <a href="http://eplex.cs.ucf.edu/papers/stanley_gpem07.pdf" target="_blank" rel="noopener noreferrer">original paper</a>).</i></p>

What makes CPPNs particularly powerful is that they don't just map pixels independently --- they create coherent patterns respecting spatial relationships. Each universe defined by a CPPN contains an infinite space of colors with internally consistent patterns and structures. When we apply the CPPN to a specific set of coordinates, we're essentially opening a window to that mathematical universe, revealing what exists at that particular point in the computed space.

Under the hood, CPPNs are computational graphs where each node processes its inputs (either coordinates or outputs from previous nodes) through an activation function:

<img class="smaller-image" src="/images/projects/cppnworld/cppn.webp" alt=""/>
<center>
<p class="legend">
<i><b>CPPN as computational graphs.</b> (From <a href="https://towardsdatascience.com/understanding-compositional-pattern-producing-networks-810f6bef1b88" target="_blank" rel="noopener noreferrer">this post</a>).
</i></p></center>


These functions can include waves, symmetrical patterns, or threshold operations --- each contributing different visual elements to the final output. The combination of these functions creates the intricate patterns seen in the generated worlds.

### Computational Evolution of Aesthetics

The development of these visual universes follows an evolutionary trajectory. I begin by generating a population of random computational graphs, each defining its own universe with unique properties and aesthetics. Then comes the fascinating part: **breeding universes**.

Using the **NeuroEvolution of Augmenting Topologies** (NEAT) algorithm, I implemented a selective breeding process where:

1. An initial population of random CPPNs is generated
2. Each CPPN is visualized as a color pattern at selected coordinates
3. I manually select the most visually appealing patterns (acting as the selection pressure)
4. The selected networks reproduce, combining their computational structures
5. Occasional mutations introduce new nodes or connections
6. The process repeats with each generation progressively developing more complex and aesthetically interesting patterns


### Geospatial Windows Between Worlds

A key aspect of this project is the relationship between real-world locations and the generated visuals. Each color universe exists as a complete mathematical entity, but we can only peek into it through "windows" placed at specific coordinates.

When opening windows at nearby locations, we observe similar patterns --- just as nearby windows in a physical building would reveal similar views. Windows opened in more distant locations show more different patterns, reflecting their separation in the input space of the generating function.

For this project, I opened windows located at my own residence and at the homes of friends, creating a network of openings into these alternative realities. The resulting collection of images forms a kind of visual geography --- a mapping between our physical world and these computational color spaces.

### Gallery of Evolved Visual Universes

Below are eighteen evolved universes, each shown through nine different windows. The diversity of patterns demonstrates how the evolutionary process generates a wide range of visual aesthetics --- from organic, flowing forms to geometric, structured patterns.

<div class="gallery" data-columns="3">
    <img src="/images/projects/cppnworld/id2.webp">
    <img src="/images/projects/cppnworld/id3.webp">
    <img src="/images/projects/cppnworld/id4.webp">
    <img src="/images/projects/cppnworld/id5.webp">
    <img src="/images/projects/cppnworld/id6.webp">
    <img src="/images/projects/cppnworld/id7.webp">
    <img src="/images/projects/cppnworld/id8.webp">
    <img src="/images/projects/cppnworld/id9.webp">
    <img src="/images/projects/cppnworld/id10.webp">
    <img src="/images/projects/cppnworld/id11.webp">
    <img src="/images/projects/cppnworld/id12.webp">
    <img src="/images/projects/cppnworld/id13.webp">
    <img src="/images/projects/cppnworld/id14.webp">
    <img src="/images/projects/cppnworld/id15.webp">
    <img src="/images/projects/cppnworld/id16.webp">
    <img src="/images/projects/cppnworld/id17.webp">
    <img src="/images/projects/cppnworld/id18.webp">
    <img src="/images/projects/cppnworld/id19.webp">
</div>

