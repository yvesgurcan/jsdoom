import { combineReducers } from 'redux';
import decorationTypes from './decorationTypes';
import decorationMapInit from './decorationMapInit';
import decorationMap from './decorationMap';

export default combineReducers({
    decorationTypes,
    decorationMapInit,
    decorationMap,
});
