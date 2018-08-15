import { combineReducers } from 'redux';
import player from './player';
import wallMap from './wallMap';
import wallTypes from './wallTypes';
import enemyTypes from './enemyTypes';
import enemyMap from './enemyMap';
import decorationTypes from './decorationTypes';
import decorationMap from './decorationMap';
import decorationMapPlacement from './decorationMapPlacement';

export default combineReducers({
    player,
    wallMap,
    wallTypes,
    enemyTypes,
    enemyMap,
    decorationTypes,
    decorationMap,
    decorationMapPlacement,
});
