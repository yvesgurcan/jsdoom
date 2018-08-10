import bindKeys from './bindKeys';
import resizeView from './resizeView';
import initScreen from './initScreen';
import initSprites from './initSprites';
import initEnemies from './initEnemies';
import { drawMiniMap } from './minimap';
import renderCycle from './renderCycle';
import move from './move';
import ai from './ai';
import store from './store';
import { gameCycleDelay } from './constants';

const { dispatch, getState } = store;

function init() {
    bindKeys();
    resizeView();
    initScreen();
    initSprites();
    initEnemies();
	drawMiniMap();
    gameLoop();
    renderCycle();
}

function gameLoop() {
    const now = new Date().getTime();

    // time since last game logic

    const { lastGameCycleTime } = getState();
    const timeDelta = now - lastGameCycleTime;
    
    console.log({ timeDelta });

    const { player } = getState();
    move(player, timeDelta);
    
    ai(timeDelta);

    let cycleDelay = gameCycleDelay; 

	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
	}
    
    // frames per second
    setTimeout(gameLoop, cycleDelay); 
    dispatch({ type: 'LAST_GAME_CYCLE_TIME_SET', lastGameCycleTime: now });
}

setTimeout(init, 75);
