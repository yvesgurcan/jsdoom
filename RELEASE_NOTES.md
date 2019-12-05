# Release Notes

## v0.6.0 - 2019/12/04

It's been over a year. It was time to give this project a little love:

-   Updated dependencies.
-   Removed the Node server.
-   Set up Prettier.
-   Add Service Worker.

## v0.5.3 - 2018/10/12

-   "Color Map"

I'm pretty proud of this one. I've added this lightly flash that happens on your screen when you pick up items on the ground. I feel like I'm already there--at the point where this project is exactly like Doom :)

Also, health and armor items now do provide armor and health to the player, as they should.

## v0.5.2 - 2018/10/10

-   Items

What would be Doom without items to pick up? Well, it would be pretty boring. So, here they are. They actually can not be picked up yet, but at least they animate :)

## v0.5.1 - 2018/10/07

-   Refactoring, collisions, and automap

Since I started writing the Wolfenstein/Doom engine in JavaScript, I've learnt a lot about what it takes to create a game engine. Thankfully, I didn't have to start from scratch, thanks to [this article](https://dev.opera.com/articles/3d-games-with-canvas-and-raycasting-part-1). Partially rewriting the code from the get go allowed me to build on this great foundation. Also, I felt that using Redux to manage the state of the engine was an important move. However, as I added more and more features in order to have this project resemble the original games more closely, I got a better understanding of the code I used as a basis. Therefore, it was time to refactor. As a result, I got rid of a good chunk of code and harmonized how different parts of the engine work. HUGE WIN!

Also, as I am slowly introducing a new category of things in the game (items that can be picked up), I took the time to review how the logic for collision detection works: I introduced the possiblity to have things of different sizes in the engine. Tada!

And I realized that the automap had some inconsistencies that bothered me. Fixed too :)

## v0.5.0 - 2018/10/06

-   Playable on mobile

Since I started this project, I secretly dreamt of making the game playable on my tablet. It took me a few months but it is now possible :)

Unfortunately, it does not seem that smaller devices handle the engine as well as laptops and desktop computers do. As a consequence, any movement on a mobile makes the framerate drop vertiginously. I guess my table is not top of the line, so this might not be a problem on the most recent devices. I'll take a look later on how to improve performances for machines with less CPU power.

## v0.4.9 - 2018/10/05

-   Ammo

Another little improvement: Ammunition is now subtracted from your ammo count as you fire. And the engine checks your ammo count, so no more infinite firing!

## v0.4.8 - 2018/09/30

-   Weapon sounds

Here we are! Those weapon not only animate now but they also make the appropriate sound as the player is firing away. With a little effort, it was possible to recreate the original feel of the super shotgun reloading phase.

I also added a little logic in order to adjust how much time each weapon takes to be ready to fire again.

## v0.4.7 - 2018/09/30

-   Can't change weapon while animating

There was a little oddity going on with the weapons. As soon as you stopped holding the fire key, the weapon animation stopped and was replaced by the idle frame. No, no, no! The animation has to complete! And now it does. Also, until the animation has finished, it is not possible to switch weapons. Just like in the original game. Yay!

## v0.4.6 - 2018/09/29

-   Weapon firing animations

I'm taking little steps towards having weapons fully implemented. I added the necessary code to animate the weapons when pressing the firing key (aka Control or a click on the mouse). It's still missing the flash overlay, the positioning of the sprites is not correct, and it does not take the ammo away. But it's still good progress :)

## v0.4.5 - 2018/09/29

-   Keep it in the 30s

I did it! I found the issue that was slowing down the engine tremendously after a few minutes of gameplay. I had an idea on what part of the engine was to be blamed but the actual problem proved to be a little bit different from what I expected. Basically, there was a function supposed to clear sprites that was horrible performance-wise and was actually not doing anything useful! The fix was as simple as commenting out the function. But I couldn't help refactor the mess related to rendering decorations and enemies. I ended up with cleaner code and a framerate that satisfyingly stays around 30 fps instead of dropping to insane numbers like it used to. Yay!

Bonus: No more useless updates to the DOM for invisible sprites.

## v0.4.4 - 2018/09/29

-   Figuring out the FPS mess

