import { ANGLE_DIFF } from './constants';
import getElementById from './util/getElementById';
import convertLetterToNumber from './util/convertLetterToNumber';
import convertNumberToLetter from './util/convertNumberToLetter';
import convertRadianToDegree from './util/convertRadianToDegree';

const getSpriteAngle = angle => {
    let spriteAngle = 1;
    if (angle > 45 - ANGLE_DIFF && angle < 45 + ANGLE_DIFF) {
        spriteAngle = 4;
    } else if (angle > 135 - ANGLE_DIFF && angle < 135 + ANGLE_DIFF) {
        spriteAngle = 2;
    } else if (angle > 90 - ANGLE_DIFF && angle < 90 + ANGLE_DIFF) {
        spriteAngle = 3;
    } else if (angle > 0 - ANGLE_DIFF && angle < 0 + ANGLE_DIFF) {
        spriteAngle = 5;
    } else if (angle > -45 - ANGLE_DIFF && angle < -45 + ANGLE_DIFF) {
        spriteAngle = 6;
    } else if (angle > -90 - ANGLE_DIFF && angle < -90 + ANGLE_DIFF) {
        spriteAngle = 7;
        // calculations are getting slightly weird here... is it really a 360 rotation!? I think there might be something wrong with the converter in utils
    } else if (angle > 235 - ANGLE_DIFF || angle < 135 + ANGLE_DIFF) {
        spriteAngle = 8;
    }
    return spriteAngle;
};

const getMirroredFrame = (walkFrame, delimiter) => {
    if (walkFrame < delimiter) {
        return convertNumberToLetter(walkFrame + delimiter - 1);
    }
    return convertNumberToLetter(walkFrame - delimiter + 1);
};

const getOppositeAngle = spriteAngle => {
    if (spriteAngle === 1) {
        return 1;
    }
    return 10 - spriteAngle;
};

const getMirroredFrameFilename = (
    walkFrame,
    frame,
    spriteAngle,
    delimiter,
    prefix
) => {
    const oppositeFrame = getMirroredFrame(walkFrame, delimiter);
    const oppositeAngle = getOppositeAngle(spriteAngle);
    if (walkFrame < delimiter) {
        return `${prefix}${frame}${spriteAngle}${oppositeFrame}${oppositeAngle}`;
    }
    return `${prefix}${oppositeFrame}${oppositeAngle}${frame}${spriteAngle}`;
};

const getMirroredAngleFilename = (
    frame,
    spriteAngle,
    prefix,
    reversedAngles = false
) => {
    const oppositeAngle = getOppositeAngle(spriteAngle);
    // console.log({ spriteAngle, oppositeAngle })
    if (spriteAngle === 1 || spriteAngle === 5) {
        return `${prefix}${frame}${spriteAngle}`;
    }
    if (
        (reversedAngles && spriteAngle > 5) ||
        (!reversedAngles && spriteAngle < 5)
    ) {
        return `${prefix}${frame}${spriteAngle}${frame}${oppositeAngle}`;
    }
    return `${prefix}${frame}${oppositeAngle}${frame}${spriteAngle}`;
};

