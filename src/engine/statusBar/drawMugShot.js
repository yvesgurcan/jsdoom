import { getState, dispatch } from '../store';
import getElementById from '../util/getElementById';

export default () => {
    const {
        constants: {
            STATUS_BAR_PATH,
            IMG_EXT,
            MUGSHOT: {
                PREFIX,
                DEAD,
                RAMPAGE,
                GODMODE,
                OUCHFACE,
                IDLE,
                HURT_LEFT,
                HURT_RIGHT,
                LOOK_LEFT,
                LOOK_STRAIGHT,
                LOOK_RIGHT,
                THRESHOLD0,
                THRESHOLD1,
                THRESHOLD2,
                THRESHOLD3,
                THRESHOLD4
            }
        },
        hud: { nextMugShot },
        player: { dead, godMode, health }
    } = getState();

    const mugShot = getElementById('mugshot');
    const mugShotContainer = getElementById('mugshotcontainer');
    const statusBar = getElementById('statusbar');
    mugShot.style.height =
        statusBar.offsetHeight - mugShotContainer.offsetHeight * 0.12;

    if (dead) {
        mugShot.src = `${STATUS_BAR_PATH}/${PREFIX}${DEAD}${THRESHOLD0}${IMG_EXT}`;
        return true;
    }

    if (godMode) {
        mugShot.src = `${STATUS_BAR_PATH}/${PREFIX}${GODMODE}${THRESHOLD0}${IMG_EXT}`;
        return true;
    }

    dispatch({ type: 'SET_NEXT_MUGSHOT' });

    if (nextMugShot > 0) {
        return false;
    }

    const lookModifier = Math.random();
    let look = LOOK_STRAIGHT;
    if (lookModifier < 0.33) {
        look = LOOK_LEFT;
    } else if (lookModifier > 0.66) {
        look = LOOK_RIGHT;
    }

    let healthLevel = THRESHOLD0;

    if (health < 20) {
        healthLevel = THRESHOLD4;
    } else if (health < 40) {
        healthLevel = THRESHOLD3;
    } else if (health < 60) {
        healthLevel = THRESHOLD2;
    } else if (health < 80) {
        healthLevel = THRESHOLD1;
    }

    mugShot.src = `${STATUS_BAR_PATH}/${PREFIX}${IDLE}${healthLevel}${look}${IMG_EXT}`;

    return true;
};
