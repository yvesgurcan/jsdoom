import getElementById from '../getElementById';
import { dispatch, getState } from '../store';

const getStaticSprite = (state) => {
    const {
        constants: {
            IMG_EXT,
            WEAPON_PATH,
            WEAPON_SETTINGS,
        },
        player: { selectedWeapon },
    } = state;
    const weaponSettings = WEAPON_SETTINGS[selectedWeapon];

    if (!weaponSettings) {
        console.error(`Unknown selected weapon '${selectedWeapon}'. Could not get weapon settings.`);
        return null;
    }

    const {
        prefix,
        noFlashSpritePrefix,
    } = weaponSettings;
    
    const spriteInitial = noFlashSpritePrefix ? '' : 'G';
    const spriteUrl = `${WEAPON_PATH}/${prefix}${spriteInitial}A0${IMG_EXT}`;
    return spriteUrl;
};

export default (state) => {
    const {
        constants: { WEAPON_SWITCH_TIME },
        weapons: {
            nextWeapon,
            lowerWeaponDelay,
            raiseWeaponDelay,
        },
        player: { selectedWeapon },
    } = state;

    if (lowerWeaponDelay) {
        dispatch({ type: 'UPDATE_LOWER_WEAPON', payload: { lowerWeaponDelay: lowerWeaponDelay - 1 } });

        // update weapon sprite
        const weapon = getElementById('weapon');
        const imageHeight = weapon.offsetHeight;
        weapon.style.bottom = -(imageHeight / WEAPON_SWITCH_TIME) * (WEAPON_SWITCH_TIME - lowerWeaponDelay);

        return false;
    }

    if (lowerWeaponDelay <= 0 && nextWeapon && selectedWeapon !== nextWeapon) {
        dispatch({ type: 'STOP_LOWER_WEAPON', payload: { selectedWeapon: nextWeapon } });

        const weapon = getElementById('weapon');
        const newState = getState();
        weapon.src = getStaticSprite(newState);
        dispatch({ type: 'START_RAISE_WEAPON' });

        return false;
    }

    if (raiseWeaponDelay) {
        dispatch({ type: 'UPDATE_RAISE_WEAPON', payload: { raiseWeaponDelay: raiseWeaponDelay - 1 } });

        // update weapon sprite
        const weapon = getElementById('weapon');
        const imageHeight = weapon.offsetHeight;
        weapon.style.bottom = -(imageHeight / WEAPON_SWITCH_TIME) * raiseWeaponDelay;

        return false;
    }

    if (raiseWeaponDelay <= 0) {
        dispatch({ type: 'STOP_RAISE_WEAPON' });
    }

    if (!selectedWeapon) {
        console.error('No weapon selected.');
        return false;
    }

    const weapon = getElementById('weapon');
    if (weapon.style.bottom !== 0) {
        weapon.style.bottom = 0;
    }

    weapon.src = getStaticSprite(state);
};
