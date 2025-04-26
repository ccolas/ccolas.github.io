---
title: 'Taste Music with the Pianocktail'
date: 2022-05-23 00:00:00
description: A machine learning approach to taste-music synesthesia, inspired by Boris Vian's fictional invention.
featured_image: '/images/projects/pianocktail/pianocktail.jpg'
---

<img class="image" src="/images/projects/pianocktail/pianocktail.jpg"  class="responsive-image">>
<p class="legend" style="text-align:center; margin-top:1em;">
<i>Pianocktail from Cie La Rumeur.</i></p>

<br>
<center>
<a href="https://huggingface.co/spaces/ccolas/TastyPiano" target="_blank" rel="noopener noreferrer" class="btn">Demo</a>
</center>

<style>
.page li {
    margin-bottom: 0.3em;
    text-indent: -1em; 
    padding-left: 1em;
    font-size:12pt;
}
</style>

In **L'Écume des Jours**, the French author, jazz musician, singer, and engineer Boris Vian imagined the **Pianocktail**: a magical device that transforms piano music into cocktails capturing the emotional essence of the performed piece. This machines allows to experience a form of **synesthesia** --- the neurological phenomenon where stimulation of one sensory pathway leads to automatic, involuntary experiences in another one.

What if we could actually create such a bridge between auditory and gustatory experiences? What if the melancholy of Chopin could be tasted, or the playfulness of Gershwin could be sipped?

### Beyond One-Note-One-Drop

Previous attempts to realize Vian's invention have typically used mechanical approaches --- mapping individual piano keys to specific ingredients; a few drops with each keystroke. While these <a href="https://www.youtube.com/watch?v=B9OYBkBXNi4" target="_blank" rel="noopener noreferrer">physical implementations</a> are impressive engineering feats, they typically produce "graveyard cocktails" --- chaotic mixtures containing traces of every ingredient corresponding to the notes used in the piece.

<img class="image" src="/images/projects/pianocktail/prototype_demo.png" alt="Physical Pianocktail prototype demonstration" class="small-image"> 
<p class="legend" style="text-align:center; margin-top:1em;">
<i>Pianocktail prototype demonstrated at my birthday party, where friends could experience the music-to-taste transformation firsthand.</i></p>
  
I wanted to create something more sophisticated --- a system that could generate harmonious, balanced cocktails reflecting the overall character of a musical piece rather than its note-by-note composition. The result is  <a href="https://huggingface.co/spaces/ccolas/TastyPiano" target="_blank" rel="noopener noreferrer">Tasty Piano</a>, a digital pianocktail using machine learning to transform any piano composition into a unique, tailored cocktail recipe.

### Desiderata for a Valid Synesthetic Experience

Creating meaningful connections between music and taste is hard. Synesthetic associations are inherently subjective, there's no objectively "correct" mapping between piano pieces and cocktail recipes. However, a completely random association would be  unsatisfying. I established several criteria for a successful pianocktail:

* It should create tasty, balanced cocktails
* It should invent novel recipes rather than simply matching songs to pre-defined list of known cocktails
* It should map similar musical pieces to similar cocktails --- a smooth, continuous transformation
* With practice, a pianist should be able to develop intuition about how and what to play to achieve specific types of cocktails

These principles guided the development of a sophisticated system that goes far beyond simple note-to-ingredient mapping, creating a new form of artificial synesthesia.

### Music Understanding

The system begins by learning to understand music. I collected 30,000 MIDI files of piano compositions and trained a self-supervised transformer model to embed musical pieces using techniques from natural language processing, including a specialized tokenizer, BERT with note-wise masking, and SentenceBERT fine-tuning. The system learns to embed musical structure, style, and emotion in a high-dimensional space. The following figure shows projections of the learned embeddings: pieces from the same composer cluster together in a meaningful way, and nearest neighbors of a piece often are pieces from the same composer!

<img class="image" src="/images/projects/pianocktail/tsne_b128_r768_represented.png"  class="small-image">
<p class="legend">
<i>T-SNE visualization of the music representation space, showing how different composers and genres naturally cluster together.</i></p>

### The Language of Taste

For cocktails, I collected about 600 high-quality recipes all using ingredients from a predefined set of 35 ingredients. Each cocktail is represented in a "taste space" with 13 dimensions, including alcohol content, sourness, sweetness, bitterness, herbiness, fruitiness, complexity, and other attributes. These representations account for preparation methods, dilution effects, and the interplay between ingredients.

### Building Bridges Between Senses

The heart of the system is the creation of a shared representational space where music and taste can meaningfully interact. Using a Latent Translation approach with a bi-modal variational autoencoder, the system learns to map between musical representations and taste representations.

To guide this mapping in an intuitive direction, I defined semantic labels applicable to both domains --- such as "Cuban" for both Latin jazz and rum-mint cocktails, or "Romantic" for both Chopin nocturnes and complex, bittersweet drinks. These semantic anchors help align the two domains in ways that feel natural rather than arbitrary. After aligning the two domains in through a few constrained mapping, the trained auto-encoder encodes for a smooth generalization to every possible piece and cocktail. 

### Evolutionary Cocktail Creation

Once a musical piece is mapped to a position in the taste space, a genetic algorithm generates an actual recipe. Starting with random combinations of 2-8 ingredients, the system evolves recipes over 100 generations, selecting and mutating the ones that best match the target taste profile. Evolution operations include adding or removing ingredients, adjusting quantities, and combining successful "parent" recipes.

The result is a complete cocktail specification --- ingredients, quantities, glass type, and preparation method --- that captures the essence of the original musical piece in liquid form.


### Experience Taste-Music Synesthesia

The digital version of the Pianocktail is now available for anyone to experience. By providing a YouTube URL, an audio file, or a MIDI file of piano music, you can discover what your favorite pieces taste like. Each recipe includes detailed preparation instructions, enabling you to craft these musical cocktails at home.

<br>

<center>
<a href="https://huggingface.co/spaces/ccolas/TastyPiano" target="_blank" rel="noopener noreferrer" class="btn">Taste Music!</a>
</center>
