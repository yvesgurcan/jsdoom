import getWeaponSettings from './getWeaponSettings';
import { dispatch } from '../store';

export default state => {
    const {
        weapons: { currentFiringFrame }
    } = state;

    if (currentFiringFrame !== 0) {
        dispatch({ type: 'WAIT_FOR_WEAPON_ANIMATION_END' });
        return false;
    }

    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const { firingFrames } = weaponSettings;
    dispatch({
        type: 'STOP_PLAYER_FIRE',
        currentFiringFrame: firingFrames.length - 1
    });
};
