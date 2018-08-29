import {
    statusBarPath,
    imgExt,
} from '../constants';
import getElementById from '../getElementById';
import { getState } from '../store';
import drawSmallDigit from './drawSmallDigit';

const initWeaponContainer = () => {
    const {
        game: { singlePlayer },
        constants,
        constants: { STATUS_BAR_WEAPON_FILENAME },
    } = getState();
    if (singlePlayer) {
        const weapons = getElementById('weaponsandfragcontainer');
        const weaponsBackground = new Image();
        weaponsBackground.id = 'arms';
        weaponsBackground.src = `${statusBarPath}/${STATUS_BAR_WEAPON_FILENAME}${imgExt}`;
        weaponsBackground.style.width = '100%';
        weapons.appendChild(weaponsBackground);
        weapons.style.display = 'block';

        const weapon1 = getElementById('weapon1');
        const weapon2 = getElementById('weapon2');
        const weapon3 = getElementById('weapon3');
        const weapon4 = getElementById('weapon4');
        const weapon5 = getElementById('weapon5');
        const weapon6 = getElementById('weapon6');

        drawSmallDigit(weapon1, 1, false, constants);
        drawSmallDigit(weapon2, 2, false, constants);
        drawSmallDigit(weapon3, 3, false, constants);
        drawSmallDigit(weapon4, 4, false, constants);
        drawSmallDigit(weapon5, 5, false, constants);
        drawSmallDigit(weapon6, 6, false, constants);
    }
};

export default () => {
    const {
        constants: { STATUS_BAR_FILENAME },
    } = getState();

    const statusBar = getElementById('statusbar');
    const statusBarBackground = new Image();
    statusBarBackground.id = 'stbar';
    statusBarBackground.src = `${statusBarPath}/${STATUS_BAR_FILENAME}${imgExt}`;
    statusBarBackground.style.width = '100%';
    statusBar.appendChild(statusBarBackground);

    setTimeout(() => {
        const statusBarGrid = getElementById('statusbargrid');
        statusBarGrid.height = statusBarBackground.height;
    }, 50);

    initWeaponContainer();
};
