import {
    WEAPONS,
    WEAPON_SETTINGS,
    WEAPON_SWITCH_TIME,
    AMMO,
    AMMO_MAX
} from '../constants';

const {
    FIST,
    CHAINSAW,
    PISTOL,
    SHOTGUN,
    SUPER_SHOTGUN,
    CHAINGUN,
    ROCKET_LAUNCHER,
    PLASMA_GUN,
    BFG9000
} = WEAPONS;

const ASSET_PATH = 'assets';

const CHEAT_GOD = 'IDDQD';
const CHEAT_AMMO = 'IDFA';
const CHEAT_AMMO_KEY = 'IDKFA';
const CHEAT_MAP = 'IDDT';
const CHEAT_MUSIC = 'IDMUS';

const initState = {
    // util
    FRAC_UNIT: 64,
    IMG_EXT: '.png',
    ON: 'ON',
    OFF: 'OFF',
    // overlay colors
    OPACITY_INCREMENT: 0.15,
    OPACITY_DURATION: 30,
    PICK_UP_OVERLAY: '210, 210, 100',
    // asset paths
    ALPHANUMERIC_PATH: `${ASSET_PATH}/alphanumeric`,
    STATUS_BAR_PATH: `${ASSET_PATH}/hud`,
    WEAPON_PATH: `${ASSET_PATH}/weapons`,
    ENEMY_PATH: `${ASSET_PATH}/monsters`,
    WOLF_PATH: `${ASSET_PATH}/wolf`,
    TEXTURE_PATH: `${ASSET_PATH}/textures`,
    ITEM_PATH: `${ASSET_PATH}/items`,
    DECORATION_PATH: `${ASSET_PATH}/decorations`,
    // player
    PLAYER_MAX_NORMAL_HEALTH: 100,
    PLAYER_MAX_IMPROVED_HEALTH: 200,
    PLAYER_MAX_IMPROVED_ARMOR: 200,
    // keyboard keys
    KEYBOARD: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        TAB: 9,
        SHIFT: 16,
        CTRL: 17,
        COMMAND: 91,
        MINUS: 189,
        EQUAL: 187,
        NUMPAD_MINUS: 109,
        NUMPAD_PLUS: 107,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
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
        W: 87
    },
    // cheats
    CHEATS: [CHEAT_GOD, CHEAT_AMMO, CHEAT_AMMO_KEY, CHEAT_MAP, CHEAT_MUSIC],
    // status bar
    STATUS_BAR_FILLER: `${ASSET_PATH}/textures/ROCK2.png`,
    STATUS_BAR_NUM_PREFIX: 'STT',
    STATUS_BAR_NUM_GREY_PREFIX: 'STGNUM',
    STATUS_BAR_NUM_YELLOW_PREFIX: 'STYSNUM',
    STATUS_BAR_KEY_PREFIX: 'STKEYS',
    STATUS_BAR_FILENAME: 'STBAR',
    STATUS_BAR_WEAPON_FILENAME: 'STARMS',
    MUGSHOT: {
        PREFIX: 'STF',
        DEAD: 'DEAD',
        RAMPAGE: 'EVL',
        GODMODE: 'GOD',
        OUCHFACE: 'OUCH',
        IDLE: 'ST',
        HURT_LEFT: 'TR',
        HURT_RIGHT: 'TL',
        LOOK_LEFT: 2,
        LOOK_STRAIGHT: 1,
        LOOK_RIGHT: 0,
        THRESHOLD0: 0,
        THRESHOLD1: 1,
        THRESHOLD2: 2,
        THRESHOLD3: 3,
        THRESHOLD4: 4
    },
    // weapons
    WEAPONS,
    WEAPON_SLOTS: {
        1: [CHAINSAW, FIST],
        2: [PISTOL],
        3: [SUPER_SHOTGUN, SHOTGUN],
        4: [CHAINGUN],
        5: [ROCKET_LAUNCHER],
        6: [PLASMA_GUN],
        7: [BFG9000]
    },
    WEAPON_SETTINGS,
    WEAPON_SWITCH_TIME,
    DEFAULT_FIRING_WEAPON_FRAME_DELAY: 4,
    // ammo
    AMMO,
    AMMO_MAX
};

export default (prevState = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        default:
            return prevState;
        case 'UPDATE_CONSTANT': {
            return {
                ...prevState,
                ...payload
            };
        }
    }
};
