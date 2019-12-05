import getElementById from '../util/getElementById';

const drawKey = (state, key, elementName, index) => {
    const {
        constants: { STATUS_BAR_PATH, STATUS_BAR_KEY_PREFIX, IMG_EXT }
    } = state;
    if (key) {
        const element = getElementById(elementName);
        if (element.className !== key) {
            const keyNum = key === 'card' ? index : index + 3;
            element.src = `${STATUS_BAR_PATH}/${STATUS_BAR_KEY_PREFIX}${keyNum}${IMG_EXT}`;
            element.className = key;
        }
    }
};

export default state => {
    const {
        player: { keys = {} }
    } = state;
    const { red, blue, yellow } = keys;

    drawKey(state, blue, 'bluekey', 0);
    drawKey(state, yellow, 'yellowkey', 1);
    drawKey(state, red, 'redkey', 2);
};
