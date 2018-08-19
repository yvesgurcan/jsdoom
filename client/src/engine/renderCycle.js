import { getState, dispatch } from './store';
import updateAutomap from './updateAutomap';
import clearSprites from './clearSprites';
import castRays from './castRays';
import renderSprites from './renderSprites';
import renderEnemies from './renderEnemies';
import updateFPS from './updateFPS';

const renderCycle = () => {
    const {
        lastRenderCycleTime,
        automap: {
            showAutomap,
            showViewingCone,
        },
    } = getState();

    updateAutomap();
    
    if (!showAutomap || (showAutomap && showViewingCone)) {
        castRays();
    }
    if (!showAutomap) {
        clearSprites();
        renderSprites();
        renderEnemies();
    }

	// time since last rendering
	const now = new Date().getTime();
	const timeDelta = now - lastRenderCycleTime;
	let cycleDelay = 1000 / 30;
	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
    }
    
    dispatch({ type: 'SET_LAST_RENDER_CYCLE_TIME', payload: now });

    setTimeout(renderCycle, cycleDelay);
    
    updateFPS(timeDelta);
};

export default renderCycle;
