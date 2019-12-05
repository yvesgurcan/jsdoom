import getWeaponSettings from './getWeaponSettings';
import buildSpritePath from './buildSpritePath';
import { dispatch } from '../store';

export default (state, element, animate = false) => {
    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const { idleFrames, idleFrameInterval } = weaponSettings;

    if (!idleFrames) {
        return 'A';
    }

    if (animate) {
        if (idleFrames.length !== 2) {
            const {
                player: { selectedWeapon }
            } = state;
            console.error(
                `getIdleFrame(): Invalid weapon setting for '${selectedWeapon}'. The property 'idleFrames' must contain 2 elements or be undefined.`
            );
            return false;
        }

        const {
            weapons: { idleFrameDelay, currentIdleFrame }
        } = state;

        const nextIdleFrameDelay =
            idleFrameDelay === undefined || idleFrameDelay <= 0
                ? idleFrameInterval
                : idleFrameDelay - 1;
        if (idleFrameDelay <= 0) {
            if (element.src.includes(buildSpritePath(state, idleFrames[0]))) {
                dispatch({
                    type: 'UPDATE_WEAPON_ANIMATION_DELAY',
                    payload: {
                        idleFrameDelay: nextIdleFrameDelay,
                        currentIdleFrame: idleFrames[1]
                    }
                });
                return idleFrames[1];
            }

            dispatch({
                type: 'UPDATE_WEAPON_ANIMATION_DELAY',
                payload: {
                    idleFrameDelay: nextIdleFrameDelay,
                    currentIdleFrame: idleFrames[0]
                }
            });
            return idleFrames[0];
        }

        dispatch({
            type: 'UPDATE_WEAPON_ANIMATION_DELAY',
            payload: {
                idleFrameDelay: nextIdleFrameDelay,
                currentIdleFrame: currentIdleFrame || idleFrames[0]
            }
        });
        return currentIdleFrame || idleFrames[0];
    }

    if (idleFrames.length === 0) {
        const {
            player: { selectedWeapon }
        } = state;
        console.error(
            `getIdleFrame(): Invalid weapon setting for '${selectedWeapon}'. Could not get first frame from the 'idleFrames' property.`
        );
        return false;
    }

    return idleFrames[0];
};