A major issue I have with this project is the fact that the framerate goes down very quickly after the engine is running for a few minutes. It's very bad, really, because the game becomes unplayable at that point. I've noticed that problem a while ago but I was not sure how to tackle the issue. Well, from now on, it is possible to get a snapshot in the console of the framerate every second. With a simple color code and a timestamp, I get a little more insight into where and how it's going wrong, which should hopefully help me debug the code and see what is sucking the life out of the engine.

Fingers crossed.

## v0.4.3 - 2018/09/21

-   Decorations

The engine was drawing all decorations (barrels, pillars, etc.) as if they were all of the same height and width. This is now fixed and, with a little (too much) magic (ie, magic numbers), we have a more coherent world where small items are small and big items are big. Makes sense, right?

## v0.4.2 - 2018/09/08

-   Weapon idle animations

The chainsaw is a special weapon in Doom. It's the only weapon that is animated when you are not actively using it to destroy some demons. Moreover, it makes a very distinctive idling sound as well as a beautiful revving sound.

Of course, I had to write some code in order to make sure that our beloved weapon does it all. There's only one thing left to do now... Let's find some meat!

## v0.4.1 - 2018/09/08

-   Lower and raise weapons

It was a little sad to switch weapons without transitions. Guess what? When you select a different weapon, the weapon will now amazingly lower and the next weapon will raise. Magic!

Just like in Doom, the transition is very much blocking -- you can't fire your weapon when you are switching weapons. However, the behavior differs slightly from the original Doom. Basically, if you happen to select another weapon while you are already transitioning to the next weapon, Doom will queue up that other weapon and transition to that one as soon as the engine is done rendering the current transition. To keep track of this discrepancy and others with the original game, I created a [document that list differences with the Doom engine](VANILLA.md).

Also, the player can not select a weapon they don't own anymore. Better hide this BFG now.

## v0.4.0 - 2018/09/07

-   Switching weapons

We're moving up in the world. Version 0.4, because the status bear is done and we are moving to more complex stuff, such as... weapons! It is now possible to change your current weapon by pressing a number between 1 and 7. The image changes abruptly, and the engine does not check if you actually own the weapon, but it's a good start!

## v0.3.7 - 2018/09/04

-   Weapon sprites

I guess this update is not as complete as the previous ones, as the freshly added weapon sprites really do nothing. At least it's getting some boilerplate out of the way and helps me think about what approach I need to take to tackle all the weapon animations.

Meanwhile, I also tried to keep the size of the status bar decent so that it won't take up too much real estate on the screen, whatever the resolution is. Conversely, the status bar won't go too small either as to still be legible-ish at a minimum.

But what I really need to figure out now is how to keep a good height/width ratio for the weapon sprite so that it displays consistently no matter what.

## v0.3.6 - 2018/09/02

-   Status bar is ready

Here we are, with a full-blown Doom status bar. Finally, players will have the opportunity to immerse themselves in the game by checking doomguy's healh, armor, wepaons, ammo, and keys as they are dodging bullets from the enemies. Well, the engine is not quite ready for the monsters to attack but, eh, at least they're chasing you!

Who knows what will come next for version 0.4?...

...Probably some weapon sprites. With amazing animations.

Indeed.

## v0.3.5 - 2018/08/31

-   Ammo

The concept of ammunition is now part of the engine. Ammo does not do anything yet, but the game is able to display how much you have for the currently selected weapon. Which would be much more useful if the player was actually able to select a weapon... and use their ammo! It will come in due time.

## v0.3.4 - 2018/08/30

-   Keys and Weapon Slots

Look alive people! There are now door key icons (card or skull, of course) as well as wepaon slots that light up when the player owns the right weapon on the status bar.

What better opportunity than this one to add more of the famous Doom cheatcodes to the game logic. They make testing easier, for sure.

I wonder if debugging is the reason why the IDKFA and IDFA cheats exist in the first place...

## v0.3.3 - 2018/08/29

-   Armor!

Same as health, we now display the armor percentage of the player. It's useless for now, but it's displayed and will come handy in the future. I've changed the methodology used to draw the status bar: we now have a CSS grid, which seems to work pretty well for this case. Booya!

## v0.3.2 - 2018/08/28

-   Health

Technically, the player has health now. It can't be modified, it does not really do anything, except for changing how the mug shot looks, but it's there, and it's drawn on the status bar. Nice!

## v0.3.1 - 2018/08/27

-   Mugshot

