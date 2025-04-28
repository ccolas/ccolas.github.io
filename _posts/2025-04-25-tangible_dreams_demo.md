---
title: 'Tangible Dreams: First Demo and Plan'
date: 2024-05-02 11:21:29
description: "Planning to build the Tangible Dreams interface, and a cool first demo!"
featured_image: '/images/posts/tangible_dreams/screen_demo.png'
---

### Building Tangible Dreams: From Idea to Hardware

After receiving the <a href="/post/tangible-dreams-camit" target="_blank" rel="noopener noreferrer">CAMIT grant</a>, I've spent the past few weeks refining how to bring *Tangible Dreams* to life. What started as an idea --- to let people physically manipulate neural networks --- is now moving toward reality.

In this post, I'll share how I'm thinking about building the system: the mathematical core that drives it, the real-time software prototype I developed, and the initial design for the physical hardware. It's a technical dive behind the scenes of turning abstract AI concepts into something visitors will be able to touch, connect, and shape in real-time.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cy-_3Mp53cI?si=2Mm0s5J-B1_CbNVW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### A Primer on CPPNs

At the heart of *Tangible Dreams* is a type of algorithm called a <a href="https://link.springer.com/content/pdf/10.1007/s10710-007-9028-8.pdf" target="_blank" rel="noopener noreferrer">Compositional Pattern-Producing Network (CPPN)</a>.
CPPNs are a special kind of neural network.  
Their goal is simple: **they take the coordinates of each pixel in an image and decide what color it should be**.

Here's how it works:
1. Each pixel's $$(x, y)$$ position is sent as input to the network.
2. The network processes these coordinates by combining simple mathematical functions.
3. The output is three numbers --- one each for Red, Green, and Blue --- that determine the pixel's color.

<figure class="small-image">
  <img src="/images/projects/cppnworld/cppn2.png" style="width: 100%;">
  <figcaption style="text-align: center; font-style: italic; margin-top: 8px;">For each pixel (x, y) of a 2D image, the CPPN computes a corresponding color. (From the <a href="http://eplex.cs.ucf.edu/papers/stanley_gpem07.pdf" target="_blank" rel="noopener noreferrer">original paper</a>)</figcaption>
</figure>

But what makes CPPNs so powerful is **how** they process the coordinates.

Instead of a simple formula, CPPNs **build a graph** composing simple mathematical operations.  
Each **node** in the graph:
- Takes a few numbers as input $$(x_1, x_2, x_3)$$
- Applies a weight to each input $$(w_1, w_2, w_3)$$
- Adds a bias $$b$$
- Passes the result through a simple function $$\sigma$$ like `sin`, `tanh`, or `step`

$$
\text{output} = \sigma \left( w_1 \cdot x_1 + w_2 \cdot x_2 + w_3 \cdot x_3 + b \right)
$$


<figure class="smaller-image">
  <img src="/images/projects/cppnworld/cppn.png" style="width: 100%;">
  <figcaption style="text-align: center; font-style: italic; margin-top: 8px;">Inside a CPPN: simple nodes combining into rich patterns (From <a href="https://towardsdatascience.com/understanding-compositional-pattern-producing-networks-810f6bef1b88" target="_blank" rel="noopener noreferrer">this post</a>)</figcaption>
</figure>

The network is made of three types of nodes:

- **Input nodes**: Provide basic information like $$x, y$$, or distance from the center.
- **Middle nodes**: Transform information arriving to their input $$(x_1, x_2, x_3)$$ into output information according to the equation above.
- **Output nodes**: Produce the final Red, Green, and Blue values for the image.

By creatively combining simple functions, CPPNs can generate stunning patterns that are structured yet organic. 


### Prototyping a Real-Time Demo

Before building the physical system, I needed to demonstrate that the idea could work --- that I could run a CPPN interactively, in real time, at a high resolution.

One challenge quickly became obvious: **processing every pixel individually is very slow**.  
For an HD image (1920×1080 pixels), the network has to process over **two million pixel coordinates** for every single frame!

To make this possible, I implemented the network using JAX, a Python library that lets you run massive computations on a GPU.  
With JAX I could parallelize the network evaluation across all pixels and achieve smooth, real-time rendering.

I also needed a way to **control the network parameters** during the demo.  
Since the physical nodes weren't built yet, I used a MIDI controller to simulate the system:

- **Sliders** controlled the weights of different connections.
- **Knobs** adjusted the biases and slopes.
- **Buttons** allowed me to randomly rewire the network or switch activation functions on the fly.

This setup gave me a prototype that was both **real-time** and **interactive** — letting me demonstrate the core experience that *Tangible Dreams* will deliver.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cy-_3Mp53cI?si=2Mm0s5J-B1_CbNVW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Designing the Physical System

The next step was designing how the physical system would work.

The main idea is simple:  
Each node — inputs, middles, outputs — becomes a **small electronics box**.  
Cables between boxes represent **connections**, and **turning knobs** adjusts how the information flows through the network.

Importantly:  
The actual neural network computation happens on a **computer**, not inside the boxes.  
The boxes act as **sensors** — they send information about their current state (connections, weights, biases, activation functions) to the computer.  
The computer then rebuilds the network in real-time, processes the pixels, and projects the image.



#### Node Types

There are three types of nodes:

- **Input nodes**: provide basic pixel information like \(x\), \(y\), or distance from center.
- **Middle nodes**: process and transform the information, combining signals in different ways.
- **Output nodes**: produce Red, Green, and Blue values for the final image.

#### Inside Each Node

Each box contains:

- **Potentiometers** (knobs) for adjusting: the weights of each incoming connection, a bias term, (for middle and output nodes) a slope or scale parameter
- **Rotary switch** for selecting the activation function
- **Jack inputs** to receive signals from other nodes
- **Jack outputs** to send its own signal (encoded as a voltage identifying the node)
- **Arduino Nano** microcontroller to read all the sensor values, detect which nodes are connected, package and send all the information
- **Communication protocol**: each node talks to the computer over a shared serial bus using RS-485 communication, nodes broadcast small update messages whenever a parameter or connection changes, the computer listens to all nodes, updates the network graph, and re-renders the projected image in real time.

This system keeps the physical part simple and robust:  
The complexity stays inside the computer, while the user experience remains direct and tactile — plug, turn, adjust, and immediately see the result.

...At least that's the plan!

<br>
<br>
If you're curious about behind-the-scenes updates as I build, follow me on Twitter at <a href="https://x.com/cedcolas/" target="_blank" rel="noopener noreferrer">@cedcolas</a>!

Follow <a href="https://x.com/ArtsatMIT" target="_blank" rel="noopener noreferrer">@ArtsatMIT</a> to hear more about other art projects at MIT!