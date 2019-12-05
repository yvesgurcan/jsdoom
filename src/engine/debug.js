import getElementById from './util/getElementById';
import logAddEvent from './log/logAddEvent';
import logRemoveEvent from './log/logRemoveEvent';
import { getState, dispatch } from './store';
import updatePauseState from './updatePauseState';
import checkForCheat from './checkForCheat';
import startMusic from './startMusic';
import getNextWeaponFromSlot from './weapons/getNextWeaponFromSlot';

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
            rot
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

const debugWeapons = {
    inspect: () => {
        const { weapons } = getState();
        return weapons;
    },
    switch: slot => {
        const state = getState();
        const nextWeapon = getNextWeaponFromSlot(state, slot);
        if (nextWeapon !== false) {
            dispatch({ type: 'START_LOWER_WEAPON', payload: { nextWeapon } });
        }

        const { weapons: result } = getState();
        return result;
    }
};

const debugEnemies = {
    pos: index => {
        const { enemies } = getState();
        const enemy = enemies[index - 1];
        if (!enemy) {
            console.error(
                `Index ${index} is out of range (max: ${enemies.length})`
            );
            return {};
        }
        return enemy;
    }
};

const debugLog = {
    add: logAddEvent,
    remove: logRemoveEvent
};

const debugPause = () => updatePauseState(true);

const debugCheat = input =>
    input.toUpperCase ? checkForCheat(input.toUpperCase()) : false;

const debugSong = {
    get: () => {
        const { music } = getState();
        return music;
    },
    random: () => startMusic(true)
};

export default () => {
    console.log('debug functions', {
        getElementById,
        player: debugPlayer,
        weapons: debugWeapons,
        enemies: debugEnemies,
        log: debugLog,
        pause: debugPause,
        cheat: debugCheat,
        song: debugSong
    });

    window.getElementById = getElementById;
    window.player = debugPlayer;
    window.weapons = debugWeapons;
    window.enemies = debugEnemies;
    window.log = debugLog;
    window.pause = debugPause;
    window.cheat = debugCheat;
    window.song = debugSong;
    return true;
};