We can now see doomguy's beautiful face while he's roaming hell. He will take a look on the left, on the right, straight ahead, check again on the right, and so on... randomly. Depending on his health, we will see more or less blood. Also, we have god mode (or should I say degreelessness mode?) and a death state.

## v0.3.0 - 2018/08/26

-   Time to move to v0.3!

Yes, I think that it's time to bump the version of this project, as things are starting to take shape. We have a music/sfx engine, enemies with walk animations for multiple angles, a little bit of artificial intelligence, a whole collection of wall textures to draw from freely, a cool automap, some debug functionalities, and status messages that display at the top of the screen.

Latest addition: Now, the automap will always keep the best ratio possible, so that every wall on the map looks like a square, as it should, and not a rectangle if the screen's ratio is not 1:1. Very satisfactory!

## v0.2.11 - 2018/08/25

-   Playlist mode

Here is what's new: When playlist mode is ON, the music engine will play a different song at the end of the current song. When playlist mode is OFF, the same song will loop over and over again. Neat, eh?

I guess this will not really make a difference in the final version of the game, since Doom does not do that in its original version (source ports probably allow it, though). The real difference for me is that when I'm debugging the engine, I won't be listening to the same song all the time! And that's what matters :P

## v0.2.10 - 2018/08/24

-   Automap Grid

Alright, we now have a grid on the automap to have a better view of the level layout. Bonus: You can now change the colors used to draw the map. Yay!

## v0.2.9 - 2018/08/23

-   Chasing the player

Something very iconic about Doom is the way the enemies behave: Once they are awake, they walk in the general direction of the player, and wander from time to time by taking a steep turn or go in the opposite direction for a few steps, while emitting guttural growling sounds.

I've just written a rudimentary copy of this behavior, where the enemies seem to follow you, but they also sometimes get distracted for a second or two.

Much more fun than having these guys just run blindly towards you like a huge magnet, right?

## v0.2.8 - 2018/08/22

-   Sprite angles

The engine is now capable of handling different sprite angles when the player looks at enemies. However, the enemies always lock in towards the player so you will not get to see these different-angle sprites yet. Just a matter of time before I enhance the AI and show the backs and sides of our favorite zombiemen.

## v0.2.7 - 2018/08/21

-   Walk animations (mirrored frames, mirrored angles, reversed angles, and other fun things)

I've added the less-straightforward walk animations for the Spider Mastermind, the Archvile, and so on. It was a very interesting dive into how id Software found amazing shortcuts to avoid drawing so many enemy sprites! Pretty cool.

## v0.2.6 - 2018/08/21

-   Enemy walking sounds

Enemies can now emit a sound at fixed/random interval while they are chasing the player. Totally sets the mood :)

## v0.2.5 - 2018/08/20

-   Walk animations

Enemies now animate when they chase you! We have a chaingunner, a cybie, and a SS. The other enemies' animations are slightly less straightforward, so it will take me a little longer to get these working. The peeps at id Software were smart enough to mirror the enemies' animations in order to save them from drawing all the sprites. However, my little engine (that could) is not smart enough to handle angles yet, so I'll have to be clever as well in order to make sure that the sprites make it all the way to the renderer even if the filenames are not as predictable as with our good old SSes.

Now that we have walking enemies, it's pretty cool, if you ask me. Makes it all more real. Yet, the engine right now feels more like a very alpha of Doom than the actual game when it was released to the public.

## v0.2.4 - 2018/08/19

-   Change song

You can now randomly play a new song by pressing `M` on your keyboard. I won't get bored of hearing the same song 10 times in a row, now :P

## v0.2.3 - 2018/08/19

-   The game can now be paused

Because it will be very useful for debug, the game is now pauseable!

## v0.2.2 - 2018/08/18

-   We have better logging

Now that displaying messages at the top of the screen works, it was time to make sure that these messages get deleted logically. From now on, no more than 3 messages will be displayed at once, and they will all consistently be displayed for 3 seconds each (unless they were pushed out of the queue because they were the 4th message). It's pretty neat :)

## v0.2.1 - 2018/08/18

-   We have logging

The engine is now able to log messages at the top of the screen. The frame rate is now aligned with the right side of the screen.

Also, the color of both the frame rate and messages is red by default but will turn orange when viewing the automap.

## v0.2.0 - 2018/08/18

-   We have a music engine!

The engine will now start a random song from Doom or Doom II to give the game some atmosphere. For Chrome-specific reasons, the song will only start playing on the first click on the page.
