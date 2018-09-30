import getWeaponSettings from './getWeaponSettings';
import buildSpritePath from './buildSpritePath';
import { dispatch } from '../store';

export default (state, element, animate = false) => {
    const { constants: { DEFAULT_WEAPON_FRAME_DELAY } } = state; 
    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const {
        fireFrames,
        flashFrames,
        noFlashOverlay,
    } = weaponSettings;

    if (!fireFrames || fireFrames.length === 0) {
        return false;
    }

    const { weapons: {
        fireFrameDelay = 0,
        currentFireFrame = 0,
        waitForAnimationToEnd,
    } } = state;

    const nextFireFrameDelay = fireFrameDelay <= 0 ? DEFAULT_WEAPON_FRAME_DELAY : fireFrameDelay - 1;
    
    let fireFrame = false;

    // update weapon frame
    if (fireFrameDelay <= 0) {
        const nextFireFrame = currentFireFrame <= 0 ? fireFrames.length - 1 : currentFireFrame - 1;
        fireFrame = buildSpritePath(state, fireFrames[nextFireFrame], noFlashOverlay);

        // can't do anything until the weapon animation has ended
        if (waitForAnimationToEnd) {
            if (nextFireFrame === 0) {
                dispatch({ type: 'STOP_PLAYER_FIRE', fireFrameDelay: fireFrames.length - 1 });
                
                return fireFrame;    
            }
        }

        dispatch({ type: 'UPDATE_WEAPON_FIRE_FRAME', payload: { currentFireFrame: nextFireFrame } });
    }

    dispatch({ type: 'UPDATE_WEAPON_FIRE_ANIMATION_DELAY', payload: { fireFrameDelay: nextFireFrameDelay } });

    return fireFrame;
};
