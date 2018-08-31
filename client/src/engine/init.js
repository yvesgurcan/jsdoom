import { getState } from './store';
import resizeView from './resizeView';
import bindKeys from './bindKeys';
import debug from './debug';
import startMusic from './startMusic';
import initScreen from './initScreen';
import initStatusBar from './status/initStatusBar';
import initPlayer from './initPlayer';
import initDecorations from './initDecorations';
import initEnemies from './enemies/initEnemies';
import initAutomap from './automap/initAutomap';
import gameCycle from './gameCycle';
import renderCycle from './renderCycle';

export default () => {
    const state = getState();
    debug();
    resizeView();
    bindKeys(state);
    startMusic();
    initScreen();
    initStatusBar(state);
    initPlayer();
	initDecorations();
	initEnemies();
	initAutomap();
	gameCycle();
	renderCycle();
};
