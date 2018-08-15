import { combineReducers } from 'redux';
import wallMap from './wallMap';
import player from './player';
import enemyTypes from './enemyTypes';
import enemyMap from './enemyMap';
import decorationTypes from './decorationTypes';
import decorationMap from './decorationMap';
import decorationMapPlacement from './decorationMapPlacement';

export default combineReducers({
    wallMap,
    player,
    enemyTypes,
    enemyMap,
    decorationTypes,
    decorationMap,
    decorationMapPlacement,
});