export default (state, sprites, spriteTypes, spriteCategory) => {
    const {
        constants: { IMG_EXT, ENEMY_PATH, ITEM_PATH },
        player,
        view: { screenHeight, screenWidth, viewDist },
        automap: { showAutomap }
    } = state;

    if (showAutomap) {
        return false;
    }

    for (let i = 0; i < sprites.length; i++) {
        const sprite = { ...sprites[i] };
        const img = getElementById(sprite.id);

        // translate position to viewer space
        const dx = sprite.x - player.x;
        const dy = sprite.y - player.y;

        // distance to sprite
        const dist = Math.sqrt(dx * dx + dy * dy);

        // sprite angle relative to viewing angle
        const angle = Math.atan2(dy, dx) - player.rot;

        // size of the sprite
        const naturalHeight = img.naturalHeight;
        const naturalWidth = img.naturalWidth;

        const size = viewDist / (Math.cos(angle) * dist);
        const height =
            (viewDist / (Math.cos(angle) * dist)) * (naturalHeight / 52);
        const width =
            (viewDist / (Math.cos(angle) * dist)) * (naturalWidth / 52);

        const heightOffset = viewDist / (Math.cos(angle) * dist) - height;

        // not visible
        if (size <= 0) {
            if (img.style.display !== 'none') {
                sprite.visible = false;
                img.style.display = 'none';
            }
            /* eslint-disable-next-line */
            continue;
        }

        if (img.style.display !== 'block') {
            sprite.visible = true;
            img.style.display = 'block';
        }

        if (spriteCategory === 'items') {
            const { type } = sprite;
            const spriteType = { ...spriteTypes[type] };
            const { endFrame, prefix } = spriteType;
            if (endFrame) {
                const endFrameNumber = convertLetterToNumber(endFrame) + 1;
                const animationFrame =
                    Math.floor(
                        (new Date() % (endFrameNumber * 250)) /
                            ((endFrameNumber * 250) / endFrameNumber)
                    ) + 1;
                const newFrameLetter = convertNumberToLetter(animationFrame);
                img.src = `${ITEM_PATH}/${prefix}${newFrameLetter}0${IMG_EXT}`;
            }
        }

        if (spriteCategory === 'enemies') {
            const { type, speed, rot, walkFrame } = sprite;

            const spriteType = { ...spriteTypes[type] };
            const {
                prefix,
                walk: {
                    start,
                    count,
                    mirroredAngles,
                    reversedAngles,
                    mirroredFrames,
                    mirroredFramesAnglesNotShared
                }
            } = spriteType;

            const enemyAngle = convertRadianToDegree(rot);
            const angleToPlayer =
                convertRadianToDegree(Math.atan2(dy, dx)) - enemyAngle;
            const spriteAngle = getSpriteAngle(angleToPlayer);

            // update sprite
            if (speed !== 0) {
                const offset = convertLetterToNumber(start);
                const frame = convertNumberToLetter(walkFrame + offset);

                // sprite uses mirrored frames+angles for the second half of the animation (A1D1, A2D8, A3D7, A4D6, A5D5, A6D4, A7D3, A8D2)
                if (
                    mirroredFrames ||
                    (mirroredFramesAnglesNotShared &&
                        (spriteAngle === 1 || spriteAngle === 5))
                ) {
                    const delimiter = count / 2 + 1;
                    const filename = getMirroredFrameFilename(
                        walkFrame,
                        frame,
                        spriteAngle,
                        delimiter,
                        prefix,
                        mirroredFramesAnglesNotShared
                    );
                    img.src = `${ENEMY_PATH}/${prefix}/${filename}${IMG_EXT}`;
                    if (walkFrame < delimiter) {
                        img.style.transform = 'scaleX(1)';
                    } else {
                        img.style.transform = 'scaleX(-1)';
                    }
                    // sprite uses mirrored angles for the same frame and mirrored frames on angle 1 and 5 (A1D1, A2A8, A3A7, A4A6, A5D5)
                    // or sprite uses mirrored angles for the same frame (A1, A2A8, A3A7, A4A6, A5)
                } else if (mirroredFramesAnglesNotShared || mirroredAngles) {
                    const filename = getMirroredAngleFilename(
                        frame,
                        spriteAngle,
                        prefix,
                        reversedAngles
                    );
                    img.src = `${ENEMY_PATH}/${prefix}/${filename}${IMG_EXT}`;
                    if (
                        (reversedAngles && spriteAngle > 5) ||
                        (!reversedAngles && spriteAngle < 5)
                    ) {
                        img.style.transform = 'scaleX(1)';
                    } else {
                        img.style.transform = 'scaleX(-1)';
                    }
                    // regular sprite (A1, A2, A3, A4, A5, A6, A7, A8)
                } else {
                    img.src = `${ENEMY_PATH}/${prefix}/${prefix}${frame}${spriteAngle}${IMG_EXT}`;
                }
            }
        }

        // x-position on screen
        const x = Math.tan(angle) * viewDist;

        img.style.left = `${screenWidth / 2 + x - width / 2}px`;

        // y is constant since we keep all sprites at the same height and vertical position
        img.style.top = `${screenHeight / 2 -
            height / 3 +
            heightOffset / 1.5}px`;

        img.style.width = `${width}px`;
        img.style.height = `${height}px`;

        const dbx = sprite.x - player.x;
        const dby = sprite.y - player.y;
        const blockDist = dbx * dbx + dby * dby;
        img.style.zIndex = -Math.floor(blockDist * 1000);
    }
};
