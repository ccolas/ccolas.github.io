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