import { getState } from '../store';
import getElementById from '../util/getElementById';
import initAutomap from './initAutomap';

export default () => {
    const {
        automap: { showAutomap }
    } = getState();
    const automapContainer = getElementById('automapcontainer');
    const screen = getElementById('screen');
    if (showAutomap && automapContainer.style.display !== 'block') {
        automapContainer.style.display = 'block';
        screen.style.display = 'none';
        initAutomap();
    } else if (!showAutomap && automapContainer.style.display !== 'none') {
        automapContainer.style.display = 'none';
        screen.style.display = 'block';
    }
};
