import {
    fov,
    enemyPath,
    imgExt,
    ANGLE_DIFF,

} from '../constants';
import convertLetterToNumber from '../util/convertLetterToNumber';
import convertNumberToLetter from '../util/convertNumberToLetter';
import convertRadianToDegree from '../util/convertRadianToDegree';
import { getState } from '../store';

const getSpriteAngle = (angle) => {
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
    console.log({ angle, spriteAngle });
    return spriteAngle;
};

const getMirroredFrame = (walkFrame, delimiter) => {
    if (walkFrame < delimiter) {
        return convertNumberToLetter((walkFrame + delimiter) - 1);
    }
    return convertNumberToLetter((walkFrame - delimiter) + 1);
};

const getOppositeAngle = (spriteAngle) => {
    if (spriteAngle === 1) {
        return 1;
    }
    return 10 - spriteAngle;
};

const getMirroredFrameFilename = (walkFrame, frame, spriteAngle, delimiter, prefix) => {
    const oppositeFrame = getMirroredFrame(walkFrame, delimiter);
    const oppositeAngle = getOppositeAngle(spriteAngle);
    if (walkFrame < delimiter) {
        return `${prefix}${frame}${spriteAngle}${oppositeFrame}${oppositeAngle}`;
    }
    return `${prefix}${oppositeFrame}${oppositeAngle}${frame}${spriteAngle}`;
};

const getMirroredAngleFilename = (frame, spriteAngle, prefix, reversedAngles = false) => {
    const oppositeAngle = getOppositeAngle(spriteAngle);
    // console.log({ spriteAngle, oppositeAngle })
    if (spriteAngle === 1 || spriteAngle === 5) {
        return `${prefix}${frame}${spriteAngle}`;
    }
    if ((reversedAngles && spriteAngle > 5) || (!reversedAngles && spriteAngle < 5)) {
        return `${prefix}${frame}${spriteAngle}${frame}${oppositeAngle}`;
    }
    return `${prefix}${frame}${oppositeAngle}${frame}${spriteAngle}`;
};

export default () => {
    const {
        enemyMap: enemies,
        enemyTypes,
        player,
        view: {
            screenHeight,
            screenWidth,
            viewDist,
        },
        automap: { showAutomap },
    } = getState();

    if (showAutomap) {
        return false;
    }

	for (let i = 0; i < enemies.length; i++) {  
        const enemy = { ...enemies[i] };
        const {
            x,
            y,
            type,
            speed,
            rot,
            walkFrame,
            oldStyles,
            img,
        } = enemy;

        const enemyType = { ...enemyTypes[type] };
        const {
            prefix,
            walk: {
                start,
                count,
                mirroredAngles,
                reversedAngles,
                mirroredFrames,
                mirroredFramesAnglesNotShared,
            },
        } = enemyType;

        const dx = x - player.x;
        const dy = y - player.y;

        let angle = Math.atan2(dy, dx) - player.rot;


        if (angle < -Math.PI) angle += 2 * Math.PI;
        if (angle >= Math.PI) angle -= 2 * Math.PI;

        const outOfViewWithSafety = (fov / 2) + (fov * 0.5);
        const inFrontOfPlayer = angle > -outOfViewWithSafety && angle < outOfViewWithSafety;

        if (!inFrontOfPlayer) {
            return false;
        }

        const enemyAngle = convertRadianToDegree(rot);
        const angleToPlayer = convertRadianToDegree(Math.atan2(dy, dx)) - enemyAngle;
        const spriteAngle = getSpriteAngle(angleToPlayer);

        // update sprite
        if (speed !== 0) {
            const offset = convertLetterToNumber(start);
            const frame = convertNumberToLetter(walkFrame + offset);

            // sprite uses mirrored frames+angles for the second half of the animation (A1D1, A2D8, A3D7, A4D6, A5D5, A6D4, A7D3, A8D2)
            if (mirroredFrames || (mirroredFramesAnglesNotShared && (spriteAngle === 1 || spriteAngle === 5))) {
                const delimiter = (count / 2) + 1;
                const filename = getMirroredFrameFilename(walkFrame, frame, spriteAngle, delimiter, prefix, mirroredFramesAnglesNotShared);
                img.src = `${enemyPath}/${prefix}/${filename}${imgExt}`; 
                if (walkFrame < delimiter) {
                    img.style.transform = 'scaleX(1)';
                } else { 
                    img.style.transform = 'scaleX(-1)';
                }
            // sprite uses mirrored angles for the same frame and mirrored frames on angle 1 and 5 (A1D1, A2A8, A3A7, A4A6, A5D5)
            // or sprite uses mirrored angles for the same frame (A1, A2A8, A3A7, A4A6, A5)
            } else if (mirroredFramesAnglesNotShared || mirroredAngles) {
                const filename = getMirroredAngleFilename(frame, spriteAngle, prefix, reversedAngles);
                img.src = `${enemyPath}/${prefix}/${filename}${imgExt}`; 
                if ((reversedAngles && spriteAngle > 5) || (!reversedAngles && spriteAngle < 5)) {
                    img.style.transform = 'scaleX(1)';
                } else { 
                    img.style.transform = 'scaleX(-1)';
                }
            // regular sprite (A1, A2, A3, A4, A5, A6, A7, A8)
            } else {
                img.src = `${enemyPath}/${prefix}/${prefix}${frame}${spriteAngle}${imgExt}`;
            }
        }

		// is enemy in front of player? Maybe use the FOV value instead.
		if (angle > -Math.PI * 0.5 && angle < Math.PI * 0.5) {
			const distSquared = (dx * dx) + (dy * dy);
			const dist = Math.sqrt(distSquared);
			const size = viewDist / (Math.cos(angle) * dist);

            // not visible
			if (size <= 0) {
                /* eslint-disable-next-line */
                continue;
            }

			const renderX = Math.tan(angle) * viewDist;

			const style = img.style;

			// height is equal to the sprite size
			if (size !== oldStyles.height) {
				style.height = `${size}px`;
				oldStyles.height = size;
			}

			// top position is halfway down the screen, minus half the sprite height
			const styleTop = ((screenHeight - size) / 2);
			if (styleTop !== oldStyles.top) {
				style.top = `${styleTop}px`;
				oldStyles.top = styleTop;
			}

			// place at x position, adjusted for sprite size
			const styleLeft = (((screenWidth / 2) + renderX) - (size / 2));
			if (styleLeft !== oldStyles.left) {
				style.left = `${styleLeft}px`;
				oldStyles.left = styleLeft;
			}

			const styleZIndex = -(distSquared * 1000) >> 0;
			if (styleZIndex !== oldStyles.zIndex) {
				style.zIndex = styleZIndex;
				oldStyles.zIndex = styleZIndex;
			}

			const styleDisplay = 'block';
			if (styleDisplay !== oldStyles.display) {
				style.display = styleDisplay;
				oldStyles.display = styleDisplay;
			}
		} else {
			const styleDisplay = 'none';
			if (styleDisplay !== enemy.oldStyles.display) {
				img.style.display = styleDisplay;
				enemy.oldStyles.display = styleDisplay;
			}
		}
	}
};
