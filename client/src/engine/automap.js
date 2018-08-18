import { getState } from './store';
import getElementById from './getElementById';

export default () => {
    const { automap: { showAutomap } } = getState();
    const automap = getElementById('minimapcontainer');
    const screen = getElementById('screen');
    if (showAutomap && automap.style.display !== 'block') {
        automap.style.display = 'block';
        screen.style.display = 'none';
    } else if (!showAutomap && automap.style.display !== 'none') {
        automap.style.display = 'none';
        screen.style.display = 'block';
    }
};
