import resizeView from './resizeView';
import bindKeys from './bindKeys';
import debug from './debug';
import initMusic from './initMusic';
import initScreen from './initScreen';
import initPlayer from './initPlayer';
import initDecorations from './initDecorations';
import initEnemies from './initEnemies';
import initAutomap from './initAutomap';
import gameCycle from './gameCycle';
import renderCycle from './renderCycle';

export default () => {
    debug();
    resizeView();
    bindKeys();
    initMusic();
	initScreen();
    initPlayer();
	initDecorations();
	initEnemies();
	initAutomap();
	gameCycle();
	renderCycle();
};
