export default (element, digit, color = 'yellow', constants = {}) => {
    const {
        ALPHANUMERIC_PATH,
        STATUS_BAR_NUM_GREY_PREFIX,
        STATUS_BAR_NUM_YELLOW_PREFIX,
        IMG_EXT
    } = constants;
    if (digit === undefined) {
        element.removeAttribute('src');
        return false;
    }

    const numberPrefix =
        color === 'grey'
            ? STATUS_BAR_NUM_GREY_PREFIX
            : STATUS_BAR_NUM_YELLOW_PREFIX;

    element.src = `${ALPHANUMERIC_PATH}/${numberPrefix}/${numberPrefix}${digit}${IMG_EXT}`;
    element.className = color;

    return true;
};
