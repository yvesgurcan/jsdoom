import { combineReducers } from 'redux';
import constants from './constants';
import player from './player';
import weapons from './weapons';
import map from './map';
import wallMap from './wallMap';
import wallTypes from './wallTypes';
import enemyTypes from './enemyTypes';
import enemies from './enemies';
import decorationTypes from './decorationTypes';
import decorations from './decorations';
import itemTypes from './itemTypes';
import items from './items';
import game from './game';
import hud from './hud';
import view from './view';
import automap from './automap';
import keyStrokes from './keyStrokes';
import touch from './touch';
import music from './music';
import sound from './sound';
import log from './log';

export default combineReducers({
    constants,
    player,
    weapons,
    map,
    wallMap,
    wallTypes,
    enemyTypes,
    enemies,
    decorationTypes,
    decorations,
    itemTypes,
    items,
    game,
    hud,
    view,
    automap,
    keyStrokes,
    touch,
    music,
    sound,
    log
});
