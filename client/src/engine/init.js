import resizeView from './resizeView';
import bindKeys from './bindKeys';
import debug from './debug';
import startMusic from './startMusic';
import initScreen from './initScreen';
import drawStatusBar from './status/drawStatusBar';
import initPlayer from './initPlayer';
import initDecorations from './initDecorations';
import initEnemies from './enemies/initEnemies';
import initAutomap from './automap/initAutomap';
import gameCycle from './gameCycle';
import renderCycle from './renderCycle';

export default () => {
    debug();
    resizeView();
    bindKeys();
    startMusic();
    initScreen();
    drawStatusBar();
    initPlayer();
	initDecorations();
	initEnemies();
	initAutomap();
	gameCycle();
	renderCycle();
};
