import { WEAPON_SWITCH_TIME } from '../constants';

const initState = {};
export default (prevState = initState, action) => {
    const {
        type,
        payload = {},
    } = action;

    const {
        nextWeapon,
        nextWeaponDelay,
    } = payload;

    switch (type) {
        default: return prevState;
        case 'START_LOWER_WEAPON': {
            return {
                ...prevState,
                nextWeapon,
                nextWeaponDelay: WEAPON_SWITCH_TIME,
            };
        }
        case 'UPDATE_LOWER_WEAPON': {
            return {
                ...prevState,
                nextWeaponDelay,
            };       
        }
        case 'STOP_LOWER_WEAPON': {
            if (prevState.switchWeapon) {
                return {
                    ...prevState,
                    nextWeapon: undefined,
                    nextWeaponDelay: undefined,
                };    
            }

            return prevState;
        }
    }
};
