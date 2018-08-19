import { getState, dispatch } from './store';
import updatePauseState from './updatePauseState';
import move from './move';
import ai from './ai';
import logUpdateColor from './logUpdateColor';
import automap from './automap';

const gameCycle = () => {
    const {
        gameCycle: {
            delay,
            lastCycle,
            paused,
        },
        player,
    } = getState();

    if (delay <= 0) {
        console.error('Invalid value: gameCycle.delay should be a number greater than zero.');
        return false;
    }

    updatePauseState();

    if (paused) {
        setTimeout(gameCycle, delay);
        return false;
    }

    const now = new Date().getTime();

    // time since last game logic
    const timeDelta = now - lastCycle;
    move('player', player, timeDelta);
    ai(timeDelta);
    logUpdateColor();
    automap();


    // the timer will likely not run that fast due to the rendering cycle hogging the cpu
    // so figure out how much time was lost since last cycle
    let cycleDelay = delay; 
    if (timeDelta > cycleDelay) {
        cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
    }

    setTimeout(gameCycle, cycleDelay);
    dispatch({ type: 'SET_LAST_GAME_CYCLE_TIME', payload: now });
};

export default gameCycle;
