---
title: 'Tangible Dreams'
date: 2025-04-25 11:21:29
description: "Exploring Visual Worlds Through Physical Neural Networks"
featured_image: '/images/posts/tangible_dreams/exhibition/exhibition_004.jpg'
---

<img class="image" src="/images/posts/tangible_dreams/exhibition/exhibition_004.jpg" style="width:100%" alt="Tangible Dreams interactive art installation at MIT Stata Center">

*Tangible Dreams* is an interactive art installation where visitors physically interact with a neural network—plugging cables, turning knobs, and flipping switches to generate colorful visuals in real time.

Funded by the <a href="https://arts.mit.edu/camit/funding/" target="_blank" rel="noopener noreferrer">Council for the Arts at MIT (CAMIT)</a>, it was exhibited in August 2025 at MIT's Stata Center. 

**See the patterns visitors created below!**

<p style="text-align:center; margin:1.5em 0;">
  <a href="/images/posts/tangible_dreams/tangible_dreams_flyer.pdf" target="_blank" rel="noopener noreferrer" class="btn">Flyer</a>
  <a href="/images/posts/tangible_dreams/poster_BAT.pdf" target="_blank" rel="noopener noreferrer" class="btn">Poster</a>
</p>



## The Idea

During my PhD I discovered a kind of interactive evolution experiment called <a href="https://nbenko1.github.io/#/" target="_blank" rel="noopener noreferrer">Picbreeder</a>. The idea is simple: you see a grid of images, pick the ones you prefer, and the computer breeds new variations from your favorites. Repeating this process over and over, you end up with images neither you nor the machine would have created alone. I liked it so much I made my own version: <a href="/project/cppnworld" target="_blank" rel="noopener noreferrer">CPPNWorld</a>.

But clicking on a screen felt distant. I wanted to *feel* the process—to shape the system with my hands. What if you could plug cables and turn knobs to sculpt these images in real-time?



## How It Works

The images come from a small network of mathematical functions called a <a href="https://link.springer.com/content/pdf/10.1007/s10710-007-9028-8.pdf" target="_blank" rel="noopener noreferrer">CPPN</a>. You feed it pixel coordinates, it returns a color. Chain a few simple functions together (sine, cosine, gaussian) and you get complex, organic patterns.

<figure class="image-pair-figure">
  <div class="image-pair-equal-height">
  <img src="/images/projects/cppnworld/cppn2.png" alt="Generating an image from a CPPN">
  <img src="/images/projects/cppnworld/cppn.png" alt="CPPN computational graph diagram">
  </div>
<br>
  <p class="caption">A CPPN maps each pixel's (x, y) coordinates through composed functions to produce a color.</p>
</figure>

In *Tangible Dreams*, each piece of that network becomes something you can touch. Plug a cable between two boxes—you've added a connection. Turn a knob—you've changed the connection's strength. Flip a switch—you've swapped out the math function. The image on the wall morphs instantly.

<iframe style="display:block; margin:2em auto 10px;" width="560" height="315" src="https://www.youtube.com/embed/Cy-_3Mp53cI?si=2Mm0s5J-B1_CbNVW" title="Tangible Dreams demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p class="caption">A first prototype with a MIDI controller</p>


## The Hardware

Each node in the network is a physical box. Cables between boxes are connections; knobs control weights and biases; switches select activation functions. The boxes send their state to a computer, which renders the image in real time.

<img class="image" src="/images/posts/tangible_dreams/tangible_dreams_setup.png" alt="Tangible Dreams hardware setup diagram">
<p class="caption">Players turn knobs and reconnect cables to shape the neural network and generate new patterns.</p>



## The Exhibition

With support from the <a href="https://arts.mit.edu/camit/funding/" target="_blank" rel="noopener noreferrer">Council for the Arts at MIT (CAMIT)</a>, *Tangible Dreams* was exhibited **August 25–29, 2025** in MIT's Stata Center (R&D Commons, 4th floor).

