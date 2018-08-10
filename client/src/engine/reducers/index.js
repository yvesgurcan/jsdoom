import { combineReducers } from 'redux';
import enemies from './enemies';
import fps from './fps';
import lastGameCycleTime from './lastGameCycleTime';
import lastRenderCycleTime from './lastRenderCycleTime';
import player from './player';
import screen from './screen';
import spriteMap from './spriteMap';
import sprites from './sprites';

export default combineReducers({
    enemies,
    fps,
    lastGameCycleTime,
    lastRenderCycleTime,
    player,
    screen,
    spriteMap,
    sprites,
});
