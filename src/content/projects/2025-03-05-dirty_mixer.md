---
title: 'Dirty Video Mixer'
subtitle: 'Analog video signal glitching'
date: 2025-03-05 00:00:00
description: Exploring analog video manipulation through a custom-built dirty mixer.
featured_image: '/images/projects/dirty_mixer/dirty_mixer.png'
---

### The Idea

I built a dirty video mixer, a simple device that intentionally corrupts video signals to create unpredictable visual glitches. One potentiometer, two switches, two inputs, one output. That's it (instructions <a href="https://www.youtube.com/watch?v=iSRWvQf3u2c" target="_blank" rel="noopener noreferrer">here</a>).

<img class="small-image" src="/images/projects/dirty_mixer/dirty_mixer_box.jpeg" alt="Dirty video mixer box">

It works by imperfectly combining two video signals. The glitches emerge precisely because it's *not* mixing them properly.

### First Test

I mixed a digital HDMI signal from my laptop with an analog Lion King VHS tape, displayed on an analog TV. The results: distorted colors, shifting images, horizontal stripes.

The mixer responds mostly to the analog VHS signal; the digital-to-analog conversion doesn't merge as cleanly. Two analog inputs would probably work better, but the digital/analog combination still produced cool results.

<video width="80%" controls preload="metadata" style="max-width:700px;">
  <source src="/images/projects/dirty_mixer/dirty_mixer.mp4" type="video/mp4">
</video>
<p class="caption">The dirty mixer in action</p>
