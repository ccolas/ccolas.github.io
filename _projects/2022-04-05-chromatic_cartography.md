---
title: "Chromatic Cartography"
subtitle: 'Mapping geography to color'
date: 2022-04-05 00:00:00
description: Exploring the relationship between geographic coordinates and color perception through a visual mapping system.
featured_image: '/images/projects/color_world/medley.webp'
---

![](/images/projects/color_world/medley_paysage.webp)

<center>
<a href="https://github.com/ccolas/ColorfulWorld" target="_blank" rel="noopener noreferrer" class="btn">Code</a>
</center>

### The Idea

What if every place on Earth had its own unique color? Not based on what it looks like, but on where it is — a color identity derived purely from geographic coordinates.

### The Right Color Space

The familiar RGB space was designed for screens, not for human eyes. Equal steps in RGB don't look equally different to us. The **HCL color space** (Hue-Chroma-Luminance) fixes this — it's designed so that equidistant colors *look* equidistant. Its three dimensions:

- **Hue** — position on the color wheel (red, yellow, green...)
- **Chroma** — saturation, how vivid the color is
- **Luminance** — perceived brightness

And crucially, HCL can be represented as a sphere — just like Earth.

### The Mapping

Both systems are spherical, so the mapping is natural:

- **Longitude** → **Hue** (east-west position determines the color)
- **Latitude** → **Luminance** (north is bright, south is dark)
- **Altitude** → **Chroma** (higher elevations are more saturated, depths are greyer)

Mount Everest gets a vivid color. The Mariana Trench, almost grey. Paris and Tokyo sit at similar latitudes but different longitudes — similar brightness, different hues.

### Color Atlas

Eleven locations around the world, each shown as its unique color:

<div class="gallery" data-columns="3">
    <img loading="lazy" src="/images/projects/color_world/aukland.webp">
    <img loading="lazy" src="/images/projects/color_world/boston.webp">
    <img loading="lazy" src="/images/projects/color_world/cuzsco.webp">
    <img loading="lazy" src="/images/projects/color_world/everest.webp">
    <img loading="lazy" src="/images/projects/color_world/johannesburg.webp">
    <img loading="lazy" src="/images/projects/color_world/kaboul.webp">
    <img loading="lazy" src="/images/projects/color_world/lagos.webp">
    <img loading="lazy" src="/images/projects/color_world/mariana_trench.webp">
    <img loading="lazy" src="/images/projects/color_world/pahoa.webp">
    <img loading="lazy" src="/images/projects/color_world/paris.webp">
    <img loading="lazy" src="/images/projects/color_world/tokyo.webp">
</div>
