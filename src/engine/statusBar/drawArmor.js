import { getState } from '../store';
import getElementById from '../util/getElementById';
import drawNumber from './drawNumber';
import drawPercentage from './drawPercentage';

export default () => {
    const {
        constants,
        player: { armor }
    } = getState();
    const element1 = getElementById('armor1');
    const element2 = getElementById('armor2');
    const element3 = getElementById('armor3');
    const percent = getElementById('armorpercent');

    const playerArmor = String(armor);
    drawNumber(playerArmor, { element1, element2, element3 }, constants);
    drawPercentage(percent);
};
