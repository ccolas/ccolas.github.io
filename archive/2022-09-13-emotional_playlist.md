---
title: 'Emotional Playlist'
date: 2022-09-13 00:00:00
description: A Spotify application that generates customized playlists based on emotional dimensions and musical preferences.
featured_image: '/images/projects/emotional_playlist/image.png'
---

<img class="image" src="/images/projects/emotional_playlist/image.png" style="width:80%; max-width:700px; margin:0 auto; display:block;" alt="Emotional Playlist interface showing mood controls"/>
<p class="legend">
<i>The Emotional Playlist interface with controls for valence, energy, and danceability</i></p>

<center>
<a href="https://huggingface.co/spaces/ccolas/EmotionPlaylist" class="btn">Demo</a>
</center>

_The app is currently in development mode. To try it, send me an email with your name and Spotify email address so I can add you to the user list._

<br>

### Music Through the Lens of Emotion

Music has always been one of our most powerful tools for emotional expression and regulation. Whether we're seeking to amplify our current mood, shift to a different emotional state, or find sounds that resonate with specific feelings, the right playlist can make all the difference. But finding music that precisely matches our desired emotional state often requires significant time and effort.

What if we could directly shape our musical experience based on emotional parameters rather than just artists, genres, or song titles?

### The Emotional Dimensions of Music

The [Spotify API](https://developer.spotify.com/) offers a fascinating window into how music can be quantified along emotional dimensions. For each track in its vast library, Spotify provides computed audio features including three key parameters that map directly to emotional experience:

- **Valence**: Represents musical positivity (from sad/negative to happy/positive)
- **Energy**: Captures intensity and activity (from calm/relaxed to frantic/intense)
- **Danceability**: Reflects rhythmic stability and regularity (correlating with the emotional dimension often called "controllability" or "dominance")

These three dimensions create a comprehensive emotional space in which any piece of music can be positioned. This three-dimensional model aligns with psychological research on emotion, which often describes feelings along similar axes.

### The Emotional Playlist Application

Leveraging these emotional dimensions, I've built [Emotional Playlist](https://huggingface.co/spaces/ccolas/EmotionPlaylist), an application that gives users intuitive control over the emotional character of their music recommendations.

The app works by:

1. Taking a **music source** as input (your playlists, liked songs, or other collections)
2. Allowing selection of specific **genres** represented in that source
3. Providing sliders to set target values for **valence**, **energy**, and **danceability**
4. Including an **exploration slider** that controls the balance between familiar tracks and new discoveries

Behind the scenes, the app analyzes your source music to understand your preferences, then uses Spotify's recommendation engine to find tracks that match your specified emotional parameters while staying within your genre preferences and exploration comfort zone.

### Crafting Your Perfect Mood

The power of Emotional Playlist lies in its flexibility. You can:

- Create a high-energy, positive playlist for workout motivation
- Design a low-energy, mid-valence collection for focused work
- Develop a highly danceable, positive set for social gatherings
- Curate a low-energy, low-valence playlist for introspective moments

The exploration slider adds another dimension to your control. At 0%, you'll get only tracks from your source playlists that best match your emotional targets. At 100%, you'll receive entirely new recommendations shaped by your source music's distribution but matching your specified mood.

#### Example: Jazz Mood

As a demonstration, I created [_Jazz mood_](https://open.spotify.com/playlist/6YoQ2sDN7hSrdm15WXLyRs), a playlist built using two of my existing playlists as sources. I selected jazz as the only genre, set the emotional parameters to _Valence: 93%, Energy: 20%, Danceability: 72%_, and set exploration to 100%.

The result is a collection of upbeat yet relaxed jazz pieces—all new discoveries that weren't in my source playlists, but which match the emotional profile I was seeking. The source playlists influenced the recommendations by establishing my taste profile, but the emotional parameters guided the specific track selection.

<br>

<center>
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6YoQ2sDN7hSrdm15WXLyRs?utm_source=generator" width="80%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</center>

<br>

### The Future of Emotion-Driven Music Discovery

This project represents just the beginning of what's possible with emotion-based music curation. Future developments could include:

- Temporal emotional arcs, creating playlists that guide listeners through emotional journeys
- Integration with biometric data to suggest music matching your current physiological state
- Collaborative mood playlists where multiple users can contribute to a shared emotional target
- Analysis of lyrical content alongside audio features for more nuanced emotional matching

By making the emotional dimensions of music explicit and controllable, we can develop more intentional relationships with our listening habits and discover new artists and tracks that speak to our emotional needs in ways we might never have found through traditional browsing.

<br>

<center>
<a href="https://huggingface.co/spaces/ccolas/EmotionPlaylist" class="btn">Try Emotional Playlist</a>
</center>


---
title: 'Emotional Playlist'
date: 2022-09-13 00:00:00
description: A Spotify App for Customized Playlist Generation.
featured_image: '/images/projects/emotional_playlist/image.png'
---

<img class="image" src="/images/projects/emotional_playlist/image.png" width="80%" alt=""/>
<p class="legend">
<i></i></p>

<center>
<a href="https://huggingface.co/spaces/ccolas/EmotionPlaylist" class="btn">Demo</a>
</center>

_The app is currently in development mode.  To try it, send me an email with your name and spotify email address so I can add you to the user list._

<br>

The [Spotify API](https://developer.spotify.com/) lets anyone access information about users, playlists, artists and tracks.
In particular, it offers access to precomputed audio features such as _valence_, _energy_ and _danceability_. Valence and energy directly maps to 
their respective use in the description of emotions, whereas danceability seem correlated to the third emotional dimension often called _controlability_ or _dominance_.

I've had a few ideas on how to improve the Spotify experience for some time, so I decided to build a simple app and test things out. 
The [Emotional Playlist](https://huggingface.co/spaces/ccolas/EmotionPlaylist) app lets you build playlists by presenting a source of music (e.g. a list of playlists you may like)
and giving control over the genres, the mood and the level of exploration you might want. 

Among the genres represented in the playlist, you can pick the one you want. The target mood of the playlist is then customizable through 3 sliders for valence, energy and 
danceability.
Finally, the exploration slider lets you decide whether you only want songs from the music source (0 exploration), only new songs (100 exploration) or something in between.

Here is [_Jazz mood_](https://open.spotify.com/playlist/6YoQ2sDN7hSrdm15WXLyRs), a playlist built by using two of my playlists as music sources, selecting 
for jazz music only, a target mood _Valence: 93%, Energy: 20%, Danceability: 72%_ and cranking up exploration to 100% such that none of the songs can be found in the source 
playlists. With full exploration, the source playlists only shape the song distribution to orient spotify's recommendations. 

<br>

<center>
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6YoQ2sDN7hSrdm15WXLyRs?utm_source=generator" width="60%" height="380" frameBorder="0" 
allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</center>

<br>

<center>
<a href="https://huggingface.co/spaces/ccolas/EmotionPlaylist" class="btn">Demo</a>
</center>