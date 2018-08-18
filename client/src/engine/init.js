import resizeView from './resizeView';
import bindKeys from './bindKeys';
import debug from './debug';
import initScreen from './initScreen';
import initPlayer from './initPlayer';
import initSprites from './initSprites';
import initEnemies from './initEnemies';
import initAutomap from './initAutomap';
import gameCycle from './gameCycle';
import renderCycle from './renderCycle';

export default () => {
    debug();
    resizeView();
	bindKeys();
	initScreen();
    initPlayer();
	initSprites();
	initEnemies();
	initAutomap();
	gameCycle();
	renderCycle();
};
