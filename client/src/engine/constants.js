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

// must be kept in sync with key-values of WEAPONS in reducers/constants
export const ALL_WEAPONS = [
    'shotgun',
    'supershotgun',
    'chaingun',
    'rocketlauncher',
    'plasmagun',
    'bfg9000',
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
