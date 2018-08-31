import { getState, dispatch } from './store';
import updatePauseState from './updatePauseState';
import move from './move';
import chasePlayer from './enemies/chasePlayer';
import logUpdateColor from './log/logUpdateColor';
import drawMugShot from './status/drawMugShot';
import handleAutomapVisibility from './automap/handleAutomapVisibility';
import drawHealth from './status/drawHealth';
import drawArmor from './status/drawArmor';
import drawKeys from './status/drawKeys';

const gameCycle = () => {
    const state = getState();
    const {
        game: {
            delay,
            lastCycle,
            paused,
        },
        player,
    } = state;

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
    
    if (player.speed !== 0 || player.dir !== 0) {
        move('player', player, timeDelta);
    }

    chasePlayer(timeDelta);

    logUpdateColor();

    handleAutomapVisibility();

    drawMugShot();
    drawHealth();
    drawArmor();
    drawKeys(state);

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
