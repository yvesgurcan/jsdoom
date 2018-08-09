import { combineReducers } from "redux";
import player from './player';
import screen from './screen';

export default combineReducers({
    player,
    screen,
});