import getWeaponSettings from './getWeaponSettings';
import { dispatch } from '../store';

export default state => {
    const {
        player: { ammo }
    } = state;

    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const { ammoType, usage = 1 } = weaponSettings;
    if (ammoType) {
        if (!ammo || ammo[ammoType] < usage) {
            return false;
        }
    }

    dispatch({ type: 'START_PLAYER_FIRE' });
};
