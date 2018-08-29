import { combineReducers } from 'redux';
import constants from './constants';
import player from './player';
import map from './map';
import wallMap from './wallMap';
import wallTypes from './wallTypes';
import enemyTypes from './enemyTypes';
import enemyMap from './enemyMap';
import decorationTypes from './decorationTypes';
import decorationMap from './decorationMap';
import decorationMapPlacement from './decorationMapPlacement';
import game from './game';
import hud from './hud';
import visibleSprites from './visibleSprites';
import oldVisibleSprites from './oldVisibleSprites';
import view from './view';
import automap from './automap';
import keyStrokes from './keyStrokes';
import music from './music';
import sound from './sound';
import log from './log';

export default combineReducers({
    constants,
    player,
    map,
    wallMap,
    wallTypes,
    enemyTypes,
    enemyMap,
    decorationTypes,
    decorationMap,
    decorationMapPlacement,
    game,
    hud,
    visibleSprites,
    oldVisibleSprites,
    view,
    automap,
    keyStrokes,
    music,
    sound,
    log,
});
