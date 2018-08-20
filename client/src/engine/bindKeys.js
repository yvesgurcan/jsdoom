import { keys } from './constants';
import { dispatch, getState } from './store';
import checkForCheat from './checkForCheat';
import adjustMusicVolume from './adjustMusicVolume';
import logAddEvent from './logAddEvent';
import changeMusic from './changeMusic';

const {
    UP, W,
    DOWN, S,
    LEFT, A,
    RIGHT, D,
    TAB,
    SHIFT,
    MINUS, NUMPAD_MINUS,
    EQUAL, NUMPAD_PLUS,
    F,
    M,
    P,
    V,
} = keys;

console.table({
    'UP-or-W': 'forward',
    'DOWN-or-S': 'backward',
    'LEFT-or-A': 'left',
    'RIGHT-or-D': 'right',
    SHIFT: 'strafe',
    TAB: 'toggle automap',
    MINUS: 'turn volume down',
    'EQUAL-or-PLUS': 'turn volume up',
    F: 'toggle FPS count',
    M: 'change song',
    P: 'toggle pause',
    V: 'toggle viewing cone (automap only)',
});

export default () => {
	document.onkeydown = (event) => {
        const { keyCode } = event;

        // allow page refresh (Command + R)
        if (keyCode !== 91 && keyCode !== 82) {
            event.preventDefault();
        }
        console.log({ keyCode });

        switch (keyCode) {
            default: break;
            case P: {
                dispatch({ type: 'TOGGLE_PAUSE' });
                break;
            }
        }

        const { gameCycle: { paused } } = getState();
        if (paused) {
            return false;
        }

        dispatch({ type: 'REGISTER_KEY_STROKE', payload: keyCode });

        const cheat = checkForCheat();
        if (cheat) {
            return false;
        }

        switch (keyCode) {
            default: break;
            case UP:
            case W: {
                dispatch({ type: 'MOVE_PLAYER_FORWARD' });
				break;
            }
            case DOWN:
            case S: {
                dispatch({ type: 'MOVE_PLAYER_BACKWARD' });
				break;
            }
            case LEFT:
            case A: {
                dispatch({ type: 'ROTATE_PLAYER_LEFT' });
				break;
            }
            case RIGHT:
            case D: {
                dispatch({ type: 'ROTATE_PLAYER_RIGHT' });
                break;
            }
            case TAB: {
                dispatch({ type: 'TOGGLE_AUTOMAP' });
                break;
            }
            case SHIFT: {
                dispatch({ type: 'START_PLAYER_STRAFE' });
                break;
            }
            case NUMPAD_MINUS:
            case MINUS: {
                const { music: { volume } } = getState();
                adjustMusicVolume(volume - 0.1);
                logAddEvent('Volume down.');
                break;
            }
            case NUMPAD_PLUS:
            case EQUAL: {
                const { music: { volume } } = getState();
                adjustMusicVolume(volume + 0.1);
                logAddEvent('Volume up.');
                break;
            }
            case F: {
                dispatch({ type: 'TOGGLE_FPS' });
                break;
            }
            case M: {
                changeMusic();
                break;
            }
            case V: {
                dispatch({ type: 'TOGGLE_VIEWING_CONE' });
                break;
            }
        }
	};

	document.onkeyup = (event) => {
        const { keyCode } = event;
        event.preventDefault();
        
        const { gameCycle: { paused } } = getState();
        if (paused) {
            return false;
        }

		switch (keyCode) {
            default: break;
            case UP:
            case DOWN:
            case W:
            case S:
                dispatch({ type: 'STOP_PLAYER_SPEED' });
                break;
            case LEFT:
            case RIGHT:
            case A:
            case D: {
                dispatch({ type: 'STOP_PLAYER_DIRECTION' });
                break;
            }
            case SHIFT: {
                dispatch({ type: 'STOP_PLAYER_STRAFE' });
                break;
            }
		}
	};
};
