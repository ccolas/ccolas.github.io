---
title: "Chromatic Cartography"
date: 2022-04-05 00:00:00
description: Exploring the relationship between geographic coordinates and color perception through a visual mapping system.
featured_image: '/images/projects/color_world/medley.webp'
---

![](/images/projects/color_world/medley_paysage.webp)

<center>
<a href="https://github.com/ccolas/ColorfulWorld" class="btn">Code</a>
</center>

### Geography Through the Lens of Color

What if every place on Earth had its own unique color signature? This project explores the conceptual and visual intersection between geographic space and color theory, creating a chromatic atlas where locations are translated into their corresponding colors.

Just as every place has its distinct character --- shaped by climate, culture, terrain, and countless other factors --- this system assigns each location a unique color identity based on its position in the world.

### The Science of Color Perception
There is multiple color representation systems, each with different properties and purposes. The familiar RGB (Red-Green-Blue) color space was designed for digital displays: [0,0,0] represents black, [1,1,1] is white, and [1,0,0] is pure red. Printers use the CMYK (Cyan-Magenta-Yellow-Black) system, mixing inks to produce colors on physical media.

However, neither of these systems accurately reflects how humans actually perceive color. Our visual system doesn't experience color differences in a linear fashion --- equal numerical changes in RGB values don't necessarily result in equally perceptible color changes.

This is where the **HCL color space** (Hue-Chroma-Luminance) becomes valuable. Specifically designed to better align with human perception, HCL creates a perceptually uniform space where:

- **Hue** represents the color's position on the color wheel (red, yellow, green, etc.)
- **Chroma** indicates color saturation or intensity
- **Luminance** refers to the perceived brightness

In HCL, equidistant colors appear similarly different to the human eye, making it particularly useful for creating intuitive color gradients and mappings.

### From Spherical Coordinates to Colors

Both our planet and the HCL color space can be represented using spherical coordinate systems, which creates a natural mapping between location and color:

- **Longitude** (east-west position) maps to **Hue** (color wheel position)
- **Latitude** (north-south position) maps to **Luminance** (brightness)
- **Altitude** (height above sea level) maps to **Chroma** (color intensity)

Through this mapping, places on Earth transform into specific colors in the HCL space. Places near the poles appear either bright (north) or dark (south). Higher elevations produce more saturated colors, while places below sea level appear greyer.

This system creates a visual language where geography becomes instantly expressible as color. The resulting "chromatic cartography" offers a new way to experience and visualize our world.

### A Color Atlas of Global Locations

Below are the colors of eleven locations around the world. Each image represents the unique color derived from that place's geographical coordinates:

<div class="gallery" data-columns="3">
    <img src="/images/projects/color_world/aukland.webp">
    <img src="/images/projects/color_world/boston.webp">
    <img src="/images/projects/color_world/cuzsco.webp">
    <img src="/images/projects/color_world/everest.webp">
    <img src="/images/projects/color_world/johannesburg.webp">
    <img src="/images/projects/color_world/kaboul.webp">
    <img src="/images/projects/color_world/lagos.webp">
    <img src="/images/projects/color_world/mariana_trench.webp">
    <img src="/images/projects/color_world/pahoa.webp">
    <img src="/images/projects/color_world/paris.webp">
    <img src="/images/projects/color_world/tokyo.webp">
</div>


