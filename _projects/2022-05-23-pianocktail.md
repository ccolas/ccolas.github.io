---
title: 'Taste Music with the Pianocktail'
date: 2022-05-23 00:00:00
description: A machine learning approach to taste-music synesthesia, inspired by Boris Vian's fictional invention.
featured_image: '/images/projects/pianocktail/pianocktail.jpg'
---

<img class="image" src="/images/projects/pianocktail/pianocktail.jpg" alt="" style="margin-bottom:1em;"/>
<p class="legend" style="text-align:center; margin-top:1em;">
<i>Pianocktail from Cie La Rumeur.</i></p>

<br>
<center>
<a href="https://huggingface.co/spaces/ccolas/TastyPiano" class="btn">Demo</a>
</center>

<style>
.page li {
    margin-bottom: 0.3em;
    text-indent: -1em; 
    padding-left: 1em;
    font-size:12pt;
}
</style>

In *L'Écume des Jours* (Foam of the Days), the French polymath Boris Vian --- author, jazz musician, singer, and engineer --- imagined the **Pianocktail**, a magical device that transforms piano music into cocktails that capture the emotional essence of the performed piece. This wasn't merely a whimsical plot device but an exploration of *synesthesia* --- the neurological phenomenon where stimulation of one sensory pathway leads to automatic, involuntary experiences in another sensory pathway.

What if we could actually create such a bridge between auditory and gustatory experiences? What if the melancholy of Chopin could be tasted, or the playfulness of Gershwin could be sipped?

### Beyond One-Note-One-Drop

Previous attempts to realize Vian's invention have typically used mechanical approaches --- mapping individual piano keys to specific ingredients, dispensing a few drops with each keystroke. While these [physical implementations](https://www.youtube.com/watch?v=pzsDOH-xtrs&list=PLC196AA37A2D1C066&index=3) are impressive engineering feats, they typically produce "graveyard cocktails" --- chaotic mixtures containing traces of every ingredient corresponding to the notes used in the piece.

<img class="image" src="/images/projects/pianocktail/prototype_demo.png" alt="Physical Pianocktail prototype demonstration" style="width:20%; max-width:600px; margin:0 auto; display:block; margin-bottom:1em;"/>
<p class="legend" style="text-align:center; margin-top:1em;">
<i>My physical Pianocktail prototype demonstrated at a birthday gathering, where attendees could experience the music-to-taste transformation firsthand.</i></p>
  
I wanted to create something more sophisticated --- a system that could generate harmonious, balanced cocktails reflecting the overall character of a musical piece rather than its note-by-note composition. The result is **[TastyPiano](https://huggingface.co/spaces/ccolas/TastyPiano)**, a digital pianocktail using machine learning to transform any piano composition into a unique, tailored cocktail recipe.

### Designing Musical Mixology

Creating meaningful connections between music and taste poses significant challenges. Since these associations are inherently subjective, there's no objectively "correct" mapping between piano pieces and cocktail recipes. However, a completely random association would be equally unsatisfying. I established several criteria for a successful pianocktail:

* It should generate appealing, balanced cocktails
* It should create novel recipes rather than simply matching songs to pre-existing cocktails
* It should map similar musical pieces to similar cocktails --- a smooth, continuous transformation
* With practice, a pianist should be able to develop intuition about how to play to achieve specific types of cocktails

These principles guided the development of a sophisticated system that goes far beyond simple note-to-ingredient mapping, creating a genuine form of artificial synesthesia.

### The Architecture of Artificial Synesthesia

#### Music Understanding

The system begins by learning to understand music. I collected 30,000 MIDI files of piano compositions and trained a self-supervised transformer model to recognize musical patterns and styles. Using techniques from natural language processing --- including a specialized tokenizer, BERT with note-wise masking, and SentenceBERT fine-tuning --- the system learns to represent musical structure, style, and emotion in a high-dimensional space.

<img class="image" src="/images/projects/pianocktail/tsne_b128_r768_represented.png"  style="width:30%; max-width:600px;" alt=""/>
<p class="legend">
<i>T-SNE visualization of the music representation space, showing how different composers and genres naturally cluster together.</i></p>

#### The Language of Taste

For cocktails, I collected about 600 recipes using ingredients from a predefined set of 35 components. Each cocktail is represented in a "taste space" with 13 dimensions, including alcohol content, sourness, sweetness, bitterness, herbiness, fruitiness, complexity, and other attributes. These representations account for preparation methods, dilution effects, and the interplay between ingredients.

#### Building Bridges Between Senses

The heart of the system is the creation of a shared representational space where music and taste can meaningfully interact. Using a Latent Translation approach with a bi-modal variational autoencoder, the system learns to map between musical representations and taste representations.

To guide this mapping in an intuitive direction, I defined semantic labels applicable to both domains --- such as "Cuban" for both Latin jazz and rum-mint cocktails, or "Romantic" for both Chopin nocturnes and complex, bittersweet drinks. These semantic anchors help align the two domains in ways that feel natural rather than arbitrary.

#### Evolutionary Cocktail Creation

Once a musical piece is mapped to a position in the taste space, a genetic algorithm generates an actual recipe. Starting with random combinations of 2-8 ingredients, the system evolves recipes over 100 generations, selecting and mutating the ones that best match the target taste profile. Evolution operations include adding or removing ingredients, adjusting quantities, and combining successful "parent" recipes.

The result is a complete cocktail specification --- ingredients, quantities, glass type, and preparation method --- that captures the essence of the original musical piece in liquid form.


### Experience Taste-Music Synesthesia

The digital version of the Pianocktail is now available for anyone to experience. By providing a YouTube URL, an audio file, or a MIDI file of piano music, you can discover what your favorite pieces taste like. Each recipe includes detailed preparation instructions, enabling you to craft these musical cocktails at home.

<br>

<center>
<a href="https://huggingface.co/spaces/ccolas/TastyPiano" class="btn">Taste Music!</a>
</center>

Whether you're a musician curious about the flavor of your compositions, a mixologist looking for novel inspiration, or simply interested in the intersection of technology and art, the Pianocktail offers a unique window into the possibilities of artificial synesthesia --- bringing Boris Vian's imaginative invention into reality through the combination of machine learning and mixology.
