import { combineReducers } from "../../../../node_modules/redux";
import player from './player';
import screen from './screen';

export default combineReducers({
    player,
    screen,
});