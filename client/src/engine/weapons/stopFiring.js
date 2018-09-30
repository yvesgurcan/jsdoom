import getWeaponSettings from './getWeaponSettings';
import { dispatch } from '../store';

export default state => {
    const { weapons: { currentFireFrame } } = state;

    if (currentFireFrame !== 0) {
        dispatch({ type: 'WAIT_FOR_WEAPON_ANIMATION_END' });
        return false;
    }

    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const { fireFrames } = weaponSettings;
    dispatch({ type: 'STOP_PLAYER_FIRE', currentFireFrame: fireFrames.length - 1 });
};
