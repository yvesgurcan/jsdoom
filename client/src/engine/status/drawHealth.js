import { getState } from '../store';
import getElementById from '../getElementById';

const drawHealthDigit = (element, digit, constants = {}) => {
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
    return true;
};

export default () => {
    const {
        constants,
        constants: {
            ALPHANUMERIC_PATH,
            STATUS_BAR_NUM_PREFIX,
            IMG_EXT,
        },
        player: {
            health,
        }
    } = getState();
    const healthDigit1 = getElementById('health1');
    const healthDigit2 = getElementById('health2');
    const healthDigit3 = getElementById('health3');
    const healthPercent = getElementById('healthpercent');

    healthPercent.src = `${ALPHANUMERIC_PATH}/${STATUS_BAR_NUM_PREFIX}/${STATUS_BAR_NUM_PREFIX}PRCNT${IMG_EXT}`;

    const playerHealth = String(health);
    const [health1, health2, health3] = playerHealth;

    if (health3 === undefined && health2 === undefined) {
        drawHealthDigit(healthDigit1, undefined);
        drawHealthDigit(healthDigit2, undefined);
        drawHealthDigit(healthDigit3, health1, constants);
        return true;
    } else if (health3 === undefined) {
        drawHealthDigit(healthDigit1, undefined);
        drawHealthDigit(healthDigit2, health1, constants);
        drawHealthDigit(healthDigit3, health2, constants);
        return true;
    }

    drawHealthDigit(healthDigit1, health1, constants);
    drawHealthDigit(healthDigit2, health2, constants);
    drawHealthDigit(healthDigit3, health3, constants);
    return true;
};
