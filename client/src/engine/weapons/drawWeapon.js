import getElementById from '../getElementById';
import { dispatch } from '../store';

export default (state) => {
    const {
        constants: {
            IMG_EXT,
            WEAPON_PATH,
            WEAPON_SETTINGS,
        },
        weapons: {
            nextWeaponDelay,
            nextWeapon,
        },
        player: { selectedWeapon },
    } = state;

    if (nextWeaponDelay) {
        dispatch({ type: 'UPDATE_SWITCH_WEAPON', payload: { nextWeaponDelay: nextWeaponDelay - 1 } });

        // update weapon sprite

        return false;
    }

    if (nextWeaponDelay <= 0 && nextWeapon && selectedWeapon !== nextWeapon) {
        dispatch({ type: 'STOP_SWITCH_WEAPON', payload: { selectedWeapon: nextWeapon } });
        return false;
    }

    if (!selectedWeapon) {
        console.error('No weapon selected.');
        return false;
    }

    const weaponSettings = WEAPON_SETTINGS[selectedWeapon];

    if (!weaponSettings) {
        console.error(`Unknown selected weapon '${selectedWeapon}'. Could not get weapon settings.`);
        return false;
    }

    const {
        prefix,
        noFlashSpritePrefix,
    } = weaponSettings;

    const weapon = getElementById('weapon');
    const spriteInitial = noFlashSpritePrefix ? '' : 'G';
    weapon.src = `${WEAPON_PATH}/${prefix}${spriteInitial}A0${IMG_EXT}`;
};
