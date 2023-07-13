---
title: 'Evolving Colors'
date: 2022-01-11 00:00:00
description: Running an evolutionary process to find the right color. 
featured_image: '/images/projects/color_evolution/evo_18.png'
---

[comment]: <> (<center>)

[comment]: <> (<a href="https://github.com/ccolas/charabia" class="btn">Code</a>)

[comment]: <> (</center>)

A while back I designed this little project with two 9th grade students visiting my lab for a week-long internship. The idea was to introduce evolutionary algorithms to them.

I picked a simple system they could understand well, **colors**. The objective would be to evolve colors through generations towards a target color. Each individual is a color, 
whose genome is the color code in the RGB space. It's reproductive success is computed as the negative Euclidean distance between its genome and the target genome. Generations 
after generations, the best individuals reproduce more and shift the population towards its objective. Parents are selected amongst the best individuals, and reproduce 
asexually by adding a random noise to their color code / genome.

It's cool because it's easy to visualize what's happening, and it's even pretty!

### Visualization

Here, a patch represents an individual and it's color; a line represents a generation, and time goes up. The target is shown in the top line. 

![](/images/projects/color_evolution/evo_1.png)

This one is working pretty well, but let's look at what happens with smaller population size (below). Here, the initial diversity is reduced and the reduced number of 
individual in the whole evolution process makes the exploration of the color space more difficult. In the end, the evolutionary process converges too fast and misses the target 
color. 

![](/images/projects/color_evolution/evo_pb1.png)

To reintroduce some diversity and improve the exploration, we can crank up the mutation strength such that children look less alike their parents. You can spot the difference 
in the diversity across individuals in the latest generations, they are less uniform than before. However, this increased diversity seems to solve the problem. 

![](/images/projects/color_evolution/evo_pb2.png)

If you use much bigger population sizes, let's say 100, the diversity is so high that you can get away with using much smaller mutation strength. This leads to finer 
convergences and lesser diversity inside the final generations. We can achieve almost perfect convergence.

![](/images/projects/color_evolution/evo_big.png)

I'll upload the code soon but feel free to ask for it in the meantime.

Here is a bunch of evolutionary processes: 

<div class="gallery" data-columns="3">
	<img src="/images/projects/color_evolution/evo_0.png">
    <img src="/images/projects/color_evolution/evo_1.png">
	<img src="/images/projects/color_evolution/evo_2.png">
	<img src="/images/projects/color_evolution/evo_3.png">
	<img src="/images/projects/color_evolution/evo_4.png">
	<img src="/images/projects/color_evolution/evo_9.png">
	<img src="/images/projects/color_evolution/evo_6.png">
	<img src="/images/projects/color_evolution/evo_7.png">
	<img src="/images/projects/color_evolution/evo_8.png">
	<img src="/images/projects/color_evolution/evo_10.png">
	<img src="/images/projects/color_evolution/evo_11.png">
	<img src="/images/projects/color_evolution/evo_12.png">
</div>
