---
title: 'Taste Music with Piano Ivre'
subtitle: 'Music-to-cocktail synesthetic machine'
date: 2022-05-23 00:00:00
description: A machine learning approach to taste-music synesthesia, inspired by Boris Vian's pianocktail.
featured_image: '/images/projects/pianocktail/piano_ivre_square.png'
---

<center>
<a href="https://cedriccolas.com/piano-ivre-synesthesia/" target="_blank" rel="noopener noreferrer" class="btn">Recordings & Recipes</a>
<a href="https://piano-ivre.cedriccolas.com" target="_blank" rel="noopener noreferrer" class="btn">Interactive Demo</a>
</center>

In **L'Écume des Jours**, Boris Vian — French author, jazz musician, singer, and engineer — imagined the **Pianocktail**: a device that turns piano music into cocktails capturing the emotional essence of the piece. A form of <a href="https://en.wikipedia.org/wiki/Synesthesia" target="_blank" rel="noopener noreferrer">synesthesia</a> between sound and taste.

<video width="100%" controls preload="metadata" style="max-width:700px;">
  <source src="/images/projects/pianocktail/piano_ivre_demo_1080.mp4" type="video/mp4">
</video>
<p class="caption">Demo of Piano Ivre</p>

### Beyond One-Note-One-Drop

Previous attempts at building a pianocktail used mechanical approaches mapping each key to an ingredient, adding a few drops for each keystroke. These <a href="https://www.youtube.com/watch?v=B9OYBkBXNi4" target="_blank" rel="noopener noreferrer">physical prototypes</a> look wonderful, but they produce "graveyard cocktails": chaotic mixtures of too many ingredients.

<img class="small-image" src="/images/projects/pianocktail/prototype_demo.png" alt="Physical Pianocktail prototype demonstration">
<p class="caption">Older prototype with cocktail machine but less meaningful mapping</p>

I wanted something better: a system that generates harmonious, balanced cocktails reflecting the overall character of a piece, not its note-by-note composition. The result is **Piano Ivre**, a digital pianocktail that uses machine learning to turn any piano performance into a unique recipe. It imagines original and tasty cocktails and maps similar piano pieces to similar drinks.

### Under the Hood

The system has three components: a music encoder, a taste representation, and a bridge between them.

**Understanding music.** I trained a transformer on 30,000 MIDI files of piano compositions using self-supervised techniques: a music tokenizer, BERT-style masked prediction, and SentenceBERT fine-tuning. The result is a model that embeds musical pieces into a representation space where structure, style, and emotion are captured. Pieces from the same composer naturally cluster together:

<img class="small-image" src="/images/projects/pianocktail/tsne_b128_r768_represented.png" alt="T-SNE visualization of music embeddings">
<p class="caption">T-SNE projection of the music space. Nearest neighbors of a piece are often by the same composer.</p>

**Representing taste.** I collected ~600 quality cocktail recipes using a set of 35 ingredients. Each cocktail is described in a 13-dimensional taste space: alcohol content, sourness, sweetness, bitterness, herbiness, fruitiness, complexity, etc. These representations account for preparation methods, dilution, and ingredient interactions.

**Bridging the two.** A bi-modal variational autoencoder learns a shared space where music and taste interact. To guide the mapping, I defined semantic labels that apply to both domains, e.g. "Cuban" for Latin jazz and rum-mint cocktails, "Romantic" for Chopin nocturnes and complex bittersweet drinks. These anchors align the two spaces in a way that feels natural, and the model generalizes smoothly to any piece and any cocktail.

### Evolving Recipes

Once a piece is mapped to a target taste profile, a genetic algorithm generates an actual recipe. Starting from random combinations of 2–8 ingredients, it evolves recipes over 100 generations — adding, removing, or adjusting ingredients, combining successful parents — until the cocktail matches the target profile.

The output is a complete recipe with ingredients, quantities, glass type, and preparation method.

### Take a sip of music

Feed it an audio file, a MIDI file, or record piano from your microphone or your browser tab and discover what your favorite pieces taste like. <a href="https://piano-ivre.cedriccolas.com" target="_blank" rel="noopener noreferrer">Interactive Demo</a>.

