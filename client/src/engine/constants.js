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

export const keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SHIFT: 16,
    TAB: 9,
    COMMAND: 91,
    MINUS: 189,
    EQUAL: 187,
    NUMPAD_MINUS: 109,
    NUMPAD_PLUS: 107,
    A: 65,
    D: 68,
    F: 70,
    G: 71,
    J: 74,
    M: 77,
    P: 80,
    R: 82,
    S: 83,
    V: 86,
    W: 87,
};

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

export const ON = 'ON';
export const OFF = 'OFF';
