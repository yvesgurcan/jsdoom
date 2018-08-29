import { getState } from '../store';
import getElementById from '../getElementById';
import drawPercentage from './drawPercentage';

export default () => {
    const {
        constants,
        player: {
            health,
        }
    } = getState();
    const element1 = getElementById('health1');
    const element2 = getElementById('health2');
    const element3 = getElementById('health3');
    const percent = getElementById('healthpercent');

    const playerHealth = String(health);
    drawPercentage(playerHealth, { element1, element2, element3, percent }, constants);
};
