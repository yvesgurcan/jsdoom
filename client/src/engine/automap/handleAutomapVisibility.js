import { getState } from '../store';
import getElementById from '../getElementById';

export default () => {
    const { automap: { showAutomap } } = getState();
    const automapContainer = getElementById('automapcontainer');
    const screen = getElementById('screen');
    if (showAutomap && automapContainer.style.display !== 'block') {
        automapContainer.style.display = 'block';
        screen.style.display = 'none';
    } else if (!showAutomap && automapContainer.style.display !== 'none') {
        automapContainer.style.display = 'none';
        screen.style.display = 'block';
    }
};
