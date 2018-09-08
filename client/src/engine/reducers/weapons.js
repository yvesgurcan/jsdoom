import { WEAPON_SWITCH_TIME } from '../constants';

const initState = {};
export default (prevState = initState, action) => {
    const {
        type,
        payload = {},
    } = action;

    const {
        nextWeapon,
        lowerWeaponDelay,
        raiseWeaponDelay,
    } = payload;

    switch (type) {
        default: return prevState;
        case 'START_LOWER_WEAPON': {
            return {
                ...prevState,
                nextWeapon,
                lowerWeaponDelay: WEAPON_SWITCH_TIME,
            };
        }
        case 'UPDATE_LOWER_WEAPON': {
            return {
                ...prevState,
                lowerWeaponDelay,
            };
        }
        case 'STOP_LOWER_WEAPON': {
            return {
                ...prevState,
                nextWeapon: undefined,
                lowerWeaponDelay: undefined,
            };
        }
        case 'START_RAISE_WEAPON': {
            return {
                ...prevState,
                raiseWeaponDelay: WEAPON_SWITCH_TIME,
            };
        }
        case 'UPDATE_RAISE_WEAPON': {
            return {
                ...prevState,
                raiseWeaponDelay,
            };
        }
        case 'STOP_RAISE_WEAPON': {
            return {
                ...prevState,
                raiseWeaponDelay: undefined,
            };
        }
    }
};
