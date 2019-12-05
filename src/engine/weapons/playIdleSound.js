import getWeaponSettings from './getWeaponSettings';
import playSound from '../sound/playSound';
import { dispatch, getState } from '../store';

let idleSoundInstance = null;

export default state => {
    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const { idleSound, idleSoundInterval } = weaponSettings;
    if (!idleSound || !idleSoundInterval) {
        clearInterval(idleSoundInstance);
        dispatch({ type: 'UNSET_IDLE_WEAPON_SOUND' });
        return false;
    }

    queueIdleSound(state, idleSound, idleSoundInterval);
    return true;
};

const queueIdleSound = (state, idleSound, idleSoundInterval) => {
    const {
        weapons: { playingIdleSound }
    } = state;
    if (!playingIdleSound) {
        idleSoundInstance = setInterval(
            () => handleIdleSound(idleSound),
            idleSoundInterval
        );
        dispatch({ type: 'SET_IDLE_WEAPON_SOUND' });
        return true;
    }
};

const handleIdleSound = idleSound => {
    const {
        game: { paused }
    } = getState();
    if (paused) {
        return false;
    }

    playSound(idleSound, 1);
    return true;
};
