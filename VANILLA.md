# Vanilla vs HTML5

The original Doom engine is full of bugs (or features, depending on how you look at it) and odd behaviors.

This project aims to be as close as possible to how the original game works. To recreate the experience, I mostly rely on my memory of how the game plays, my examination of the source code as it was released in 1997, and the behavior of modern ports of the game (Chocolate Doom, GZDoom). However, the engine at the core of this project is written in a language (JavaScript) than differs from the original game engine (C).

As a consequence, there might be aspects of the game experience recreated by this project that differ from the original Doom. In order to to rectify these differences, I list them below as they occur during the development of this app:

## List of differences between the JavaScript engine and the Doom engine

### Queue up next weapon while switching weapon

In Doom, if you select a weapon and then select another weapon while switching to that first weapon, the engine will queue up that last selected weapon and will transition to it as soon as it is done transitioning to the first selected weapon.

This difference has a huge impact on the gameplay and I feel like it is important to make sure that the JavaScript engine does the same thing.

Difference observed on the Chocolate Doom port.