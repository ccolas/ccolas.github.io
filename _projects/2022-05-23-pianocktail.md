---
title: 'Taste Music with the Pianocktail'
date: 2022-05-23 00:00:00
description: Taste--Music synethesia.
featured_image: '/images/projects/pianocktail/pianocktail.jpg'
---

<img class="image" src="/images/projects/pianocktail/pianocktail.jpg" alt=""/>
<p class="legend">
<i>Pianocktail from Cie La Rumeur.</i></p>

<center>
<a href="https://huggingface.co/spaces/ccolas/TastyPiano" class="btn">Demo</a>
</center>

In his book *L'Écume des Jours*, the French author, singer, jazz musician and engineer Boris Vian invents the **Pianocktail**, a magical machine that turns any piano song 
played on it into a sophisticated cocktail transmitting the same emotions. This is a phenomenon called *synethesia* where multiple senses interact to form cross-modal 
experiences: associating sounds and numbers, emotions and colors, music and taste.

Can such a machine be called to life? One way is to map each note to an ingredient and to turn any key press into a few drops. With this simple method people have built
[wonderful](https://www.youtube.com/watch?v=pzsDOH-xtrs&list=PLC196AA37A2D1C066&index=3) [machines](https://www.youtube.com/watch?v=y0RJg7I2x34). But this only creates
graveyard cocktails, diverse mixtures of all the ingredients corresponding to the scale used in the song---not great. Instead, I worked on a more 
sophisticated implementation using recent machine learning methods. I call it **[TastyPiano]((https://huggingface.co/spaces/ccolas/TastyPiano))** a digital pianocktail turning 
any piano song into a cocktail recipe. 

### How does it work?

Associations between music and taste are of course subjective, which is why there is no objective perfect mapping between piano songs and cocktail recipes. On the other hand, a 
random mapping would be disappointing. So what are we looking for? Here are a few criteria that a pianocktail should satisfy:

* It should be able to generate good cocktails,
* It should be able to generate new cocktails and not merely to map songs to a pre-defined list of recipes,
* It should be able to map songs that are close together to cocktails that are close together, i.e. the mapping should be *smooth*.
* With practice, a good pianist should be able to learn to *invert the mapping* and develop an intuition of what to play and how to play it to achieve a targeted type of cocktail.

The simple *one--note--one--drop* mapping does not satisfy any of these criteria. Instead, we want to build music representations, cocktail representations and 
cross-modal representations aligning music and cocktails into a shared representational space. A piano song would be mapped to a musical representation space, then to a 
cross-modal representation space before being decoded into the cocktail space. 

#### Music representations

Here, I scrapped 30k midi files of piano songs from the web and used them to train a self-supervised transformer model. I used methods from the field of 
  natural language processing: a tokenizer from [that paper](https://arxiv.org/abs/2107.05944), the [BERT](https://arxiv.org/abs/1810.04805) algorithm with note-wise masking, 
  followed by a finetuning using [SentenceBERT](https://arxiv.org/abs/1908.10084). 

The tokenization transforms midi files into a sequence of tokens: pitch, duration, velocity and time-shift until the next note. Then, BERT masks up to 5 notes in a row (5*4 
tokens) and trains to inpaint the masked information. This generates token-wise representations that are then aggregated at the song level with a mean pooling. SentenceBERT is 
then used to finetune song representations using a contrastive loss: the algorithm learns to find two music clips coming from the same song among 256 music clips. Doing so, the 
algorithm learns to represent musical styles and to represent music such that musical clips that could belong to the same piece are closer together.

<img class="image" src="/images/projects/pianocktail/tsne_b128_r768_represented.png" alt=""/>
<p class="legend">
<i>T-SNE of the music representation space for a few composers/musical genres.</i></p>

#### Cocktail representations

Here again, I scrapped the web and obtained about 600 recipes all using ingredients from a pre-defined set of 35 ingredients. I then hand-defined a taste representation space 
by aggregating taste representations of ingredients in proportion to their quantity in the drink. Taste representations include 13 features: percentage of alcohol, estimated 
sourness, sweetness, bitterness, herbiness, fruitiness, oakyness, egginess, fizziness, spiciness, complexity (in terms of number of sub-ingredients), colorfulness and the final volume of 
the drink. All these are estimated after dilution, which itself depends on the cocktail preparation type (built, stirred or shaken) and the initial percentage of alcohol. 

#### Synesthetic representations

To convert music representations into taste representations, I used the [Latent Translation](https://arxiv.org/abs/1902.08261) approach. It trains a bi-modal variational 
auto-encoder (VAE) that can take in either music representations or taste representations (flagged with a one-hot code) and generate in either of these spaces as well. In 
addition of the traditional VAE setting, we use two other losses: 
* A sliced-Wasserstein distance (SWD) to push the latent distributions of music and taste closer together. This makes both representation space *overlap* into the synetsthetic 
  latent space of this translation VAE.
* A set of classification losses to align the synethesia in a pre-define subjective way. To this end, I defined about 8 semantic labels that I could apply to both music and 
  cocktails. *Cuban*, for instance both applies to latin jazz music and cocktails containing cuban rum and mint. During training, a classification head operating on the 
  cross-modal representation space would learn to categorize both cuban music and cuban cocktails, such that the music and cocktail representations would need to align in that 
  sub-space. This allowed me to orient the synesthesia of the pianocktail by grounding it in a few pre-defined points.

Up to this point, we can encode piano songs into music representations, further encode them into cross-modal representations with the translation VAE and decode taste 
representations. Now we need to generate full recipes.

#### Generating cocktail recipes

The cocktail datasets contains recipes and associated taste representations. To close the loop, I needed an algorithm to turn new taste representations generated from the music 
encoding and the translation VAE into definitive cocktail recipes. Here, I used a *genetic algorithm*. It generates a bunch of cocktail recipes at random by sampling between 2 
and 8 ingredients and sampling quantities between the min and max quantities found in the dataset.  This forms the first generation of cocktails. For each cocktail, I can 
compute its taste representation and compare it to my target taste representation to compute a score (closer is better).  I can now run a full evolutionary process. For 100 
generations, I select the best individuals from the previous generation and mutate them to form a new one: adding and removing ingredients, adding noise on their quantity, 
merging two cocktails together, etc.  After 100 generations, I obtain the best individual: a recipe which taste representation closely matches the targeted one.

To make sure that this is working, I can compare the distributions of taste features, number of ingredients, cocktail types, etc. between the dataset of cocktails and a 
distribution of cocktails generated by the pianocktail when run on 500 pieces of piano. After a few tweaks, this works quite well!

#### Try it out!
In addition, the pianocktail predicts a type of glass and a preparation type for the cocktail. With the concrete recipe, we have all we need to write a detailed recipe with 
instructions. You can try the app by clicking the button below. With a YouTube url, an audio file or a midi file, taste the music!


<br>


<center>
<a href="https://huggingface.co/spaces/ccolas/TastyPiano" class="btn">Taste Music!</a>
</center>

