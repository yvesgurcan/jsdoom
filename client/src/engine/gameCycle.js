import { getState, dispatch } from './store';
import move from './move';
import ai from './ai';
import logUpdateColor from './logUpdateColor';
import automap from './automap';

const gameCycle = () => {
    const {
        gameCycleDelay,
        lastGameCycleTime,
        player,
    } = getState();
	const now = new Date().getTime();

	// time since last game logic
	const timeDelta = now - lastGameCycleTime;
	move('player', player, timeDelta);
    ai(timeDelta);
    logUpdateColor();
    automap();


	// the timer will likely not run that fast due to the rendering cycle hogging the cpu
	// so figure out how much time was lost since last cycle
	let cycleDelay = gameCycleDelay; 
	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
	}

	setTimeout(gameCycle, cycleDelay);
    dispatch({ type: 'SET_LAST_GAME_CYCLE_TIME', payload: now });
};

export default gameCycle;
