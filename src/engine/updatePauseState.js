import { getState, dispatch } from './store';
import handleAutomapVisibility from './automap/handleAutomapVisibility';
import getElementById from './util/getElementById';
import updateFPS from './updateFPS';
import logUpdateColor from './log/logUpdateColor';

export default togglePause => {
    const {
        game: { paused },
        automap: { showAutomap }
    } = getState();

    if (togglePause) {
        dispatch({ type: 'TOGGLE_PAUSE' });
    }

    if (paused && showAutomap) {
        dispatch({ type: 'TOGGLE_AUTOMAP' });
        handleAutomapVisibility();
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
