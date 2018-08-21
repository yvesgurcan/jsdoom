# Release Notes

# v0.2.6 - 2018/08/21

* Enemy walking sounds

Enemies can now emit a sound at fixed/random interval while they are chasing the player. Totally sets the mood :)

## v0.2.5 - 2018/08/20

* Walk animations

Enemies now animate when they chase you! We have a chaingunner, a cybie, and a SS. The other enemies' animations are slightly less straightforward, so it will take me a little longer to get these working. The peeps at id Software were smart enough to mirror the enemies' animations in order to save them from drawing all the sprites. However, my little engine (that could) is not smart enough to handle angles yet, so I'll have to be clever as well in order to make sure that the sprites make it all the way to the renderer even if the filenames are not as predictable as with our good old SSes.

Now that we have walking enemies, it's pretty cool, if you ask me. Makes it all more real. Yet, the engine right now feels more like a very alpha of Doom than the actual game when it was released to the public.

## v0.2.4 - 2018/08/19

* Change song

You can now randomly play a new song randby pressing `M` on your keyboard. I won't get bored of hearing the same song 10 times in a row, now :P

## v0.2.3 - 2018/08/19

* The game can now be paused

Because it will be very useful for debug, the game is now pauseable!

## v0.2.2 - 2018/08/18

* We have better logging

Now that displaying messages at the top of the screen works, it was time to make sure that these messages get deleted logically. From now on, no more than 3 messages will be displayed at once, and they will all consistently be displayed for 3 seconds each (unless they were pushed out of the queue because they were the 4th message). It's pretty neat :)

## v0.2.1 - 2018/08/18

* We have logging

The engine is now able to log messages at the top of the screen. The frame rate is now aligned with the right side of the screen.

Also, the color of both the frame rate and messages is red by default but will turn orange when viewing the automap.

## v0.2.0 - 2018/08/18

* We have a music engine!

The engine will now start a random song from Doom or Doom II to give the game some atmosphere. For Chrome-specific reasons, the song will only start playing on the first click on the page.