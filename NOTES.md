# Release Notes


## v0.2.4 - 2018/08/19

* Change song (debug)

It's only available as a debug functionality, but you can now choose a new song randomly while playing. It helps: I won't get bored of hearing the same song 10 times in a row, now :P

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