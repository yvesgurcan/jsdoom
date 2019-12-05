import getElementById from '../util/getElementById';
import drawSmallDigit from './drawSmallDigit';

export default state => {
    const {
        game: { singlePlayer },
        constants,
        constants: { IMG_EXT, STATUS_BAR_PATH, STATUS_BAR_WEAPON_FILENAME }
    } = state;
    if (singlePlayer) {
        const weapons = getElementById('weaponsandfragcontainer');
        const weaponsBackground = new Image();
        weaponsBackground.id = 'arms';
        weaponsBackground.src = `${STATUS_BAR_PATH}/${STATUS_BAR_WEAPON_FILENAME}${IMG_EXT}`;
        weaponsBackground.style.width = '100%';
        weapons.appendChild(weaponsBackground);
        weapons.style.display = 'block';

        // player always starts with pistol
        const pistol = getElementById('weapon2');
        drawSmallDigit(pistol, 2, 'yellow', constants);

        [3, 4, 5, 6, 7].map(slotNumber => {
            const element = getElementById(`weapon${slotNumber}`);
            drawSmallDigit(element, slotNumber, 'grey', constants);
            return true;
        });
    }
};
