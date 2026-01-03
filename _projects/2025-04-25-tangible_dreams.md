---
title: 'Tangible Dreams'
date: 2025-04-25 11:21:29
description: "Exploring Visual Worlds Through Physical Neural Networks"
featured_image: '/images/posts/tangible_dreams/exhibition/exhibition_004.jpg'
---

<img class="image" src="/images/posts/tangible_dreams/exhibition/exhibition_004.jpg" style="width:100%">

*Tangible Dreams* is an interactive art installation where visitors physically interact with a neural network—plugging cables, turning knobs, and flipping switches to generate colorful visuals in real time.

Funded by the <a href="https://arts.mit.edu/camit/funding/" target="_blank" rel="noopener noreferrer">Council for the Arts at MIT (CAMIT)</a>, it was exhibited in August 2025 at MIT's Stata Center. 

**See the patterns visitors created below!**

<p style="text-align:center; margin:1.5em 0;">
  <a href="/images/posts/tangible_dreams/tangible_dreams_flyer.pdf" target="_blank" rel="noopener noreferrer" class="btn">Flyer</a>
  <a href="/images/posts/tangible_dreams/poster_BAT.pdf" target="_blank" rel="noopener noreferrer" class="btn">Poster</a>
</p>

---

## The Idea

During my PhD I discovered a kind of interactive evolution experiment called <a href="https://nbenko1.github.io/#/" target="_blank" rel="noopener noreferrer">Picbreeder</a>. The idea is simple: you see a grid of images, pick the ones you prefer, and the computer breeds new variations from your favorites. Repeating this process over and over, you end up with images neither you nor the machine would have created alone. I liked it so much I made my own version: <a href="/project/cppnworld" target="_blank" rel="noopener noreferrer">CPPNWorld</a>.

But clicking on a screen felt distant. I wanted to *feel* the process—to shape the system with my hands. What if you could plug cables and turn knobs to sculpt these images in real-time?

---

## How It Works

The images come from a small network of mathematical functions called a <a href="https://link.springer.com/content/pdf/10.1007/s10710-007-9028-8.pdf" target="_blank" rel="noopener noreferrer">CPPN</a>. You feed it pixel coordinates, it returns a color. Chain a few simple functions together (sine, cosine, gaussian) and you get complex, organic patterns.

<figure class="image-pair-figure">
  <div class="image-pair-equal-height">
  <img src="/images/projects/cppnworld/cppn2.png">
  <img src="/images/projects/cppnworld/cppn.png">
  </div>
  <figcaption style="margin-top: 20px; text-align:center;">
    A CPPN maps each pixel's (x, y) coordinates through composed functions to produce a color.
  </figcaption>
</figure>

In *Tangible Dreams*, each piece of that network becomes something you can touch. Plug a cable between two boxes—you've added a connection. Turn a knob—you've changed the connection's strength. Flip a switch—you've swapped out the math function. The image on the wall morphs instantly.

<br>

<p style="text-align:center; font-style:italic; margin-bottom:8px;">A first prototype with a MIDI controller:</p>
<div style="text-align:center; margin:0 0 -8em 0;">
<iframe style="display:block; margin:0 auto;" width="560" height="315" src="https://www.youtube.com/embed/Cy-_3Mp53cI?si=2Mm0s5J-B1_CbNVW" title="Tangible Dreams demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
---

## The Hardware

Each node in the network is a physical box. Cables between boxes are connections; knobs control weights and biases; switches select activation functions. The boxes send their state to a computer, which renders the image in real time.

<figure style="width: 90%; margin:0 auto;">
  <img src="/images/posts/tangible_dreams/tangible_dreams_setup.png" style="width:100%">
  <figcaption style="text-align: center; font-style: italic; margin-top: 8px;">Players turn knobs and reconnect cables to shape the neural network and generate new patterns.</figcaption>
</figure>

---

## The Exhibition

With support from the <a href="https://arts.mit.edu/camit/funding/" target="_blank" rel="noopener noreferrer">Council for the Arts at MIT (CAMIT)</a>, *Tangible Dreams* was exhibited **August 25–29, 2025** in MIT's Stata Center (R&D Commons, 4th floor).

<div id="exhibition-gallery" style="text-align:center; margin:2em 0;">
  <div style="position:relative; display:inline-block;">
    <img id="exhibition-img" src="" alt=""
         style="max-width:90vw; max-height:70vh; border-radius:12px; box-shadow:0 0 20px #000;">
    <div id="exhibition-prev" style="position:absolute; left:-60px; top:50%; transform:translateY(-50%);
         font-size:48px; color:#333; cursor:pointer;">&#9664;</div>
    <div id="exhibition-next" style="position:absolute; right:-60px; top:50%; transform:translateY(-50%);
         font-size:48px; color:#333; cursor:pointer;">&#9654;</div>
  </div>
</div>

<script>
const EXHIBITION_FOLDER = "/images/posts/tangible_dreams/exhibition/";
const EXHIBITION_COUNT = 14;

const exhibitionImages = Array.from({length: EXHIBITION_COUNT}, (_, i) =>
  `${EXHIBITION_FOLDER}exhibition_${String(i+1).padStart(3,"0")}.jpg`
);

let exhibitionIdx = 0;
const exhibitionImgEl = document.getElementById("exhibition-img");
exhibitionImgEl.src = exhibitionImages[exhibitionIdx];

function showExhibition(i){
  exhibitionIdx = (i + exhibitionImages.length) % exhibitionImages.length;
  exhibitionImgEl.src = exhibitionImages[exhibitionIdx];
}

document.getElementById("exhibition-prev").onclick = ()=>showExhibition(exhibitionIdx-1);
document.getElementById("exhibition-next").onclick = ()=>showExhibition(exhibitionIdx+1);

document.addEventListener("keydown", e=>{
  if(e.key==="ArrowLeft") showExhibition(exhibitionIdx-1);
  if(e.key==="ArrowRight") showExhibition(exhibitionIdx+1);
});
</script>

---

## Patterns Created by Visitors

These are the patterns discovered and saved by visitors during the exhibition.

<div id="gallery"></div>

<div id="lightbox" style="
  display:none; position:fixed; inset:0; background:rgba(0,0,0,.9);
  align-items:center; justify-content:center; z-index:1000;">
  <img id="lightbox-img" src="" alt="" style="max-width:95vw; max-height:95vh; border-radius:12px; box-shadow:0 0 30px #000;">
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

<br>
<br>

Follow me on Twitter <a href="https://x.com/cedcolas/" target="_blank" rel="noopener noreferrer">@cedcolas</a> for updates!
