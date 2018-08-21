import logAddEvent from './log/logAddEvent';
import logRemoveEvent from './log/logRemoveEvent';
import { getState, dispatch } from './store';
import updatePauseState from './updatePauseState';
import checkForCheat from './checkForCheat';
import startMusic from './startMusic';

const debugPlayer = {
    init: () => {
        dispatch({ type: 'INIT_PLAYER' });
    },
    move: (x = 1, y = 1, rotDeg = 0) => {
        const { player } = getState();

        // this is an approximate calculation
        const rot = (rotDeg / 180) * Math.PI;

        const updatedPlayer = {
            ...player,
            x,
            y,
            rotDeg,
            rot,
        };

        dispatch({ type: 'SET_PLAYER_COORDINATES', payload: updatedPlayer });

        return true;
    },
    pos: () => {
        const { player } = getState();
        console.log(player);
        return true;
    }
};

const debugLog = {
    add: logAddEvent,
    remove: logRemoveEvent,
};

const debugPause = () => updatePauseState(true);

const debugCheat = (input) => (input.toUpperCase ? checkForCheat(input.toUpperCase()) : false);

const debugSong = {
    random: () => startMusic(true),
};

console.log('debug functions', {
    player: debugPlayer,
    log: debugLog,
    pause: debugPause,
    cheat: debugCheat,
    song: debugSong,
});

export default () => {
    window.player = debugPlayer;
    window.log = debugLog;
    window.pause = debugPause;
    window.cheat = debugCheat;
    window.song = debugSong;
};
