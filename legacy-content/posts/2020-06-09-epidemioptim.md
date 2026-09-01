---
title: 'Optimizing Lock-Down Policies with AI'
date:  2020-06-09
description: The EpidemiOptim library lets us optimize control strategies in the context of epidemics. Try out the demo and generate your own lock-down policy. Will you beat the AI?
featured_image: '/images/posts/epidemioptim/visu.gif'
---

<p><i>In collaboration with Boris Hejblum, Sébastien Rouillon, Rodolphe Thiébaut, Pierre-Yves Oudeyer, Clément Moulin-Frier & Mélanie Prague.
</i></p>
<br>


<center>
<a href="https://arxiv.org/pdf/2010.04452.pdf" class="btn">Paper</a>  <span style="color: #003965;"> &#9679;</span> 
<a href="https://github.com/flowersteam/epidemioptim" class="btn">Code</a>  <span style="color: #003965;"> &#9679;</span> 
<a href="{{ site.url }}/data/slides/slides_epidemioptim.pdf" class="btn">Slides</a>  <span style="color: #003965;"> &#9679;</span>
<a href="https://epidemioptim.bordeaux.inria.fr/" class="btn">Demo</a>  

</center>

<br>

<img class="image" src="/images/posts/epidemioptim/visu.gif" alt="Evolution of Covid epidemic in France."/>


Epidemiologists model the dynamics of epidemics in order to propose mitigation strategies based on pharmaceutical and non-pharmaceutical interventions (contact limitation, lock down, vaccination, etc.). Hand-designing such strategies is not trivial because of the number of possible interventions and the difficulty to predict their long-term effects. This task can be seen as an optimization problem where state-of-the-art machine learning algorithms might bring significant value.

[This website](https://epidemioptim.bordeaux.inria.fr/) presents an interactive demo of a set of machine learning methods applied to the automatic design of a lock-down intervention strategy in the context of the 
COVID19 epidemic in the French Ile-de-France region. Technical details can be found in the associated paper: [EpidemiOptim: A Toolbox for the Optimization of Control Policies in Epidemiological Models](https://arxiv.org/pdf/2010.04452.pdf). The full code of this toolbox is open-source and available on github [here](https://github.com/flowersteam/epidemioptim).

<br>
<center>
<a href="https://epidemioptim.bordeaux.inria.fr/" class="btn">Try it out!</a>
</center>
<br>

#### Cite this blog post

```
@article{colas2020epidemioptim,
    title={ {E}pidemiOptim: {A} {T}oolbox for the {O}ptimization of {C}ontrol {P}olicies in {E}pidemiological Models},
    author={Colas, C{\'e}dric and Hejblum, Boris and Rouillon, S{\'e}bastien and Thi{\'e}baut, Rodolphe and Oudeyer, Pierre-Yves and Moulin-Frier, Cl{\'e}ment and Prague, M{\'e}lanie},
    journal={Journal of Artificial Intelligence Research},
    year={2020}} 
```

<center>
<button class="btn" type="button" onclick="copyToClipboard()"> Export Bibtex </button>
</center>
<script>

function copyToClipboard() {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    var text = "@article{colas2020epidemioptim,
    title={ {E}pidemiOptim: {A} {T}oolbox for the {O}ptimization of {C}ontrol {P}olicies in {E}pidemiological Models},  author={Colas, C{\'e}dric and Hejblum, Boris and 
Rouillon, S{\'e}bastien and Thi{\'e}baut, Rodolphe and Oudeyer, Pierre-Yves and Moulin-Frier, Cl{\'e}ment and Prague, M{\'e}lanie}, journal={Journal of Artificial Intelligence 
Research}, year={2020}}"
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Copied to clipboard: " + text);
}
</script>