<div id="exhibition-gallery" style="
  display:flex; overflow-x:auto; scroll-snap-type:x mandatory;
  gap:12px; padding:10px 0; margin:2em 0;
  -webkit-overflow-scrolling:touch;
"></div>

<script>
(function(){
  const FOLDER = "/images/posts/tangible_dreams/exhibition/";
  const COUNT = 14;
  const container = document.getElementById("exhibition-gallery");

  for(let i = 1; i <= COUNT; i++){
    const img = document.createElement("img");
    img.src = `${FOLDER}exhibition_${String(i).padStart(3,"0")}.jpg`;
    img.alt = "Tangible Dreams exhibition photo " + i;
    img.loading = "lazy";
    Object.assign(img.style, {
      flex: "0 0 auto",
      height: "55vh",
      maxHeight: "500px",
      borderRadius: "10px",
      scrollSnapAlign: "center",
      cursor: "pointer"
    });
    container.appendChild(img);
  }
})();
</script>



## Patterns Created by Visitors

These are the patterns discovered and saved by visitors during the exhibition.

<div id="gallery"></div>

<div id="lightbox" style="
  display:none; position:fixed; inset:0; background:rgba(0,0,0,.9);
  align-items:center; justify-content:center; z-index:1000;">
  <img id="lightbox-img" src="" alt="Visitor-created pattern from Tangible Dreams" style="max-width:95vw; max-height:95vh; border-radius:12px; box-shadow:0 0 30px #000;">
  <div id="lightbox-close" style="position:absolute; top:10px; right:20px; font-size:32px; color:#fff; cursor:pointer;">&#10005;</div>
  <div id="lightbox-prev" style="position:absolute; left:20px; top:50%; transform:translateY(-50%); font-size:48px; color:#fff; cursor:pointer;">&#9664;</div>
  <div id="lightbox-next" style="position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:48px; color:#fff; cursor:pointer;">&#9654;</div>
</div>

<script>
const OWNER   = "ccolas";
const REPO    = "tangible_dreams";
const FOLDER  = "outputs/mit_stata";
const BRANCH  = "main";

const EXT = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
function isImage(name){ return EXT.some(ext => name.toLowerCase().endsWith(ext)); }
function cdnUrl(path){ return `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@${BRANCH}/${path}`; }

let images = [], currentIndex = -1;

(async function(){
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}?ref=${BRANCH}`);
  const data = await r.json();
  images = data
    .filter(x => x.type==="file" && isImage(x.name))
    .sort((a, b) => b.name.localeCompare(a.name))
    .map(x => cdnUrl(x.path));

  const html = images.map((url,i)=>
    `<img src="${url}" data-idx="${i}"
          style="width:260px;margin:6px;border-radius:8px;cursor:pointer"
          loading="lazy">`
  ).join("");
  document.getElementById("gallery").innerHTML =
    `<div style="display:flex; flex-wrap:wrap; gap:5px; max-width:1000px; margin:0 auto; justify-content:center;">
      ${html}
    </div>`;

  document.querySelectorAll("#gallery img").forEach(img=>{
    img.addEventListener("click", ()=>openLightbox(+img.dataset.idx));
  });
})();

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");

function openLightbox(i){
  currentIndex = i;
  lbImg.src = images[i];
  lb.style.display="flex";
}
function closeLightbox(){ lb.style.display="none"; lbImg.src=""; }
function prev(){ if(currentIndex>0) openLightbox(currentIndex-1); }
function next(){ if(currentIndex<images.length-1) openLightbox(currentIndex+1); }

document.getElementById("lightbox-close").onclick = closeLightbox;
document.getElementById("lightbox-prev").onclick = prev;
document.getElementById("lightbox-next").onclick = next;

document.addEventListener("keydown", e=>{
  if(lb.style.display==="none") return;
  if(e.key==="Escape") closeLightbox();
  if(e.key==="ArrowLeft") prev();
  if(e.key==="ArrowRight") next();
});
</script>

Follow me on Twitter <a href="https://x.com/cedcolas/" target="_blank" rel="noopener noreferrer">@cedcolas</a> for updates!
