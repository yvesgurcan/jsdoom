# How enemey sprites work

## Filenames

### Single-animation pattern

Image filenames follow a specific pattern:

```
TROOB1
```

Where:
* `TROO` is the `PREFIX` for the Imp.
* `B` is the second walking/idle `FRAME`.
* `1` is the front-facing `ANGLE`.

Pattern:

```
${PREFIX}${FRAME}${ANGLE}
```

### Frames and animations

A `FRAME` is always a letter. The letters used to define all the frames of a single enemey are consecutive (from `A` to `Z`, without any gap).

When grouped, these frames make an animation. Each enemy has its own set of animations, such as walking, range attack, melee attack, pain, death, gib death, etc.

Each enemy animation can consist of a variable number of frames, which makes it hard to predict which letter corresponds to which animation.

For example, here is the breakdown of the animations of the Shotgun Guy (where the `PREFIX` is `SPOS`):
* Walking: `A`-`D` (4 frames).
* Range Attack: `E`-`F` (2 frames).
* Death: `G`-`L` (6 frames).
* Gib Death: `M`-`U` (9 frames).

Compare to the breakdown of the animations of the Spider Mastermind (where the `PREFIX` is `SPID`):

* Walking: `A`-`F` (6 frames).
* Range Attack: `G`-`H` (2 frames).
* Pain: `I` (1 frame)
* Death: `J`-`S` (6 frames).

The `G` `FRAME` of `SPOS` is part of its death animation, whereas the same `FRAME` for `SPID` is part of the range attack animation.

Enemies also have an idle animation, which is programatically defined as a loop of the `A` and `B` frames (ie, the two first frames of the walk animation).

Note that death animations do not support different angles, which is represented by the usage of `0` (zero) in the filename of these animations. The `0` `ANGLE` is always front-facing.

**The number of frames as well as the letter of the starting and ending frame of each animation should be defined in the JSON object where enemies are listed.**

### Prefix

The `PREFIX` is always 4-character long. It is used to identify all the animations of a specific enemey.

The `PREFIX` can include numbers, which can be a little confusing:

```
BOS2E3
```

The example above represents the `E` `FRAME` of the `BOS2` enemy (also known as the Hell Knight). In this case, the `2` in `BOS2` is used to differentiate this animation from `BOSSE3`, which is a `FRAME` belonging to the Baron of Hell.


### Mirrored pattern

#### Mirrored angles

Sometimes, the same image is used for two different `ANGLE` values:

```
${PREFIX}${FRAME}${ANGLE1}${FRAME}${ANGLE2}
```
Example:

```
TROOA2A8
```

In this case, the `PREFIX` of the animation is `TROO` (the Imp). The name of the file tells us that this image is used for both `ANGLE` `2` (front-facing left) and `8` (front-facing right) of `FRAME A` (first walk animation).

**Filenames which follow this convention are automatically mirrored when displaying `ANGLE2`.**

Sprites following this convention do not have any second `FRAME` or `ANIMATION` on `ANGLE1` and `ANGLE5`.

See the revenant's first walking `FRAME` for example:

```
SKULA1

```

#### Mirrored frames

In addition to `ANGLE1` and `ANGLE2`, `FRAME1` and `FRAME2` can also be different. 

Pattern:
```
${PREFIX}${FRAME1}${ANGLE1}${FRAME2}${ANGLE2}
```

For example:

```
BOS2A3C7
```

In this case, the `PREFIX` of the animation is `BOS2` (the Hell Knight). The name of the file tells us that this image is used for both `FRAME A` (first walk animation) of `ANGLE` `3` (left-facing) and `FRAME C` (third walk animation) of `ANGLE` `7` (right-facing).

**Filenames which follow this convention are automatically  mirrorred when displaying `FRAME2` `ANGLE2`. In fact, the second half of the animation is a mirrored repeat of the first half.**

Sprites following this convention end up with a front-facing and rear-facing angle that merely repeats the same frame for the second part of the animation. See the example of the Archvile:

```
VILEA5D5
```

#### Mix-and-match

Certain sprites use both the mirrored angle convention and the mirrored frames convention for the same `FRAME`.

Here is the first `FRAME` `ANGLE` of the walk animation of the Spider Mastermind:

```
SPIDA1D1
```

And here is the second `ANGLE` of the first `FRANE`  of its walk animation:

```
SPIDA2A8
```

**Filenames which follow this convention use both repeated frames for the second half of the animation on specific angles (`1` and `5`) as well as mirrored angle on the same `FRAME`**