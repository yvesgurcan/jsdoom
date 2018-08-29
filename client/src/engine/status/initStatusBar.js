import {
    statusBarPath,
    imgExt,
} from '../constants';
import getElementById from '../getElementById';
import { getState } from '../store';

export default () => {
    const {
        game: { singlePlayer },
        constants: {
            STATUS_BAR_FILENAME,
            STATUS_BAR_WEAPON_FILENAME,
        },
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

    if (singlePlayer) {
        const weapons = getElementById('weaponsandfragcontainer');
        const weaponsBackground = new Image();
        weaponsBackground.id = 'arms';
        weaponsBackground.src = `${statusBarPath}/${STATUS_BAR_WEAPON_FILENAME}${imgExt}`;
        weaponsBackground.style.width = '100%';
        weapons.appendChild(weaponsBackground);
        weapons.style.display = 'block';
    }
};
