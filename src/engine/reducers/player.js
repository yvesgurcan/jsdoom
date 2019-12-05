import { ALL_WEAPONS, ALL_AMMO, ALL_KEYS } from '../constants';

import playerType from '../../types/player';
import player from '../../maps/player';

const initState = {
    x: 1,
    y: 1,
    rotDeg: 0,
    ...player,
    ...playerType
};

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;

    const {
        selectedWeapon,
        ammoType,
        ammoCount,
        health,
        armor,
        armorType = 'green',
        doNotOverrideArmorType
    } = payload;

    switch (type) {
        default:
            return prevState;
        case 'INIT_PLAYER': {
            return initState;
        }
        case 'TOGGLE_GODMODE': {
            return {
                ...prevState,
                health: 100,
                godMode: !prevState.godMode
            };
        }
        case 'CHEAT_AMMO': {
            return {
                ...prevState,
                health: 100,
                armor: 200,
                doubleMaxAmmo: true,
                weapons: ALL_WEAPONS,
                ammo: ALL_AMMO
            };
        }
        case 'CHEAT_AMMO_AND_KEYS': {
            return {
                ...prevState,
                health: 100,
                armor: 200,
                doubleMaxAmmo: true,
                weapons: ALL_WEAPONS,
                ammo: ALL_AMMO,
                keys: ALL_KEYS
            };
        }
        case 'SET_PLAYER_COORDINATES': {
            return { ...payload };
        }
        case 'MOVE_PLAYER_FORWARD': {
            return {
                ...prevState,
                speed: 1
            };
        }
        case 'MOVE_PLAYER_BACKWARD': {
            return {
                ...prevState,
                speed: -1
            };
        }
        case 'ROTATE_PLAYER_LEFT': {
            return {
                ...prevState,
                dir: -1
            };
        }
        case 'ROTATE_PLAYER_RIGHT': {
            return {
                ...prevState,
                dir: 1
            };
        }
        case 'START_PLAYER_STRAFE': {
            return {
                ...prevState,
                strafe: true
            };
        }
        case 'STOP_PLAYER_STRAFE': {
            return {
                ...prevState,
                strafe: false
            };
        }
        case 'STOP_PLAYER_SPEED': {
            return {
                ...prevState,
                speed: 0
            };
        }
        case 'STOP_PLAYER_DIRECTION': {
            return {
                ...prevState,
                dir: 0
            };
        }
        case 'STOP_LOWER_WEAPON': {
            return {
                ...prevState,
                selectedWeapon
            };
        }
        case 'START_PLAYER_FIRE': {
            return {
                ...prevState,
                firing: true
            };
        }
        case 'STOP_PLAYER_FIRE': {
            return {
                ...prevState,
                firing: false
            };
        }
        case 'UPDATE_AMMO_COUNT': {
            return {
                ...prevState,
                ammo: {
                    ...prevState.ammo,
                    [ammoType]: ammoCount
                }
            };
        }
        case 'SET_PLAYER_HEALTH': {
            return {
                ...prevState,
                health
            };
        }
        case 'SET_PLAYER_ARMOR': {
            if (prevState.armorType) {
                if (doNotOverrideArmorType) {
                    return {
                        ...prevState,
                        armor
                    };
                }
            }

            return {
                ...prevState,
                armor,
                armorType
            };
        }
    }
};
