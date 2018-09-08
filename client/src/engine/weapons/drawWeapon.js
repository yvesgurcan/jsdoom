import getElementById from '../getElementById';
import { dispatch } from '../store';

export default (state) => {
    const {
        constants: {
            IMG_EXT,
            WEAPON_PATH,
            WEAPON_SETTINGS,
            WEAPON_SWITCH_TIME,
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
        const weapon = getElementById('weapon');
        const imageHeight = weapon.offsetHeight;
        weapon.style.bottom = -(imageHeight / WEAPON_SWITCH_TIME) * (WEAPON_SWITCH_TIME - nextWeaponDelay);

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

    if (weapon.style.bottom !== 0) {
        weapon.style.bottom = 0;
    }

    const spriteInitial = noFlashSpritePrefix ? '' : 'G';
    weapon.src = `${WEAPON_PATH}/${prefix}${spriteInitial}A0${IMG_EXT}`;
};
