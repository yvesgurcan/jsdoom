import getWeaponSettings from './getWeaponSettings';
import buildSpritePath from './buildSpritePath';
import { dispatch } from '../store';
import playSound from '../sound/playSound';

export default state => {
    const { constants: { DEFAULT_FIRING_WEAPON_FRAME_DELAY } } = state; 
    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const {
        firingFrames,
        firingFrameDelay,
        flashFrames,
        flashFramePositions,
        noFlashOverlay,
        firingSounds,
    } = weaponSettings;

    if (!firingFrames || firingFrames.length === 0) {
        return false;
    }

    const { weapons: {
        currentFiringFrameDelay = 0,
        currentFiringFrame = 0,
        waitForAnimationToEnd,
    } } = state;

    const nextFiringFrameDelay = currentFiringFrameDelay <= 0 ? (firingFrameDelay || DEFAULT_FIRING_WEAPON_FRAME_DELAY) : currentFiringFrameDelay - 1;
    
    let firingFrame = false;
    let flashFrame = false;
    let flashFramePosition = {};

    // update weapon frame
    if (currentFiringFrameDelay <= 0) {
        const nextFiringFrame = currentFiringFrame <= 0 ? firingFrames.length - 1 : currentFiringFrame - 1;
        firingFrame = buildSpritePath(state, firingFrames[nextFiringFrame], { noFlashOverlay });

        if (flashFrames && flashFrames[nextFiringFrame]) {
            if (flashFramePositions && flashFramePositions[nextFiringFrame]) {
                flashFrame = buildSpritePath(state, flashFrames[nextFiringFrame], { noFlashOverlay, flashSprite: true });
                flashFramePosition = flashFramePositions[nextFiringFrame];
            }
        }


        if (firingSounds) {
            if (firingSounds[currentFiringFrame]) {
                const firingSound = firingSounds[currentFiringFrame];
                playSound(firingSound, 1);
            }
        }

        // can't do anything until the weapon animation has ended
        if (waitForAnimationToEnd) {
            if (nextFiringFrame === 0) {
                dispatch({ type: 'STOP_PLAYER_FIRE', currentFiringFrame: firingFrames.length - 1 });
                
                return firingFrame;    
            }
        }

        dispatch({ type: 'UPDATE_WEAPON_FIRE_FRAME', payload: { currentFiringFrame: nextFiringFrame } });
    }

    dispatch({ type: 'UPDATE_WEAPON_FIRE_ANIMATION_DELAY', payload: { currentFiringFrameDelay: nextFiringFrameDelay } });

    return {
        firingFrame,
        flashFrame,
        flashFramePosition,
    };
};
