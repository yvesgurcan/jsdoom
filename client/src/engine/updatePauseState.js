import { getState, dispatch } from './store';
import automap from './automap';
import getElementById from './getElementById';
import updateFPS from './updateFPS';
import logUpdateColor from './logUpdateColor';

export default (togglePause) => {
    const {
        gameCycle: { paused },
        automap: { showAutomap },
    } = getState();

    if (togglePause) {
        dispatch({ type: 'TOGGLE_PAUSE' });
    }

    if (paused && showAutomap) {
        dispatch({ type: 'TOGGLE_AUTOMAP' });
        automap();
        logUpdateColor();
        updateFPS();
    }

    const pauseMessage = getElementById('pause');
    if (paused && pauseMessage.style.display !== 'block') {
        pauseMessage.innerHTML = 'Pause';
        pauseMessage.style.display = 'block';
    } else if (!paused && pauseMessage.style.display !== 'none') {
        pauseMessage.style.display = 'none';
    }
};
