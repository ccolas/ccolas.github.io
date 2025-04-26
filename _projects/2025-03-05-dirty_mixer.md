---
title: 'Dirty Video Mixer'
date: 2025-03-05 00:00:00
description: Exploring analog video manipulation through a custom-built dirty mixer.
featured_image: '/images/projects/dirty_mixer/dirty_mixer.png'
---




I recently built a dirty video mixer --- a simple but effective device that intentionally corrupts and glitches video signals to create unpredictable and cool visual effects. It's a very simple device: just one potentiometer, two switches, two inputs, and one output (see instructions <a href="https://www.youtube.com/watch?v=iSRWvQf3u2c" target="_blank" rel="noopener noreferrer">here</a>).

<img class="image" src="/images/projects/dirty_mixer/dirty_mixer_box.jpeg" class="small-image"/>

The dirty mixer works by imperfectly combining video signals, creating glitches precisely because it's not doing the job of mixing properly. To try it out, I mixed two sources: a digital HDMI signal from my laptop and an analog source from a Lion King VHS tape, with the output displayed on an analog TV. The results were interesting: distorted colors, images that shifted position, horizontal stripe glitches, and others (see video below).

It seems that it's primarily affected by the analog VHS signal, the digital to analog source does not merge very well with the analog signal here; it would likely work better with two analog inputs, but the digital/analog combination still produced cool results.

<br>

<center>
<video width="80%" controls style="max-width:700px; margin:0 auto; display:block;">
  <source src="/images/projects/dirty_mixer/dirty_mixer.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<p class="legend" style="text-align:center; margin-top:1em;">
<i>The dirty mixer in action, creating glitchy video effects</i></p>
</center>