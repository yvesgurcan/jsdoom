import {
    PISTOL,
    // debug
    CHAINSAW,
    SHOTGUN,
    SUPER_SHOTGUN,
    CHAINGUN,
    ROCKET_LAUNCHER,
    PLASMA_GUN,
    BFG9000,
    BULLETS,
    SHELLS,
    ROCKETS,
    CELLS
} from '../engine/constants';

export default {
    selectedWeapon: PISTOL,
    moveSpeed: 0.2,
    rotSpeed: 4,
    speed: 0,
    dir: 0,
    ammo: {
        [BULLETS]: 50,
        // debug
        [SHELLS]: 23,
        [ROCKETS]: 11,
        [CELLS]: 212
    },

    // debug
    weapons: [
        CHAINSAW,
        SHOTGUN,
        SUPER_SHOTGUN,
        CHAINGUN,
        ROCKET_LAUNCHER,
        PLASMA_GUN,
        BFG9000
    ],
    health: 2,
    armor: 0,
    godMode: false,
    strafe: false,
    dead: false
};
