import getWeaponSettings from './getWeaponSettings';
import getIdleFrame from './getIdleFrame';
import buildSpritePath from './buildSpritePath';
import playIdleSound from './playIdleSound';
import playSound from '../sound/playSound';
import getElementById from '../util/getElementById';
import { dispatch, getState } from '../store';
import getFiringFrame from './getFiringFrame';

const getFirstIdleSprite = (state, element) => {
    const firstIdleFrame = getIdleFrame(state, element, false);
    return buildSpritePath(state, firstIdleFrame);
};

const getIdleSprite = (state, element) => {
    const idleFrame = getIdleFrame(state, element, true);
    return buildSpritePath(state, idleFrame);
};

export default state => {
    const {
        constants: { WEAPON_SWITCH_TIME },
        weapons: { nextWeapon, lowerWeaponDelay, raiseWeaponDelay },
        player: { selectedWeapon, firing }
    } = state;

    // lowering current weapon
    if (lowerWeaponDelay) {
        dispatch({
            type: 'UPDATE_LOWER_WEAPON',
            payload: { lowerWeaponDelay: lowerWeaponDelay - 1 }
        });

        const weapon = getElementById('weapon');
        const imageHeight = weapon.offsetHeight;
        weapon.style.bottom =
            -(imageHeight / WEAPON_SWITCH_TIME) *
            (WEAPON_SWITCH_TIME - lowerWeaponDelay);

        return false;
    }

    if (lowerWeaponDelay <= 0 && nextWeapon && selectedWeapon !== nextWeapon) {
        dispatch({
            type: 'STOP_LOWER_WEAPON',
            payload: { selectedWeapon: nextWeapon }
        });

        const weapon = getElementById('weapon');
        const newState = getState();
        weapon.src = getFirstIdleSprite(newState, weapon);
        dispatch({ type: 'START_RAISE_WEAPON' });

        const weaponSettings = getWeaponSettings(newState);
        const { raiseSound } = weaponSettings;
        if (raiseSound) {
            playSound(raiseSound);
        }

        return false;
    }

    // raising next weapon
    if (raiseWeaponDelay) {
        dispatch({
            type: 'UPDATE_RAISE_WEAPON',
            payload: { raiseWeaponDelay: raiseWeaponDelay - 1 }
        });

        const weapon = getElementById('weapon');
        const imageHeight = weapon.offsetHeight;
        weapon.style.bottom =
            -(imageHeight / WEAPON_SWITCH_TIME) * raiseWeaponDelay;

        return false;
    }

    if (raiseWeaponDelay <= 0) {
        dispatch({ type: 'STOP_RAISE_WEAPON' });
    }

    if (!selectedWeapon) {
        console.error('handleWeapon(): No weapon selected.');
        return false;
    }

    const weapon = getElementById('weapon');
    if (weapon.style.bottom !== 0) {
        weapon.style.bottom = 0;
    }

    // firing
    if (firing) {
        const firingFrame = getFiringFrame(state);
        if (firingFrame) {
            weapon.src = firingFrame;
        }

        return false;
    }

    // idle weapon
    weapon.src = getIdleSprite(state, weapon);
    playIdleSound(state);

    return true;
};
