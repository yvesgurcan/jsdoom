import bindKeys from './bindKeys';
import initPlayer from './initPlayer';
import initSprites from './initSprites';
import initEnemies from './initEnemies';
import initScreen from './initScreen';
import initAutomap from './initAutomap';
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
	initAutomap();
	gameCycle();
	renderCycle();
};
