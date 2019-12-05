import { getState, dispatch } from './store';
import updatePauseState from './updatePauseState';
import move from './move';
import pickUpItems from './items/pickUpItems';
import chasePlayer from './enemies/chasePlayer';
import logUpdateColor from './log/logUpdateColor';
import handleAutomapVisibility from './automap/handleAutomapVisibility';
import updateStatusBar from './statusBar/updateStatusBar';
import handleWeapon from './weapons/handleWeapon';

const gameCycle = () => {
    const state = getState();
    const {
        game: { delay, lastCycle, paused },
        player
    } = state;

    if (delay <= 0) {
        console.error(
            'Invalid value: gameCycle.delay should be a number greater than zero.'
        );
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

    if (player.speed !== 0 || player.dir !== 0) {
        move('player', player, timeDelta);
    }

    pickUpItems(state);

    chasePlayer(timeDelta);

    logUpdateColor();

    handleAutomapVisibility();

    updateStatusBar(state);

    handleWeapon(state);

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
