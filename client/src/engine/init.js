import bindKeys from './bindKeys';
import initPlayer from './initPlayer';
import initSprites from './initSprites';
import initEnemies from './initEnemies';
import initScreen from './initScreen';
import drawMiniMap from './drawMiniMap';
import gameCycle from './gameCycle';
import renderCycle from './renderCycle';
import resizeView from './resizeView';

export default () => {
    resizeView();
	bindKeys();
	initScreen();
    initPlayer();
	initSprites();
	initEnemies();
	drawMiniMap();
	gameCycle();
	renderCycle();
};
