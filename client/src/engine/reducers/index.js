import { combineReducers } from 'redux';
import wallMap from './wallMap';
import decorationTypes from './decorationTypes';
import decorationMapInit from './decorationMapInit';
import decorationMap from './decorationMap';

export default combineReducers({
    wallMap,
    decorationTypes,
    decorationMapInit,
    decorationMap,
});
