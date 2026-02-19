---
title: 'Tangible Dreams'
subtitle: 'Interactive neural network installation'
date: 2025-04-25 11:21:29
description: "Exploring Visual Worlds Through Physical Neural Networks"
featured_image: '/images/posts/tangible_dreams/exhibition/exhibition_004.jpg'
---

<img class="responsive-image" src="/images/posts/tangible_dreams/exhibition/exhibition_004.jpg" alt="Tangible Dreams interactive art installation at MIT Stata Center">

*Tangible Dreams* is an interactive art installation where visitors physically interact with a neural network — plugging cables, turning knobs, and flipping switches to generate colorful visuals in real time.

Funded by the <a href="https://arts.mit.edu/camit/funding/" target="_blank" rel="noopener noreferrer">Council for the Arts at MIT (CAMIT)</a>, it was exhibited in August 2025 at MIT's Stata Center.

**See the patterns visitors created below!**

<p style="text-align:center; margin:1.5em 0;">
  <a href="/images/posts/tangible_dreams/tangible_dreams_flyer.pdf" target="_blank" rel="noopener noreferrer" class="btn">Flyer</a>
  <a href="/images/posts/tangible_dreams/poster_BAT.pdf" target="_blank" rel="noopener noreferrer" class="btn">Poster</a>
</p>

### The Idea

I first explored interactive evolution in <a href="/project/cppnworld">CPPNWorld</a>, breeding visual worlds on a screen. But clicking felt distant. I wanted to *feel* the process and shape the system with my hands.

### How It Works

The visuals come from a <a href="https://link.springer.com/content/pdf/10.1007/s10710-007-9028-8.pdf" target="_blank" rel="noopener noreferrer">CPPN</a>: a small network that maps pixel coordinates to colors by composing simple functions (sine, cosine, gaussian).

<figure class="image-pair-figure">
  <div class="image-pair-equal-height">
  <img src="/images/projects/cppnworld/cppn2.png" alt="Generating an image from a CPPN">
  <img src="/images/projects/cppnworld/cppn.png" alt="CPPN computational graph diagram">
  </div>
<br>
  <p class="caption">A CPPN maps each pixel's (x, y) coordinates through composed functions to produce a color.</p>
</figure>

In *Tangible Dreams*, each piece of that network becomes something you can touch. Plug a cable between two boxes and you've added a connection. Turn a knob and you've changed the connection's strength. Flip a switch and you've swapped out the function. The image on the wall transforms instantly.

<iframe style="display:block; margin:2em auto 10px;" width="560" height="315" src="https://www.youtube.com/embed/Cy-_3Mp53cI?si=2Mm0s5J-B1_CbNVW" title="Tangible Dreams demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p class="caption">A first prototype with a MIDI controller</p>

### The Hardware

Each node in the network is a physical box. Cables between boxes are connections; knobs control weights and biases; switches select activation functions. The boxes send their state to a computer, which renders the image in real time.

<img class="image" src="/images/posts/tangible_dreams/tangible_dreams_setup.png" alt="Tangible Dreams hardware setup diagram">
<p class="caption">Players turn knobs and reconnect cables to shape the neural network and generate new patterns.</p>

### The Exhibition

With support from the <a href="https://arts.mit.edu/camit/funding/" target="_blank" rel="noopener noreferrer">Council for the Arts at MIT (CAMIT)</a>, *Tangible Dreams* was exhibited **August 25–29, 2025** in MIT's Stata Center (R&D Commons, 4th floor).

<div id="exhibition-gallery" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin:2em auto; max-width:1000px;"></div>

<script>
(function(){
  var FOLDER = "/images/posts/tangible_dreams/exhibition/";
  var COUNT = 14;
  var container = document.getElementById("exhibition-gallery");
  var urls = [];

  for(var i = 1; i <= COUNT; i++){
    var src = FOLDER + "exhibition_" + String(i).padStart(3,"0") + ".jpg";
    urls.push(src);
    var img = document.createElement("img");
    img.src = src;
    img.alt = "Tangible Dreams exhibition photo " + i;
    img.loading = "lazy";
    img.dataset.idx = i - 1;
    img.style.cssText = "width:240px; border-radius:8px; cursor:pointer;";
    img.addEventListener("click", function(){ window.openLightbox(urls, +this.dataset.idx); });
    container.appendChild(img);
  }
})();
</script>

### Patterns Created by Visitors

These are the patterns discovered and saved by visitors during the exhibition. Find others <a href="https://github.com/ccolas/tangible_dreams/tree/main/outputs" target="_blank" rel="noopener noreferrer">here</a>.

<br> 
ok ama
<div id="visitor-gallery"></div>

<script>
(function(){
  var OWNER   = "ccolas";
  var REPO    = "tangible_dreams";
  var FOLDER  = "outputs/mit_stata";
  var BRANCH  = "main";

  var EXT = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
  function isImage(name){ return EXT.some(function(ext){ return name.toLowerCase().endsWith(ext); }); }
  function cdnUrl(path){ return "https://cdn.jsdelivr.net/gh/" + OWNER + "/" + REPO + "@" + BRANCH + "/" + path; }

  fetch("https://api.github.com/repos/" + OWNER + "/" + REPO + "/contents/" + FOLDER + "?ref=" + BRANCH)
    .then(function(r){ return r.json(); })
    .then(function(data){
      var images = data
        .filter(function(x){ return x.type==="file" && isImage(x.name); })
        .sort(function(a, b){ return b.name.localeCompare(a.name); })
        .map(function(x){ return cdnUrl(x.path); });

      var html = images.map(function(url, i){
        return '<img src="' + url + '" data-idx="' + i + '" style="width:260px;margin:6px;border-radius:8px;cursor:pointer" loading="lazy">';
      }).join("");

      document.getElementById("visitor-gallery").innerHTML =
        '<div style="display:flex; flex-wrap:wrap; gap:5px; max-width:1000px; margin:0 auto; justify-content:center;">' + html + '</div>';

      document.querySelectorAll("#visitor-gallery img").forEach(function(img){
        img.addEventListener("click", function(){ window.openLightbox(images, +this.dataset.idx); });
      });
    });
})();
</script>
