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
        const { player: result } = getState();
        return result;
    },
    pos: () => {
        const { player } = getState();
        return player;
    }
};

const debugEnemies = {
    pos: (index) => {
        const { enemyMap } = getState();
        const enemy = enemyMap[index - 1];
        if (!enemy) {
            console.error(`Index ${index} is out of range (max: ${enemyMap.length})`);
            return {};
        }
        return enemy;
    }
};

const debugLog = {
    add: logAddEvent,
    remove: logRemoveEvent,
};

const debugPause = () => updatePauseState(true);

const debugCheat = (input) => (input.toUpperCase ? checkForCheat(input.toUpperCase()) : false);

const debugSong = {
    get: () => {
        const { music } = getState();
        return music;
    },
    random: () => startMusic(true),
};

console.log('debug functions', {
    player: debugPlayer,
    enemies: debugEnemies,
    log: debugLog,
    pause: debugPause,
    cheat: debugCheat,
    song: debugSong,
});

export default () => {
    window.player = debugPlayer;
    window.enemies = debugEnemies;
    window.log = debugLog;
    window.pause = debugPause;
    window.cheat = debugCheat;
    window.song = debugSong;
};
