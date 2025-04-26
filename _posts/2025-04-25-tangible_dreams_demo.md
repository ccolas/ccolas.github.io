---
title: 'Tangible Dreams: First Demo and Plan'
date: 2025-05-02 11:21:29
description: "Planning to build the Tangible Dreams interface, and a cool first demo!"
featured_image: '/images/posts/tangible_dreams/screen_demo.png'
---

## Building Tangible Dreams: From Idea to Hardware

After receiving the <a href="/post/tangible-dreams-camit" target="_blank" rel="noopener noreferrer">CAMIT grant</a>, I've spent the past few weeks refining how to bring *Tangible Dreams* to life. What started as an idea --- to let people physically manipulate neural networks --- is now moving toward reality.

In this post, I'll share how I'm thinking about building the system: the mathematical core that drives it, the real-time software prototype I developed, and the initial design for the physical hardware. It's a technical dive behind the scenes of turning abstract AI concepts into something visitors will be able to touch, connect, and shape in real-time.

## A Primer on CPPNs

At the heart of *Tangible Dreams* is a type of algorithm called a Compositional Pattern-Producing Network (CPPN).  
CPPNs are a kind of neural network, but instead of learning their parameters from data, they are manually structured to produce complex, structured patterns by composing simple mathematical functions.

<img class="small-image" src="/images/projects/cppnworld/cppn2.png" alt=""/>
<p class="legend">
<i><b>Generating an image from a CPPN.</b> For each pixel (x, y) of a 2D image, the CPPN computes a corresponding color. (From the <a href="http://eplex.cs.ucf.edu/papers/stanley_gpem07.pdf" target="_blank" rel="noopener noreferrer">original paper</a>).</i></p>


A CPPN is a directed graph where each **node** computes a simple local transformation.  
Each node:

- Takes several inputs
- Applies a weight to each input
- Adds a bias
- Passes the result through an activation function (like `sin`, `tanh`, or `sigmoid`)

The computation at each node looks like this:

```latex
\text{output} = \sigma \left( w_1 \cdot x_1 + w_2 \cdot x_2 + w_3 \cdot x_3 + b \right)
```

Where:
- \( w_1, w_2, w_3 \) are the weights
- \( x_1, x_2, x_3 \) are the input values
- \( b \) is the bias
- \( \sigma \) is the activation function

The CPPN has three kinds of nodes:

- **Input nodes**: Provide fixed inputs such as \(x\)-coordinate, \(y\)-coordinate, or distance to the center of the image.
- **Middle nodes**: Flexible processing nodes where users can adjust weights, biases, and activation functions.
- **Output nodes**: Produce final values for each pixel, typically corresponding to Red, Green, and Blue color channels.

By composing different simple transformations across the network, CPPNs can generate intricate and often organic-looking patterns — structured yet endlessly varied.



<br>
<br>
Follow me on Twitter <a href="https://x.com/cedcolas/" target="_blank" rel="noopener noreferrer">@cedcolas</a> for updates!

Follow <a href="https://x.com/ArtsatMIT" target="_blank" rel="noopener noreferrer">@ArtsatMIT</a> to hear more about other art projects at MIT!