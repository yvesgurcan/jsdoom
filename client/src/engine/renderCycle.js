import { getState, dispatch } from './store';
import updateMiniMap from './updateMiniMap';
import clearSprites from './clearSprites';
import castRays from './castRays';
import renderSprites from './renderSprites';
import renderEnemies from './renderEnemies';
import updateOverlay from './updateOverlay';

const renderCycle = () => {
	updateMiniMap();
	clearSprites();
	castRays();
	renderSprites();
	renderEnemies();

    const {
        lastRenderCycleTime,
        hud: { showOverlay },
    } = getState();

	// time since last rendering
	const now = new Date().getTime();
	const timeDelta = now - lastRenderCycleTime;
	let cycleDelay = 1000 / 30;
	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
    }
    
    dispatch({ type: 'SET_LAST_RENDER_CYCLE_TIME', payload: now });

	setTimeout(renderCycle, cycleDelay);

	if (showOverlay) {
        const fps = 1000 / timeDelta;
		updateOverlay(fps);
	}
};

export default renderCycle;
