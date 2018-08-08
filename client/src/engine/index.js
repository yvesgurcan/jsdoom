import bindKeys from './bindKeys';
import initScreen from './initScreen';
import playerMove from './playerMove';
import { drawMiniMap, updateMiniMap } from './minimap';
import { castRays } from './3dview';

function init() {
	bindKeys();
	initScreen();
	drawMiniMap();
	gameLoop();
}

function gameLoop() {
	playerMove();
	updateMiniMap();
    castRays();
    
    // frames per second
	setTimeout(gameLoop,1000/45); 
}

setTimeout(init, 75);
