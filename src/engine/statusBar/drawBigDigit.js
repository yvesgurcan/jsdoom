export default (element, digit, constants = {}, alternativeWidth = false) => {
    const { ALPHANUMERIC_PATH, STATUS_BAR_NUM_PREFIX, IMG_EXT } = constants;
    if (digit === undefined) {
        element.removeAttribute('src');
        element.style = undefined;
        return false;
    }

    element.src = `${ALPHANUMERIC_PATH}/${STATUS_BAR_NUM_PREFIX}/${STATUS_BAR_NUM_PREFIX}NUM${digit}${IMG_EXT}`;

    if (Number(digit) === 1) {
        element.style.width = alternativeWidth ? '23%' : '17%';
        element.style.marginRight = '3%';
    } else {
        element.style.width = alternativeWidth ? '30%' : '24%';
        element.style.marginRight = '0px';
    }

    return true;
};
