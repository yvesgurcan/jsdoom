import getElementById from './util/getElementById';
import { getState, dispatch } from './store';

export default timeDelta => {
    const {
        hud: { showFPS },
        automap: { showAutomap },
        game: {
            paused,
            logFPS,
            logFPSInterval,
            compareFPSInterval,
            lastFPSLog,
            lastFPSCompare,
            lastFPSCompareValue
        }
    } = getState();
    const framerate = getElementById('fps');

    let fps = null;
    if (showFPS || logFPS) {
        fps = 1000 / timeDelta;
    }

    if (logFPS) {
        const now = new Date().getTime();
        if (now - lastFPSLog > logFPSInterval) {
            if (lastFPSLog) {
                let compare = '';
                let delta = 0;
                if (now - lastFPSCompare > compareFPSInterval) {
                    if (lastFPSCompareValue) {
                        delta = Number((fps - lastFPSCompareValue).toFixed(1));
                        compare = `(${delta > 0 ? `+${delta}` : delta})`;
                    }

                    dispatch({ type: 'LAST_FPS_COMPARE', payload: { fps } });
                }

                console.log(
                    `fps: %c${Number(fps.toFixed(1))} %c${compare}`,
                    `color: ${
                        fps < 15 ? 'red' : fps < 20 ? 'orange' : 'green'
                    }`,
                    `color: ${delta < 0 ? 'red' : 'green'}`
                );
            }

            dispatch({ type: 'LAST_FPS_LOG' });
        }
    }

    if (showFPS) {
        if (framerate.style.display !== 'flex') {
            framerate.style.display = 'flex';
        }
        if (showAutomap && framerate.style.color !== 'orange') {
            framerate.style.color = 'orange';
        } else if (!showAutomap && framerate.style.color !== 'red') {
            framerate.style.color = 'red';
        }

        if (!paused) {
            framerate.innerHTML = fps.toFixed(1);
        }

        return true;
    } else if (!showFPS) {
        if (framerate.style.display !== 'none') {
            framerate.style.display = 'none';
        }
    }
    return false;
};
