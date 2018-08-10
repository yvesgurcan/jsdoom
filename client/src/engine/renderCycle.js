import { updateMiniMap } from './minimap';
import clearSprites from './clearSprites';
import { castRays } from './3dview';
import renderSprites from './renderSprites';
import renderEnemies from './renderEnemies';
import updateOverlay from './updateOverlay';
import store from './store';

const { dispatch, getState } = store;

const renderCycle = () => {
	updateMiniMap();
	clearSprites();
	castRays();
	renderSprites();
	renderEnemies();

	// time since last rendering
    const now = new Date().getTime();
    
    const { lastRenderCycleTime } = getState();
	const timeDelta = now - lastRenderCycleTime;
	let cycleDelay = 1000 / 30;
	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
	}
    dispatch({ type: 'LAST_RENDER_CYCLE_TIME_SET', lastRenderCycleTime: now });
	setTimeout(renderCycle, cycleDelay);

    const fps = 1000 / timeDelta;
    dispatch({ type: 'FPS_SET', fps });
    
    updateOverlay();
};

export default renderCycle;
