# Release Notes

## v0.3.5 - 2018/08/31

* Ammo

The concept of ammunition is now part of the engine. Ammo does not do anything yet, but the game is able to display how much you have for the currently selected weapon. Which would be much more useful if the player was actually able to select a weapon... and use their ammo! It will come in due time.

## v0.3.4 - 2018/08/30

* Keys and Weapon Slots

Look alive people! There are now door key icons (card or skull, of course) as well as wepaon slots that light up when the player owns the right weapon on the status bar.

What better opportunity than this one to add more of the famous Doom cheatcodes to the game logic. They make testing easier, for sure.

I wonder if debugging is the reason why the IDKFA and IDFA cheats exist in the first place...

## v0.3.3 - 2018/08/29

* Armor!

Same as health, we now display the armor percentage of the player. It's useless for now, but it's displayed and will come handy in the future. I've changed the methodology used to draw the status bar: we now have a CSS grid, which seems to work pretty well for this case. Booya!

## v0.3.2 - 2018/08/28

* Health

Technically, the player has health now. It can't be modified, it does not really do anything, except for changing how the mug shot looks, but it's there, and it's drawn on the status bar. Nice!

## v0.3.1 - 2018/08/27

* Mugshot

We can now see doomguy's beautiful face while he's roaming hell. He will take a look on the left, on the right, straight ahead, check again on the right, and so on... randomly. Depending on his health, we will see more or less blood. Also, we have god mode (or should I say degreelessness mode?) and a death state.

## v0.3.0 - 2018/08/26

* Time to move to v0.3!

Yes, I think that it's time to bump the version of this project, as things are starting to take shape. We have a music/sfx engine, enemies with walk animations for multiple angles, a little bit of artificial intelligence, a whole collection of wall textures to draw from freely, a cool automap, some debug functionalities, and status messages that display at the top of the screen.

Latest addition: Now, the automap will always keep the best ratio possible, so that every wall on the map looks like a square, as it should, and not a rectangle if the screen's ratio is not 1:1. Very satisfactory!

## v0.2.11 - 2018/08/25

* Playlist mode

Here is what's new: When playlist mode is ON, the music engine will play a different song at the end of the current song. When playlist mode is OFF, the same song will loop over and over again. Neat, eh?

I guess this will not really make a difference in the final version of the game, since Doom does not do that in its original version (source ports probably allow it, though). The real difference for me is that when I'm debugging the engine, I won't be listening to the same song all the time! And that's what matters :P 

## v0.2.10 - 2018/08/24

* Automap Grid

Alright, we now have a grid on the automap to have a better view of the level layout. Bonus: You can now change the colors used to draw the map. Yay!

## v0.2.9 - 2018/08/23

* Chasing the player

Something very iconic about Doom is the way the enemies behave: Once they are awake, they walk in the general direction of the player, and wander from time to time by taking a steep turn or go in the opposite direction for a few steps, while emitting guttural growling sounds.

I've just written a rudimentary copy of this behavior, where the enemies seem to follow you, but they also sometimes get distracted for a second or two.

Much more fun than having these guys just run blindly towards you like a huge magnet, right?.

## v0.2.8 - 2018/08/22

* Sprite angles

The engine is now capable of handling different sprite angles when the player looks at enemies. However, the enemies always lock in towards the player so you will not get to see these different-angle sprites yet. Just a matter of time before I enhance the AI and show the backs and sides of our favorite zombiemen.

# v0.2.7 - 2018/08/21

* Walk animations (mirrored frames, mirrored angles, reversed angles, and other fun things)

I've added the less-straightforward walk animations for the Spider Mastermind, the Archvile, and so on. It was a very interesting dive into how id Software found amazing shortcuts to avoid drawing so many enemy sprites! Pretty cool.

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