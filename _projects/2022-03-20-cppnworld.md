---
title: 'Worlds of Colors'
date: 2022-03-20 00:00:00
description: Open windows to alternative worlds made of colors.
featured_image: '/images/projects/cppnworld/id1.jpg'
---

![](/images/projects/cppnworld/id1.jpg)


In **Worlds of Colors** I create alternative worlds full of colors and open windows to let us get a peek at them. 

### Compositional Pattern Producing Networks

To create an alternative world, I use [Compositional Pattern Producing Networks](http://eplex.cs.ucf.edu/papers/stanley_gpem07.pdf) or CPPNs. CPPNs are mathematical functions 
mapping a set of spatially organized inputs to a set of outputs. Here, we map spatial coordinates all over the Earth to corresponding colors in the RGB space.

<img class="small-image" src="/images/projects/cppnworld/cppn2.png" alt=""/>
<p class="legend">
<i><b>Generating an image from a CPPN.</b> For each pixel (x, y) of the 2D image, the CPPN is applied to compute the corresponding color. (From the <a 
href="http://eplex.cs.ucf.edu/papers/stanley_gpem07.pdf">original paper</a>).</i></p>

In World of Colors, CPPNs take the GPS coordinates of your house (latitude, longitude, altitude) and relative coordinates of the location of the window to the other world. Each 
CPPN thus defines an **alternative world** by giving a color value to any point in space. Applying the CPPN to a specific set of coordinates opens a window to that world. It 
lets us peek at what's there, in this particular place.

### Evolving Alternative Worlds

What are these mathematical functions really? They are _computational graphs_, where each node aggregates its inputs (e.g. input coordinates, or the output of a previous node) 
and applies an _activation function_ to the output.

<img class="smaller-image" src="/images/projects/cppnworld/cppn.png" alt=""/>
<center>
<p class="legend">
<i><b>CPPN as computational graphs.</b> (From <a href="https://towardsdatascience.com/understanding-compositional-pattern-producing-networks-810f6bef1b88">this post</a>).
</i></p></center>

At first, we can sample a bunch of random graphs, each defining its specific world. Then, we can **breed worlds**. By iteratively selecting the prettiest worlds by hand and 
applying an evolutionary algorithm called [NEAT](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf), we can evolve prettier and prettier alternative worlds. 

### Opening Windows

For each world, I opened a bunch of windows located at my place and some of my friends' places. Just like in the real world, windows that are close together share similar 
patterns while windows further away from each other are more different. 

Here are eighteen **Worlds of Colors** seen through 9 windows.


<div class="gallery" data-columns="3">
	<img src="/images/projects/cppnworld/id2.jpg">
	<img src="/images/projects/cppnworld/id3.jpg">
	<img src="/images/projects/cppnworld/id4.jpg">
	<img src="/images/projects/cppnworld/id5.jpg">
	<img src="/images/projects/cppnworld/id6.jpg">
	<img src="/images/projects/cppnworld/id7.jpg">
	<img src="/images/projects/cppnworld/id8.jpg">
	<img src="/images/projects/cppnworld/id9.jpg">
	<img src="/images/projects/cppnworld/id10.jpg">
	<img src="/images/projects/cppnworld/id11.jpg">
	<img src="/images/projects/cppnworld/id12.jpg">
	<img src="/images/projects/cppnworld/id13.jpg">
	<img src="/images/projects/cppnworld/id14.jpg">
	<img src="/images/projects/cppnworld/id15.jpg">
	<img src="/images/projects/cppnworld/id16.jpg">
	<img src="/images/projects/cppnworld/id17.jpg">
	<img src="/images/projects/cppnworld/id18.jpg">
	<img src="/images/projects/cppnworld/id19.jpg">
</div>
