import getElementById from './getElementById';
import { getState } from './store';

export default (timeDelta) => {
    const { hud: { showFPS } } = getState();
    const framerate = getElementById('fps');
    if (showFPS) {
        if (framerate.style.display !== 'flex') {
            framerate.style.display = 'flex';
        }
        const fps = 1000 / timeDelta;
        framerate.innerHTML = fps.toFixed(1);
        return true;
	} else if (!showFPS) {
        if (framerate.style.display !== 'none') {
            framerate.style.display = 'none';
        }
    }
    return false;
};
