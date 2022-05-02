---
title: 'Language as a Cognitive Tool: Dall-E, Humans and Vygotskian RL Agents'
date:  2021-03-02
description:  This blog post presents a supra-communicative view of language and advocates for the use of language as a cognitive tool to organize the cognitive development of intrinsically motivated artificial agents. We go over studies revealing the cognitive functions of language in humans, cover similar uses of language in the design of artificial agents and advocate for the pursuit of Vygotskian embodied agents - artificial agents that leverage language as a cognitive tool to structure their continuous experience, form abstract representations, reason, imagine creative goals, plan towards them and simulate future possibilities.
featured_image: '/images/posts/vygo/language-swiss-army-knife.png'
---

<sub>
_By Cédric Colas, Tristan Karch, Clément Moulin-Frier & Pierre-Yves Oudeyer._</sub>

<hr>
Have you heard about DALL-E? Beyond the funny mashup between Pixar’s robot and the surrealist painter, Dall-E is OpenAI’s new transformer trained to compose images from text descriptions [[DALL-E](https://openai.com/blog/dall-e/)]. Most people agree, DALL-E’s ability to blend concepts into natural images is remarkable; it often composes just like you would. Look at these avocado-chairs:


<img class="image" src="/images/posts/imagine/avocado-chair.png" alt="Avocado-chair"/>
<p class="legend">
<i>Output from OpenAI’s Dall-E model when prompted by: "an armchair in the shape of an avocado” <a href="https://openai.com/blog/dall-e/"> [Dall-E]</a>.</i></p>


If it’s so impressive, it’s because this type of composition feels like a very special human ability. How would it know? The ability to compose ideas is indeed at the source of a whole bunch of uniquely-human capacities: it is key for abstract planning, efficient generalization, few-shot learning, imagination and creativity. If we ever were to design truly autonomous learning agents, they would certainly need to demonstrate such compositional imagination skills.

In this blog post, we argue that aligning language and the physical world helps transfer the structure of our compositional language to the messy, continuous physical world. As we will see, language is much more than a communication tool. Humans extensively use it as a cognitive tool, a cornerstone of their development. We’ll go over developmental psychology studies supporting this idea and will draw parallels with recent advances in machine learning. This will lead us to introduce _language-augmented learning agents_: a family of embodied learning agents that leverage language as a cognitive tool. 


### Language as a Cognitive Tool in Humans


Ask anyone what language is about. Chances are, they will answer something along these lines: “language is for people to communicate their thoughts to each other”. They’re right
 of course, but research in developmental psychology shows that language is a lot more. Vygotsky, a Soviet psychologist of the 1930s, pioneered the idea of the importance of language in the cognitive development of humans [[Vygotsky, 1934](https://mitpress.mit.edu/books/thought-and-language)]. This idea was then developed by a body of research ranging from developmental psychology, through linguistic to philosophy [[Whorf, 1956](https://mitpress.mit.edu/books/language-thought-and-reality); [Rumelhart et al., 1986](https://www.cs.toronto.edu/~fritz/absps/pdp14.pdf); [Dennett, 1991](https://en.wikipedia.org/wiki/Consciousness_Explained); [Berk, 1994](https://www.scientificamerican.com/article/why-children-talk-to-themselves/),
  [Clark, 1998](https://era.ed.ac.uk/bitstream/handle/1842/1311/magic.pdf?sequence=1&isAllowed=y), [Carruthers, 2002](https://drum.lib.umd.edu/bitstream/handle/1903/4339/Cognitive.Functions.of.Language.pdf?sequence=3) and [Lupyan, 2012](http://sapir.psych.wisc.edu/papers/lupyan_2012_languageAugmentedThought.pdf)].


<img class="image" src="/images/posts/imagine/vygo.jpg" alt="Vygotsky"/>
<p class="legend">
<i><b>Lev Vygostky and his socio-cultural theory of cognitive development. </b>
Vygotsky is mainly known for two ideas. First, although language is initially learned through and for communication with others, it is later internalized and used as a cognitive tool to organize thoughts. As a consequence, important aspects of high-level cognitive functions have social origins. Second, caretakers often setup a <b>Zone of Proximal Development</b> to facilitate children learning. This can take the form of a scaffolding of the environment, demonstrations or linguistic aids adapted to the current level of the child---as the child progresses, caretakers propose new challenges just beyond their current capabilities.</i></p>




Let us start with words. Words are invitations to form categories [[Waxman and Markow, 1995](https://www.sciencedirect.com/science/article/abs/pii/S001002858571016X)]. Hearing the same word in a variety of contexts invites humans to compare situations, find similarities, differences and build symbolic representations of objects (dogs, cats, bottles) and their attributes (colors, shapes, materials). With words, the continuous world can be structured into mental entities, symbols which, when composed and manipulated enable reasoning and give rise to the incredible expressiveness and flexibility of human thoughts [[Whitehead, 1927](https://archive.org/details/in.ernet.dli.2015.166010)]. In the same way, relational language seems to offer _invitations to compare_ and is thought to be the motor of analogical and abstract reasoning [[Gentner and Hoyos, 2017](https://onlinelibrary.wiley.com/doi/10.1111/tops.12278)]. 


<img class="image" src="/images/posts/imagine/language-swiss-army-knife.png" alt="Language swiss army knife"/>
<p class="legend">
<i>The Language Swiss Army Knife -- key cognitive functions enhanced by language.</i></p>




<div class="content">
<div class="row">
    <div class="col-lg-8">
           <p>More generally, the language we speak seems to strongly shape the way we think. <a href="https://www.youtube.com/watch?v=RKK7wGAYP6k"> [Lera Boroditsky’s Ted Talk]</a>  presents some examples of these effects. The perception of colors, for instance, is directly affected by the color-related words our language contains <a href="https://www.pnas.org/content/pnas/104/19/7780.full.pdf"> [Winawer et al., 2007] </a>. Whether your language uses one word for each number or simply categorizes one, two and many will impact your ability to reason with numbers abstractly and thus to develop abilities for math and science <a href="https://www.sciencedirect.com/science/article/pii/S0010027708001042?casa_token=SCkMeHibf_YAAAAA:BonfbLRNN9-eymEOohJK_ijP6MbOWawddS2uxsSDDsjXMidUN1OyfNuDAJIo1-qbTfj0pTEGVQ"> [Frank et al., 2008] </a>. </p>
    </div>
    <div class="col-sm-4" style="border-left: 4px solid #13428f; margin-left: 20px; align-self: center;">
           <p style="margin-left:20px;color:#13428f"><big><i>Vygotsky, Berk and others showed that private speech was instrumental to the ability of children to reason and solve tasks</i></big></p>
    </div>
</div>
</div>



Language can also be used as a tool to solve problems. Piaget first described that two-to-seven-year old children often use private speech or self-talk to describe their on-going activities and organize themselves, but thought this was a sign of cognitive immaturity [[Piaget, 1923](https://newlearningonline.com/literacies/chapter-14/piaget-on-the-language-and-thought-of-the-child)]. Vygotsky, Berk and others showed that private speech was instrumental to the ability of children to reason and solve tasks: the harder the task, the more intensively children used it for planning [[Vygotsky, 1934](https://mitpress.mit.edu/books/thought-and-language), [Berk, 1994](https://www.scientificamerican.com/article/why-children-talk-to-themselves/)]. Far from being left behind as children grow up, Vygotsky showed that private speech is internalized to become inner speech, the little voice in your head [[Vygotsky, 1934](https://mitpress.mit.edu/books/thought-and-language) and [Kohlberg et. al., 1968](https://www.jstor.org/stable/1126979?origin=crossref)].  Children that cannot formulate sentences like “at the left of the blue wall” show decreased spatial orientation capacities in such contexts compared to children who can. Interfering with adults' inner speech by asking them to repeat sentences also hinders their ability to orient spatially [[Hermer-Vazquez et al. 2001](https://www.researchgate.net/profile/Linda-Hermer-2/publication/12165254_Language_space_and_the_development_of_cognitive_flexibility_in_humans_The_case_of_two_spatial_memory_tasks/links/5c2e1ecba6fdccd6b58f7d23/Language-space-and-the-development-of-cognitive-flexibility-in-humans-The-case-of-two-spatial-memory-tasks.pdf)].


Because language is---at least partially---compositional, we can immediately generalize and understand sentences that we never heard before. This is called *systematic generalization*: the ability to automatically transfer the meaning of a few thoughts into a myriad of other thoughts [[Fodor and Pylyshyn, 1988](https://uh.edu/~garson/F&P1.PDF)]. Compositionality also underlies the reverse process: *language productivity* [[Chomsky, 1957](http://217.64.17.124:8080/xmlui/bitstream/handle/123456789/557/syntactic_structures%20(1).pdf?sequence=1)]. If words and ideas are like lego blocks, we can combine them recursively in infinite ways to form an infinite space of sentences and thoughts. This mechanism powers the imagination of new ideas and concepts that underlies many of the high-level cognitive abilities of humans. While our language productivity helps us generate new concepts like *"an elephant skiing on a lava flow"*, systematic generalization lets us understand them. 


Once we have composed a new idea via language, it seems we can effortlessly picture what it would look like. Not convinced? Try to imagine what a cat-bus looks like and check [here](https://www.google.com/search?q=miyazaki+catbus&tbm=isch&) whether what you imagine matches Miyazaki’s creature. If most humans take this Dall-E-like ability for granted, studies showed that early contact with a compositional, recursive language is completely necessary. In neurobiology, this conscious, purposeful process of synthesizing novel mental images from two or more objects stored in memory is called Prefrontal synthesis (PFS) [[Vyshedskiy, 2019](https://riojournal.com/article/38546/)]. Children born deaf with no access to recursive sign language and Romanian children left on their own in Ceausescu’s orphanages---among others---were shown to lack PFS abilities and failed to acquire abstract compositional thinking even after intensive language therapy [[Vyshedskiy, 2019](https://riojournal.com/article/38546/)].

When PFS works, it seems to be easily triggered by language. The embodied simulation hypothesis indeed argues that humans have rich, multi-sensory representations prompted by language. If you read the sentence “he saw a pink elephant in the garden”, chances are you’re visualizing a pink elephant. More generally, understanding language seems to involve parts of the brain that would be active if you were in the situation described by the sentence. Reading about pink elephants? Your visual cortex lights up. Reading about someone cutting a tree? Your motor cortex lights up. This was even shown to work for metaphorical use of words [[Bergen, 2012](https://www.basicbooks.com/titles/benjamin-k-bergen/louder-than-words/9780465033331/)]. 

In a nutshell, humans use language as a tool for many of their high-level cognitive skills including abstraction, analogies, planning, expressiveness, imagination, creativity and mental simulation.


### Language-World Alignment


<div class="content">
<div class="row">
    <div class="col-lg-8">
           <p>Language can only help if it is grounded in the physical world. Before drawing an avocado-chair, you need to know what avocados and chairs are; you need to know what drawing means. Our source of information comes from <b>aligned data</b>: as children, we observe and experience the physical world and hear corresponding linguistic descriptions. The mother could say: “This is a chair” when the infant is looking at it. The father could say: “Let’s put you on the chair” while the infant experiences being transported and sat on a chair. </p>
    </div>
    <div class="col-sm-4" style="border-left: 4px solid #13428f; margin-left: 20px; align-self: center;">
           <p style="margin-left:20px;color:#13428f"><big><i>Aligning language and physical data might just be about transferring the discrete structure of language onto the continuous, messy real world.</i></big></p>
    </div>
</div>
</div>
As infants hear about chairs while experiencing chairs (seeing them, sitting on them, bumping their feet against it), they strengthen the association and build their knowledge of chairs.

It is now time to turn to artificial learning systems: AI systems also use aligned data! A basic example is the datasets of image and label pairs used by image classification algorithms. In language-conditioned reinforcement learning (LC-RL), engineers train learning agents to perform behaviors satisfying linguistic instructions: they reward agents when their state matches---is aligned---with the instruction. In real life however, children are not often provided with object-label pairs or explicit instructions. Caretakers mostly provide descriptive feedback, they describe events that are deemed novel or relevant for the child [[Tomasello, 2005](https://www.hup.harvard.edu/catalog.php?isbn=9780674017641) and [Bornstein et. al., 1992](https://www.jstor.org/stable/1131235?seq=1)].

The IMAGINE agent receives such descriptive feedback [[Colas et. al., 2020](https://arxiv.org/pdf/2002.09253.pdf)]. In Imagine, we look at how language can be used as a tool to imagine creative goals as a way to power an autonomous exploration of the environment---this will be discussed below. In a controlled [Playground](https://github.com/flowersteam/playground_env) environment, the Imagine agent freely explores the environment and receives simple linguistic descriptions of interesting behaviors from a simulated caretaker. If the agent hears “you grasped a red rose”, it turns this description into a potential goal and will try to grasp red roses again. To do so, it needs to 1) understand what that means; 2) learn to replicate the interaction. The description it just received is an example of aligned data: a trajectory and a corresponding linguistic description. This data can be used to learn a reward function (1): a function that helps the agent recognize when the current state matches---is aligned---with the linguistic goal description. When the two match, the reward function generates a positive reward: the goal is reached. Given a few examples, the agent correctly recognizes when goals are achieved and can learn a policy to perform the required interaction via standard reinforcement learning using self-generated goals and rewards (2).


<img class="image" src="/images/posts/imagine/descriptive-feedback.png" alt="Descriptive Feedback"/>
<p class="legend">
<i>Example of a descriptive feedback used to ground language in an agent's behavior. The robot is initially targeting to grasp the yellow tennis ball but as it reaches another goal the social partner provides a description of it (image from <a href="https://www.aber.ac.uk/en/news/archive/2019/06/title-224324-en.html"> [this post]</a>).</i></p>



Descriptive feedback is interesting because it facilitates hindsight learning. While instruction-based feedback is limited to tell the agent whether its original goal is achieved, descriptions can provide feedback on any interaction, including ones the agent did not know existed. As a result, information collected while aiming at a particular goal can be reused to learn about others, a phenomenon known as hindsight learning [[HER](https://arxiv.org/pdf/1707.01495.pdf?source=post_page---------------------------)]. In existing implementations of LC-RL agents, state descriptions can be generated by scanning possible descriptions with a learned reward function [[IMAGINE](https://arxiv.org/pdf/2002.09253.pdf)], by a hard-coded module [[ACTRCE](https://arxiv.org/abs/1902.04546) and [Jiang et. al., 2019](https://arxiv.org/abs/1906.07343)] or by a learned captioning module trained on instruction-based feedback [[HIGhER](https://arxiv.org/pdf/1910.09451.pdf); [Zhou et al., 2020](https://arxiv.org/pdf/2008.06924.pdf) and [ILIAD](https://arxiv.org/pdf/2102.07024.pdf)]. Given the same aligned data, one can indeed learn a reverse mapping, from the physical world to the language space. This captioning system can be used as private or inner speech to label new chunks of the physical world and generate more aligned data autonomously.

### From Language Structure to World Structure

In the physical world, everything is continuous. Perceptual inputs are just a flow of images, sounds, odors; behavior is a flow of motor commands and proprioceptive feedback. It is very hard to segment this flow into meaningful bits for abstractions, generalization, composition and creation. Language on the other hand is discrete. Words are bits that can easily be swapped and composed into novel constructions. Aligning language and physical data might just be about transferring the discrete structure of language onto the continuous, messy real world.

Dall-E seems to be a very good example of this. Everything starts with aligned data---pairs of images and compositional descriptions---and that’s all there is. Dall-E is not creative per se, but descriptions and images---both constructed by humans---are indeed. Dall-E simply---but impressively---learns to project the structure of language onto the image space, so that, when a human inputs a new creative description, Dall-E can project it onto images. As we argued before, language facilitates some forms of creativity via simple mechanisms to compose concepts, form analogies and abstractions. Swapping words, composing new sentences, generating metaphors are all easier in language space than in image space directly.

### Language-Augmented Reinforcement Learning Agents

Readers should now be convinced that autonomous embodied learning agents should be language-augmented; they should leverage language as a cognitive tool to structure their sensorimotor experience, to compose, generalize, plan, etc. Let us go over some first steps in that direction.

LC-RL methods often investigate the ability of their agent in terms of systematic generalization: the ability to interpret never-seen-before sentences by leveraging knowledge about their constituents. These sentences are known constructions with new associations. 

Let's consider an agent that learned to grasp plants and to feed animals by bringing them food. As it learned these skills, the agent acquired representations of the concepts of animals, plants, food and grasping. Can these concepts be leveraged to understand a new combination such as “feed the plant”? Here again, agents use aligned data (e.g. instruction-state or description-state) and are tested on their ability to project the compositional aspect of language (“feed the animal” + “grasp the plant” → “feed the plant”) to the behavioral space. Although it is not perfectly _systematic_, this type of generalization often works quite well, especially in settings where agents are exposed to a wide distribution of objects/words and perceive the world through an egocentric point of view that helps them isolate individual objects [[Hill et. al., 2019](https://deepmind.com/research/publications/Emergent-Systematic-Generalization-in-a-Situated-Agent)].


<img class="image" src="/images/posts/imagine/policy-sketch.png" alt="Descriptive Feedback"/>
<p class="legend">
<i>The Policy Sketches approach: long-horizon behaviors are aligned
   with policy sketches, sequences of symbolic tokens segmenting 
   the long-horizon task into shorter steps <a href="https://arxiv.org/pdf/1611.01796.pdf"> [Policy Sketches]</a>.</i></p>



Building on these generalization properties, language was also found to be a good way to represent abstractions in hierarchical reinforcement learning setups [[Jiang et. al., 2019](https://arxiv.org/pdf/1906.07343.pdf)]. While the high-level policy acts in an abstract and human-interpretable representation space towards the resolution of long-horizon control problems, the low-level policy benefits from the generalization induced by language-behavior alignment. In Modular Multi-task RL with Policy Sketches, long-horizon behaviors are aligned with policy sketches, sequences of symbolic tokens segmenting the long-horizon task into shorter steps [[Andreas et. al., 2017](https://arxiv.org/pdf/1611.01796.pdf)]. This simple alignment, along with a bias to encode each step-specific behavior with a different policy, is enough to significantly speed up learning without any explicit pre-training of the sub-policies. The sequential structure of the task into separate steps can be projected onto the behavioral space---i.e. sub-policies. Planning and reasoning in language space is much easier for humans and allows us to handle long-horizon tasks. Similarly, the Text-World approach defines artificial learning environments where agents observe and interact with text only [[TextWorld](https://arxiv.org/pdf/1806.11532.pdf)]. This can be seen as a high-level world model in language space. Agents can efficiently explore and plan in the language space, then transfer this knowledge to an aligned sensorimotor space [[AlfWorld](https://arxiv.org/pdf/2010.03768.pdf)].




<img class="image" src="/images/posts/imagine/ood-goals.jpg" alt="Descriptive Feedback"/>
<p class="legend">
<i>Out-of-distribution goal generation powers creative exploration.</i></p>



Creative exploration is about finding new ways to interact with the environment. Agents can efficiently organize their exploration by generating and pursuing their own goals <a href="https://arxiv.org/pdf/1708.02190.pdf">[Forestier et al., 2017]</a>.

<div class="content">
<div class="row">
    <div class="col-lg-8">
          <p>
            Goal generation, however, is often limited to the generation of target representations that are <i>within</i> the distribution of previously-experienced representations. If we want to achieve <i>creative exploration</i>, we need agents to generate <i>out-of-distribution</i> goals, to imagine new possible interactions with their world. This is reminiscent of the way children generate their own creative goals during pretend play <a href="https://files.eric.ed.gov/fulltext/EJ1138861.pdf">[Vygotsky, 1930]</a>, a type of behavior that is argued to benefit children's ability to solve problems later on <a href="https://www.annualreviews.org/doi/pdf/10.1146/annurev-devpsych-070120-014806">[Chu and Schulz, 2020]</a>.
          </p>
    </div>
    <div class="col-sm-4" style="border-left: 4px solid #13428f; margin-left: 20px; align-self: center;">
           <p style="margin-left:20px;color:#13428f"><big><i>If we want to achieve <i>creative exploration</i>, we need agents to generate <i>out-of-distribution</i> goals, to imagine new possible interactions with their world.</i></big></p>
    </div>
</div>
</div>


<img class="image" src="/images/posts/imagine/thumbnail_v6.png" alt="Imagine"/>
<p class="legend">
<i><b> The Imagine architecture as a Vygostkian Deep RL system. </b>
   Social interactions with a social peer enables the agent to learn to represent and understand language as a pre-existent social structure (left). Then, language is 
internalized and used as a cognitive tool to imagine novel goals by re-combining known sentences: the agent aims to achieve these goals autonomously, enabling creative free exploration (right). Another Vygostkian dimension of Imagine is that the social peer scaffolds the environment: when the agent imagines and formulates a goal through private speech, the social peer sets up the environment so that it's neither too hard (the right objects are present), nor too easy (procedurally-generated objects and additional distracting objects) <a href="https://arxiv.org/pdf/2002.09253.pdf"> [IMAGINE]</a>. If you want to play with the code of IMAGINE, feel free to explore our <a href="https://colab.research.google.com/drive/1G9LmvhbvR40XJ-cysgP6zynBnq_fHY63#scrollTo=OPjdOPCNpvz-"> Colab Notebook</a>. The code base is also available in <a href="https://github.com/flowersteam/Imagine">this github repo</a>.</i></p>


The IMAGINE agent we discussed above leverages the productivity of language to generate such creative, out-of-distribution goals---it composes known linguistic goals to form new ones, to imagine new possible interactions [[IMAGINE](https://arxiv.org/pdf/2002.09253.pdf)]. The mechanism is crudely inspired by usage-based linguistic theories. It detects recurring linguistic patterns, labels words used in similar patterns _equivalent_ and uses language productively by switching equivalent words in the discovered templates. This simple mechanism generates truly creative goals that are both novel and appropriate---see discussion in [Runco and Jaeger, 2012](http://emotrab.ufba.br/wp-content/uploads/2019/06/RUNCO-Mark-The-Standard-Definition-of-Creativity.pdf). The novel and appropriate definition of creativity shares similarities with the _intermediate novelty_ principle. Not novel enough is boring (known sentences), but too novel is overwhelming (sentences with random words). The sweet spot is in the middle---using novel instances of known constructions. We show that this simple mechanism boosts the agent’s exploration, as it interacts with more objects, driven by its imagined goals. Sometimes they make sense---the agent knows it can grasp plants and animals, and feed animals, so it will imagine it can feed plants as well. Sometimes they don’t and the agent might try to feed the lamp just like a child might feed his doll in _pretend play_ [[Vygotsky, 1933](http://yuoiea.com/uoiea/assets/files/pdfs/vygotsky-play.pdf)]. In any case, the agent is driven to interact with its world, with the objects around in a directed and committed way. 

Goal imagination also boosts generalization for two reasons. First, imaginative agents train on a larger set of goals, thus extend the support of their training distribution and generalize better. Indeed, goal imagination enables agents to extend the set of known goals to a larger one made of all combinations of goals from the original set. Second, goal imagination can help correct for over-generalizations. In Playground, animals can be fed with food or water, but plants only receive water. When asked to feed plants for the first time (for evaluation purpose, i.e. zero-shot generalization), the agent over-generalizes and brings them water or food with equal probability---how could it know? When allowed to imagine goals, agents imagine that plants could be fed just like animals and try to do so---with water or food. Although the policy over-generalizes, the reward function can still identify whether plants have grown or haven't. Agents detect that plants only grow when provided with water, never with food. As a result, the policy can be updated based on internally-generated rewards to correct for the prior over-generalization. Language does not need to correspond to a perfectly compositional world, the agent can correct for inconsistencies.

In another contribution, we introduce a language-conditioned goal generator to execute mental simulations of possible sensorimotor goals matching linguistic descriptions  [[LGB](https://arxiv.org/pdf/2006.07185.pdf)]. This Language-Goal-Behavior approach (LGB) decouples skill learning from language grounding. In the _skill learning phase_, LGB relies on an innate semantic representation that characterizes spatial relations between objects in the scene using predicates known to be used by pre-verbal infants [[Mandler, 2012](https://cogsci.ucsd.edu/~jean/abstract/SpatialEnrichment.pdf)]. LGB explores its semantic space, discovers new configurations and learns to achieve them reliably. In the _language grounding phase_, LGB interacts with a descriptive caretaker that provides aligned data: linguistic descriptions describing LGB’s trajectories. This data is used to train the language-conditioned goal generator. When instructed with language, LGB can simulate/imagine several semantic configurations that could result from executing the language instruction. Instead of following the instruction directly as a standard LC-RL agent does, LGB samples a possible matching configuration and targets it directly. This type of mental visualization of the instructed goal is known to be performed by humans [[Wood et. al., 1976](https://acamh.onlinelibrary.wiley.com/doi/pdfdirect/10.1111/j.1469-7610.1976.tb00381.x)] and allows agents to demonstrate a diversity of behaviors for a single instruction. This approach is reminiscent of the Dall-E algorithm and could integrate it to generate visual targets from linguistic instructions. 

<img class="image" src="/images/posts/imagine/desctr-figure.png" alt="DECSTR"/>
<p class="legend">
<i><b> The Language-Goal-Behavior architecture </b> <a href="https://arxiv.org/pdf/2006.07185.pdf"> [LGB]</a>. The agent first generates a set of possible future configurations 
matching a linguistic description, then samples one of them as a concrete target. </i></p>



### The Big Picture

It is now time to take a step back. In this post, we’ve seen that language, more than a communication tool, is also a cognitive tool. Humans use it all the time, to represent abstract knowledge, plan, invent new ideas, etc. If it’s so helpful, it’s because we align it to the real world and, by doing so, project its structure and compositional properties to the continuous, messy physical world.



The embodied simulation hypothesis supports this idea. Humans seem to use language, to generate structured representations and simulations of what it refers to. This view is compatible with theories viewing humans as maintaining collections of world models [e.g. [Forrester, 1971](http://www.virtualadjacency.com/wp-content/uploads/2008/01/42c-MIT-Prof-Forrester-Counterintuitive-Behavior-of-Social-Systems-TechRvw-Jan-1971.pdf); [Schmidhuber, 2010](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.467.5494&rep=rep1&type=pdf); [Nortmann et al., 2013](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4428292/pdf/bht318.pdf); [Maus et. al., 2013](https://reader.elsevier.com/reader/sd/pii/S0896627313002572?token=4396251A8D1E11B05D6464A79137FF32FB5A5BE41D1860EA40FCE1F870AB1931059F900D2AEF309E276B5049841CD186) and [Clark, 2015](https://books.google.fr/books?hl=fr&lr=&id=TnqECgAAQBAJ&oi=fnd&pg=PP1&dq=clark+surfing+uncertainty&ots=ausj5hB5PR&sig=p8bKMxE4Mgi7QvkI8sd_r0BHx4A#v=onepage&q=clark%20surfing%20uncertainty&f=false)].

Now if we look at the algorithms discussed above under that lens, we’ll find that many of them are conducting mental simulations triggered by language. Dall-E certainly does; it generates visual simulation (i.e. visualizes) language inputs. That’s also what LGB does, it visualizes specific semantic representation that might result from executing an instruction. In a weaker sense, all LC-RL algorithms also do that: given a language input, they generate what’s the next action to take to execute the instruction. Model-based versions of these algorithms would do so in a stronger sense---picturing whole trajectories matching language descriptions. Finally, learned reward functions offer verification systems for mental simulation: checking whether descriptions and state---imagined or real---match. 


<div class="content">
<div class="row">
    <div class="col-lg-8">
          <p>
           These approaches are only the first steps towards a more ambitious goal---<b>artificial agents that demonstrate a rich linguistic mental life</b>. Just like humans, autonomous agents should be able to describe what’s going on in the world with a form of inner speech. The other way around, these agents should be able to leverage the productivity of language, generate new sentences and ideas from known ones and project these linguistic representations into visual, auditive and behavioral simulations. Linguistic productivity can also drive pretend play, the imagination of creative made-up goals for the agent to practice its problem resolution skills. 
          </p>
    </div>
    <div class="col-sm-4" style="border-left: 4px solid #13428f; margin-left: 20px; align-self: center;">
           <p style="margin-left:20px;color:#13428f"><big><i>These approaches are only the first steps towards a more ambitious goal—artificial agents that demonstrate a rich linguistic mental life.</i></big></p>
    </div>
</div>
</div>

Only agents that conduct such an intensive alignment between language and the physical world can project linguistic structures onto their sensorimotor experience and learn to recognize the building blocks that will help them plan, compose, generalize and create.

This blog post covered works from developmental psychology and showed the importance of aligning language and physical experience in humans. Inspired by these studies, we argued for the importance of augmenting learning agents with language-based cognitive tools and reviewed first steps in that direction. Whereas standard language-conditioned RL approaches only use language to communicate instructions or state representations, language-augmented RL agents align language and sensorimotor interactions to build structured world models. Language-Augmented Reinforcement Learning (LARL) builds on the history of research in developmental psychology pioneered by the Russian school [[Vygotsky, 1934](https://mitpress.mit.edu/books/thought-and-language)] and the recent movement to transpose these ideas to cognitive robotics [[Mirolli et al., 2011](https://core.ac.uk/download/pdf/37835593.pdf)]. In LARL, language is used as the main cognitive tool to guide agents' development. Artificial agents, just like humans, build language-structured world models that underlie high-level cognitive abilities such as planning, representation abstractions, analogies and creativity.



#### Acknowledgements
<sub style="display: block; line-height: 1.5em">
We would like to give a special thanks to <a href="http://www.isir.upmc.fr/?op=view_profil&lang=fr&id=28">Olivier Sigaud</a> for his feedback and precious help on this blog.
</sub>

#### Cite this blog post

```
@misc{colas:hal-03159786,
  TITLE = {{Language as a Cognitive Tool: Dall-E, Humans and Vygotskian RL Agents}},
  AUTHOR = {Colas, C{\'e}dric and Karch, Tristan and Moulin-Frier, Cl{\'e}ment and Oudeyer, Pierre-Yves},
  URL = {https://hal.archives-ouvertes.fr/hal-03159786},
  NOTE = {This blog post presents a supra-communicative view of language and advocates for the use of language as a cognitive tool to organize the cognitive development of intrinsically motivated artificial agents. We go over studies revealing the cognitive functions of language in humans, cover similar uses of language in the design of artificial agents and advocate for the pursuit of Vygotskian embodied agents - artificial agents that leverage language as a cognitive tool to structure their continuous experience, form abstract representations, reason, imagine creative goals, plan towards them and simulate future possibilities.},
  YEAR = {2021},
  MONTH = Mar,
  HAL_ID = {hal-03159786},
  HAL_VERSION = {v1},
}
```

<button class="btn" type="button" onclick="copyToClipboard()"> Export Bibtex </button>

<script>

function copyToClipboard() {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    var text = "@misc{colas:hal-03159786,  TITLE = {{Language as a Cognitive Tool: Dall-E, Humans and Vygotskian RL Agents}},  AUTHOR = {Colas, C{\'e}dric and Karch, Tristan and Moulin-Frier, Cl{\'e}ment and Oudeyer, Pierre-Yves}, URL = {https://hal.archives-ouvertes.fr/hal-03159786}, NOTE = {This blog post presents a supra-communicative view of language and advocates for the use of language as a cognitive tool to organize the cognitive development of intrinsically motivated artificial agents. We go over studies revealing the cognitive functions of language in humans, cover similar uses of language in the design of artificial agents and advocate for the pursuit of Vygotskian embodied agents - artificial agents that leverage language as a cognitive tool to structure their continuous experience, form abstract representations, reason, imagine creative goals, plan towards them and simulate future possibilities.}, YEAR = {2021}, MONTH = Mar, HAL_ID = {hal-03159786}, HAL_VERSION = {v1},}"
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Copied to clipboard: " + text);
}


</script>


#### References

  <ul>
    <li style ="font-size: small">
      L. S. Vygotsky - <a href="https://mitpress.mit.edu/books/thought-and-language"> Thought and Language</a> 1934
    </li>
    <li style="font-size: small">
      B. Lee Whorf - <a href="https://mitpress.mit.edu/books/language-thought-and-reality"> 
      Language, Thought, and Reality</a>, 1956
    </li>
    <li style="font-size: small">
      D. E. Rumelhart, P. Smolensky, J.L McClelland and G. E. Hinton - <a href="https://www.cs.toronto.edu/~fritz/absps/pdp14.pdf"> 
      Schemata and Sequential Thought Processes in PDP Models</a>, 1986
    </li>
    <li style="font-size: small">
      D. C. Dennett - <a href="https://en.wikipedia.org/wiki/Consciousness_Explained"> 
      Consciousness Explained</a>, 1991
    </li>
    <li style="font-size: small">
      L. E. Berk - <a href="https://www.scientificamerican.com/article/why-children-talk-to-themselves/"> 
      Why Children Talk to Themselves</a>, 1994
    </li>
    <li style="font-size: small">
      A. Clark - <a href="https://era.ed.ac.uk/bitstream/handle/1842/1311/magic.pdf?sequence=1&isAllowed=y"> 
      Magic Words How Language Augments Human Computation</a>, 1998
    </li>
    <li style="font-size: small">
      P. Carruthers - <a href="https://drum.lib.umd.edu/bitstream/handle/1903/4339/Cognitive.Functions.of.Language.pdf?sequence=3"> 
      The cognitive functions of language</a>, 2002
    </li>
    <li style="font-size: small">
      G. Lupyan - <a href="http://sapir.psych.wisc.edu/papers/lupyan_2012_languageAugmentedThought.pdf"> 
      What Do Words Do? Toward a Theory The cognitive functions of languageof Language-Augmented Thought</a>, 2012
    </li>
    <li style="font-size: small">
      S. R. Waxman and D. B. Markow - <a href="https://en.wikipedia.org/wiki/Consciousness_Explained"> 
      Words as Invitations to Form Categories: Evidence from 12- to 13-Month-Old Infants</a>, 1995
    </li>
    <li style="font-size: small">
      A. N. Whitehead - <a href="https://archive.org/details/in.ernet.dli.2015.166010"> 
      Symbolism Its Meaning And Effect</a>, 1927
    </li>
    <li style="font-size: small">
      D. Gentner and C. Hoyos - <a href="https://onlinelibrary.wiley.com/doi/10.1111/tops.12278"> 
      Analogy and Abstraction</a>, 2017
    </li>
    <li style="font-size: small">
      J. Winawer, N. Witthoft, M. C. Frank, L. Wu, A. R. Wade and L. Boroditsky - <a href="https://www.pnas.org/content/104/19/7780"> 
      Russian blues reveal effects of language
      on color discrimination</a>, 2007
    </li>
    <li style="font-size: small">
      M. C. Frank, D. L. Everett, E. Fedorenko and E. Gibson - <a href="https://www.sciencedirect.com/science/article/abs/pii/S0010027708001042?casa_token=SCkMeHibf_YAAAAA:BonfbLRNN9-eymEOohJK_ijP6MbOWawddS2uxsSDDsjXMidUN1OyfNuDAJIo1-qbTfj0pTEGVQ"> 
      Number as a cognitive technology: Evidence from Pirahã language and cognition</a>, 2008
    </li>
    <li style="font-size: small">
      J. Piaget - <a href="https://newlearningonline.com/literacies/chapter-14/piaget-on-the-language-and-thought-of-the-child"> 
      The Language and Thought of the Child</a>, 1923
    </li>
    <li style="font-size: small">
      L. Kohlberg, J. Yaeger and E. Hjertholm - <a href="https://www.jstor.org/stable/1126979?origin=crossref"> 
      Private Speech: Four Studies and a Review of Theories</a>, 1968
    </li>
    <li style="font-size: small">
      L. Hermer - <a href="https://www.researchgate.net/publication/12165254_Language_space_and_the_development_of_cognitive_flexibility_in_humans_The_case_of_two_spatial_memory_tasks"> 
      Language, space, and the development of cognitive flexibility in humans: The case of two spatial memory tasks</a>, 2001
    </li>
    <li style="font-size: small">
      J. A. Fodor and Z. W. Pylyshyn - <a href="https://uh.edu/~garson/F&P1.PDF"> 
      Connectionism and Cognitive Architecture: A Critical Analysis</a>, 1988
    </li>
    <li style="font-size: small">
      N. Chomsky - <a href="http://217.64.17.124:8080/xmlui/bitstream/handle/123456789/557/syntactic_structures%20(1).pdf?sequence=1"> 
      Synatctic Structure</a>, 1957
    </li>
    <li style="font-size: small">
      A. Vysgedskiy - <a href="https://riojournal.com/article/38546/"> 
      Language evolution to revolution: the leap from rich-vocabulary non-recursive communication system to recursive language 70,000 years ago was associated with acquisition of a novel component of imagination, called Prefrontal Synthesis, enabled by a mutation that slowed down the prefrontal cortex maturation simultaneously in two or more children – the Romulus and Remus hypothesis</a>, 2019
    </li>
    <li style="font-size: small">
      B. K. Bergen - <a href="https://www.basicbooks.com/titles/benjamin-k-bergen/louder-than-words/9780465033331/"> 
      Louder Than Words</a>, 2012
    </li>
    <li style="font-size: small">
      M. Tomasello - <a href="https://www.hup.harvard.edu/catalog.php?isbn=9780674017641"> 
     Constructing a Language</a>, 2005
    </li>
    <li style="font-size: small">
      M. H. Bornstein, C. S. Tamis-LeMonda, J. Tal, P. Ludemann, S. Toda, C. W. Rahn, M-G. Pêcheux, H. Azuma and D. Vardi- <a href="https://www.jstor.org/stable/1131235?seq=1"> 
      Maternal Responsiveness to Infants in Three Societies: The United States, France, and Japan</a>, 1992
    </li>
    <li style="font-size: small">
      C. Colas, T. Karch, N. Lair, J-M. Dussoux, C. Moulin-Frier, P. F. Dominey and P-Y. Oudeyer - <a href="https://arxiv.org/pdf/2002.09253.pdf"> 
      Language as a Cognitive Tool to
      Imagine Goals in Curiosity-Driven Exploration</a>, NeurIPS 2020
    </li>
    <li style="font-size: small">
      M. Andrychowicz, F.Wolski, A. Ray, J. Schneider, R. Fong, P. Welinder, B. McGrew, J. Tobin, P. Abbeel, W. Zaremba - <a href="https://arxiv.org/pdf/1707.01495.pdf?source=post_page---------------------------"> 
      Hindsight Experience Replay</a>, NeurIPS 2017
    </li>
    <li style="font-size: small">
      H. Chan, Y. Wu, J. Kiros, S. Fidler, J. Ba - <a href="https://arxiv.org/abs/1902.04546"> 
      ACTRCE: Augmenting Experience via Teacher's Advice For Multi-Goal Reinforcement Learning</a>, 2019
    </li>
    <li style="font-size: small">
      Y. Jiang, S. Gu, K. Murphy, C. Finn - <a href="https://arxiv.org/abs/1906.07343"> 
      Language as an Abstraction for Hierarchical Deep Reinforcement Learning</a>, NeurIPS 2019
    </li>
    <li style="font-size: small">
      G. Cideron, M. Seurin, F. Strub and O. Pietquin - <a href="https://arxiv.org/pdf/1910.09451.pdf"> 
      HIGhER : Improving instruction following with Hindsight Generation for Experience Replay</a>, 2020
    </li>
    <li style="font-size: small">
      L. Zhou and K. Small- <a href="https://arxiv.org/pdf/2008.06924.pdf"> 
      Inverse Reinforcement Learning with Natural Language Goals</a>, 2020
    </li>
    <li style="font-size: small">
      K. Nguyen, D. Misr, R. Schapire, M. Dudík, and P. Shafto - <a href="https://arxiv.org/pdf/2102.07024.pdf"> 
      Interactive Learning from Activity Description</a>, 2021
    </li>
    <li style="font-size: small">
      F. Hill, A. K. Lampinen, R. Schneider, S. Clark, M. Botvinick, J.L. McClelland and A. Santoro - <a href="https://deepmind.com/research/publications/Emergent-Systematic-Generalization-in-a-Situated-Agent"> 
      Emergent Systematic Generalization in a Situated Agent</a>, ICLR 2020
    </li>
    <li style="font-size: small">
      J. Andreas, D. Klein and S. Levine - <a href="https://arxiv.org/pdf/1611.01796.pdf"> 
      Modular Multitask Reinforcement Learning with Policy Sketches</a>, ICML 2017
    </li>
    <li style="font-size: small">
      M-A. Côté, A. Kádár, X. Yan, B. Kybartas, T. Barnes, E. Fines, J. Moor, M. Hausknecht, R. Yu Tao, L. El Asri, M. Adada, W. Tay and A. Trischler - <a href="https://arxiv.org/pdf/1806.11532.pdf"> 
      TextWorld: A Learning Environment for Text-based Games</a>, 2019
    </li>
    <li style="font-size: small">
      M. Shridhar, X. Yuan, M-A. Côté, Y. Bisk, A. Trischler and M. Hausknecht- <a href="https://arxiv.org/pdf/2010.03768.pdf"> 
      ALFWorld: Aligning Text and Embodied Environments for Interactive Learning</a>, 2020
    </li>
    <li style="font-size: small">
      S. Forestier, R. Portelas, Y. Mollard, P-Y. Oudeyer - <a href="https://arxiv.org/abs/1708.02190"> 
      Intrinsically Motivated Goal Exploration Processes with Automatic Curriculum Learning</a>, 2020
    </li>
    <li style="font-size: small">
      L. S. Vygotsky - <a href="http://yuoiea.com/uoiea/assets/files/pdfs/vygotsky-play.pdf"> 
      Play and its role in the mental development of the child</a>, 1933
    </li>
    <li style="font-size: small">
      J. Chu and L. E. Schulz- <a href="https://www.annualreviews.org/doi/pdf/10.1146/annurev-devpsych-070120-014806"> 
      Play, Curiosity, and Cognition</a>, 2020
    </li>
    <li style="font-size: small">
      J. M. Mandler - <a href="https://cogsci.ucsd.edu/~jean/abstract/SpatialEnrichment.pdf"> 
      On the Spatial Foundations of the Conceptual System and
Its Enrichment</a>, 2012
    </li>
    <li style="font-size: small">
      M. Akakzia, C. Colas, P-Y. Oudeyer, M. Chetouani, O. Sigaud- <a href="https://arxiv.org/pdf/2006.07185.pdf"> 
      Grounding Language to Autonomously Acquired Skills via Goal Generation</a>, ICLR 2021
    </li>
    <li style="font-size: small">
      D. Wood, J. S. Bruner and G. Ross - <a href="https://acamh.onlinelibrary.wiley.com/doi/pdfdirect/10.1111/j.1469-7610.1976.tb00381.x"> 
      The Role of Tutoring in Problem Solving</a>, 1976
    </li>
    <li style="font-size: small">
      J. W. Forrester - <a href="http://www.virtualadjacency.com/wp-content/uploads/2008/01/42c-MIT-Prof-Forrester-Counterintuitive-Behavior-of-Social-Systems-TechRvw-Jan-1971.pdf"> 
      Counterintuitive Behavior of Social Systems</a>, 1971
    </li>
    <li style="font-size: small">
      J. Schmidhuber - <a href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.467.5494&rep=rep1&type=pdf"> 
      Formal Theory of Creativity, Fun, and Intrinsic Motivation (1990–2010)</a>, 2010
    </li>
    <li style="font-size: small">
      N. Nortmann, S. Rekauzke, S. Onat, P. Königand D. Jancke - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4428292/pdf/bht318.pdf"> 
      Primary Visual Cortex Represents the Difference Between Past and Present</a>, 2013
    </li>
    <li style="font-size: small">
      G. W. Maus, J. Fischer, D. Whitney - <a href="https://www.sciencedirect.com/science/article/pii/S0896627313002572"> 
      Motion-Dependent Representation of Space in Area MT+</a>, 2013
    </li>
    <li style="font-size: small">
      Clark - <a href="https://books.google.fr/books?hl=fr&lr=&id=TnqECgAAQBAJ&oi=fnd&pg=PP1&dq=clark+surfing+uncertainty&ots=ausj5hB5PR&sig=p8bKMxE4Mgi7QvkI8sd_r0BHx4A#v=onepage&q=clark%20surfing%20uncertainty&f=false"> 
      Surfing Uncertainty</a>, 2015
    </li>
    <li style="font-size: small">
      M. Mirolli and D. Parisi - <a style="text-decoration:none" href="https://core.ac.uk/download/pdf/37835593.pdf"> 
      Towards a Vygotskyan Cognitive Robotics: The Role of Language as a Cognitive Tool</a>, 2011
    </li>
  </ul>




