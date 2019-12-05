const assetPath = 'assets';

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
    WEST: -180
};

export const ANGLE_COUNT = 8;

export const ANGLE_DIFF = 360 / 8 / 2;

export const MOVE_TIME = 450;

export const MOVE = {
    FORWARD: 'FORWARD',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    BACKWARD: 'BACKWARD'
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
    CELLS
};

export const AMMO_MAX = {
    [BULLETS]: 200,
    [SHELLS]: 50,
    [ROCKETS]: 50,
    [CELLS]: 300
};

export const FIST = 'fist';
export const CHAINSAW = 'chainsaw';
export const PISTOL = 'pistol';
export const SHOTGUN = 'shotgun';
export const SUPER_SHOTGUN = 'supershotgun';
export const CHAINGUN = 'chaingun';
export const ROCKET_LAUNCHER = 'rocketlauncher';
export const PLASMA_GUN = 'plasmagun';
export const BFG9000 = 'bfg9000';

export const WEAPONS = {
    FIST,
    CHAINSAW,
    PISTOL,
    SHOTGUN,
    SUPER_SHOTGUN,
    CHAINGUN,
    ROCKET_LAUNCHER,
    PLASMA_GUN,
    BFG9000
};

export const WEAPON_SETTINGS = {
    [FIST]: {
        prefix: 'PUN',
        firingFrames: ['B', 'C', 'D'],
        firingFrameDelay: 5,
        firingSounds: ['DSPUNCH']
    },
    [CHAINSAW]: {
        prefix: 'SAW',
        raiseSound: 'DSSAWUP',
        idleFrames: ['C', 'D'],
        idleFrameInterval: 4,
        idleSound: 'DSSAWIDL',
        idleSoundInterval: 275,
        firingFrames: ['A', 'B'],
        firingFrameDelay: 1,
        firingSounds: ['DSSAWFUL', '']
    },
    [PISTOL]: {
        ammoType: BULLETS,
        prefix: 'PIS',
        firingFrames: ['A', 'C', 'E'],
        firingSounds: ['DSPISTOL']
    },
    [SHOTGUN]: {
        ammoType: SHELLS,
        prefix: 'SHT',
        firingFrames: ['A', 'A', 'B', 'C', 'D'],
        flashFrames: ['A', 'B'],
        firingSounds: ['DSSHOTGN']
    },
    [SUPER_SHOTGUN]: {
        ammoType: SHELLS,
        usage: 2,
        prefix: 'SHT2',
        noFlashSpritePrefix: true,
        firingFrames: ['A', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        firingFrameDelay: 5,
        flashFrames: ['I', 'J'],
        firingSounds: [
            'DSDSHTGN',
            '',
            'DSDBCLS',
            '',
            'DSDBLOAD',
            '',
            'DSDBOPN',
            '',
            ''
        ]
    },
    [CHAINGUN]: {
        ammoType: BULLETS,
        prefix: 'CHG',
        firingFrames: ['B', 'A'],
        flashFrames: ['B', 'A'],
        firingSounds: ['DSPISTOL', 'DSPISTOL']
    },
    [ROCKET_LAUNCHER]: {
        ammoType: ROCKETS,
        prefix: 'MIS',
        firingFrames: ['B', 'B', 'B', 'B'],
        flashFrames: ['A', 'B', 'C', 'D'],
        firingSounds: ['DSRLAUNC']
    },
    [PLASMA_GUN]: {
        ammoType: CELLS,
        prefix: 'PLS',
        noFlashOverlay: true,
        firingFrames: ['FA', 'FB'],
        firingFrameDelay: 2,
        firingSounds: ['DSPLASMA'],
        releaseFrames: ['B']
    },
    [BFG9000]: {
        ammoType: CELLS,
        usage: 40,
        prefix: 'BFG',
        firingFrames: ['A', 'A', 'B'],
        firingFrameDelay: 20,
        flashFrames: [null, 'A', 'B'],
        firingSounds: ['DSBFG']
    }
};

export const WEAPON_SWITCH_TIME = 7;

export const ALL_WEAPONS = [
    SHOTGUN,
    SUPER_SHOTGUN,
    CHAINGUN,
    ROCKET_LAUNCHER,
    PLASMA_GUN,
    BFG9000
];

export const ALL_KEYS = {
    blue: 'skull',
    yellow: 'skull',
    red: 'skull'
};

export const ALL_AMMO = {
    bullets: 400,
    shells: 100,
    rockets: 100,
    cells: 600
};

export const GREEN_ARMOR = 'green';
export const BLUE_ARMOR = 'blue';
