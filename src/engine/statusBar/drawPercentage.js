import { getState } from '../store';

export default percent => {
    const {
        constants: { ALPHANUMERIC_PATH, STATUS_BAR_NUM_PREFIX, IMG_EXT }
    } = getState();

    percent.src = `${ALPHANUMERIC_PATH}/${STATUS_BAR_NUM_PREFIX}/${STATUS_BAR_NUM_PREFIX}PRCNT${IMG_EXT}`;
    percent.style.width = '24%';

    return true;
};
