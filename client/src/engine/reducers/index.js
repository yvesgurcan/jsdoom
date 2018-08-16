import { combineReducers } from 'redux';
import player from './player';
import map from './map';
import wallMap from './wallMap';
import wallTypes from './wallTypes';
import enemyTypes from './enemyTypes';
import enemyMap from './enemyMap';
import decorationTypes from './decorationTypes';
import decorationMap from './decorationMap';
import decorationMapPlacement from './decorationMapPlacement';
import gameCycleDelay from './gameCycleDelay';

export default combineReducers({
    player,
    map,
    wallMap,
    wallTypes,
    enemyTypes,
    enemyMap,
    decorationTypes,
    decorationMap,
    decorationMapPlacement,
    gameCycleDelay,
});
