# Vanilla Doom vs JavaScript Doom

The original Doom engine is full of bugs (or features, depending on how you look at it) and odd behaviors.

This project aims to be as close as possible to how the original game works. To recreate the experience, I mostly rely on my memory of how the original game plays, my examination of the source code as it was released in 1997, and the behavior of modern ports of the game (Chocolate Doom, GZDoom). However, the engine at the core of this project is written in a language (JavaScript) than differs from the original game engine (C).

As a consequence, the game experience recreated by this project might differ from the original Doom. In order to rectify these differences, I list them below as they occur during the development of this app.

## List of differences between the JavaScript engine and the Doom engine

### Queue up next weapon while switching weapon

In Doom, if you select a weapon and then select another weapon while switching to that first weapon, the engine will queue up that last selected weapon and will transition to it as soon as it is done transitioning to the first selected weapon.

This difference has a huge impact on the gameplay and I feel like it is important to make sure that the JavaScript engine does the same thing.

Difference observed on the Chocolate Doom port.

### Slot 8, Slot 1 and Berserk

In Doom, slot 8 switches the player's weapon to the chainsaw (if available). This slot does *not* offer the option to select the fist.

Moreover, when the player picks up the chainsaw, the fist becomes unavailable on slot 1 until the player picks up a berserk pack.

This berserk-specific behavior might look like a big constraint but at least it makes a lot of sense: Once you have the chainsaw, there's pretty much no point to switch back to the fist, unless you have picked up a berserk pack.

It feels like it would be good to implement this idiosyncracy to the JavaScript engine, in order to be closer to the original game. However, I can see how not obfuscating the fist on slot 1 at any point seems to make more sense for a modern player.
