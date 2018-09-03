const {
    WEAPONS,
    WEAPON_SETTINGS,
    AMMO,
    AMMO_MAX,
} = require('../constants');

const ASSET_PATH = 'client/assets';

const CHEAT_GOD = 'IDDQD';
const CHEAT_AMMO = 'IDFA';
const CHEAT_AMMO_KEY = 'IDKFA';
const CHEAT_MAP = 'IDDT';
const CHEAT_MUSIC = 'IDMUS';

const initState = {
    STATUS_BAR_PATH: `${ASSET_PATH}/hud`,
    ALPHANUMERIC_PATH: `${ASSET_PATH}/alphanumeric`,
    IMG_EXT: '.png',
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
        THRESHOLD4: 4,
    },
    ON: 'ON',
    OFF: 'OFF',
    CHEATS: [
        CHEAT_GOD,
        CHEAT_AMMO,
        CHEAT_AMMO_KEY,
        CHEAT_MAP,
        CHEAT_MUSIC,
    ],
    WEAPONS,
    WEAPON_SETTINGS,
    AMMO,
    AMMO_MAX,
    KEYBOARD: {
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
        W: 87,
    },
};

export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        default: return prevState;
        case 'UPDATE_CONSTANT': {
            return {
                ...prevState,
                ...payload,
            };
        }
    }
};
