const ASSET_PATH = 'client/assets';

const initState = {
    IMG_EXT: '.png',

    STATUS_BAR_PATH: `${ASSET_PATH}/hud`,
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
    }
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
