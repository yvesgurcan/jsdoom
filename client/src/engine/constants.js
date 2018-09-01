const assetPath = 'client/assets';

export const wolfPath = `${assetPath}/wolf`;
export const imgExt = '.png';
export const decorationPath = `${assetPath}/decorations`;
export const enemyPath = `${assetPath}/monsters`;
export const soundPath = `${assetPath}/sound`;
export const sndExt = '.wav';

export const miniMapScale = 20;

// in radians
export const fov = (60 * Math.PI) / 200;

export const stripWidth = 3;

export const twoPI = Math.PI * 2;

export const DIRECTIONS = {
    NORTH: -90,
    EAST: 0,
    SOUTH: 90,
    WEST: -180,
};

export const ANGLE_COUNT = 8;

export const ANGLE_DIFF = (360 / 8) / 2;

export const MOVE_TIME = 450;

export const MOVE = {
    FORWARD: 'FORWARD',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    BACKWARD: 'BACKWARD',
};


/* cannot be moved to a reducer */

export const MUGSHOT_TIME = 20;

export const BULLETS = 'bullets';
export const SHELLS = 'shells';
export const ROCKETS = 'rockets';
export const CELLS = 'cells';

export const AMMO = {
    BULLETS,
    SHELLS,
    ROCKETS,
    CELLS,
};

export const AMMO_MAX = {
    [BULLETS]: 200,
    [SHELLS]: 50,
    [ROCKETS]: 50,
    [CELLS]: 300,
};

export const PISTOL = 'pistol';
export const SHOTGUN = 'shotgun';
export const SUPER_SHOTGUN = 'supershotgun';
export const CHAINGUN = 'chaingun';
export const ROCKET_LAUNCHER = 'rocketlauncher';
export const PLASMA_GUN = 'plasmagun';
export const BFG9000 = 'bfg9000';

export const WEAPONS = {
    SHOTGUN,
    SUPER_SHOTGUN,
    CHAINGUN,
    ROCKET_LAUNCHER,
    PLASMA_GUN,
    BFG9000,
};

export const WEAPON_SETTINGS = {
    [PISTOL]: {
        ammo: BULLETS,
    },
    [SHOTGUN]: {
        ammo: SHELLS,
    },
    [SUPER_SHOTGUN]: {
        ammo: SHELLS,
        usage: 2,
    },
    [CHAINGUN]: {
        ammo: BULLETS,
    },
    [ROCKET_LAUNCHER]: {
        ammo: ROCKETS,
    },
    [PLASMA_GUN]: {
        ammo: CELLS,
    },
    [BFG9000]: {
        ammo: CELLS,
        usage: 40,
    },
};

export const ALL_WEAPONS = [
    SHOTGUN,
    SUPER_SHOTGUN,
    CHAINGUN,
    ROCKET_LAUNCHER,
    PLASMA_GUN,
    BFG9000,
];

export const ALL_KEYS = {
    blue: 'skull',
    yellow: 'skull',
    red: 'skull',
};

export const ALL_AMMO = {
    bullets: 400,
    shells: 100,
    rockets: 100,
    cells: 600,
};
