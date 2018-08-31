export default (element, digit, constants = {}) => {
    const {
        ALPHANUMERIC_PATH,
        STATUS_BAR_NUM_PREFIX,
        IMG_EXT,
    } = constants;
    if (digit === undefined) {
        element.removeAttribute('src');
        return false;
    }

    element.src = `${ALPHANUMERIC_PATH}/${STATUS_BAR_NUM_PREFIX}/${STATUS_BAR_NUM_PREFIX}NUM${digit}${IMG_EXT}`;

    if (Number(digit) === 1) {
        element.style.width = '17%';
        element.style.marginRight = '3%';
    } else {
        element.style.width = '24%';
        element.style.marginRight = '0px';
    }

    return true;
};
