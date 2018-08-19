import { keys } from './constants';
import { dispatch, getState } from './store';
import checkForCheat from './checkForCheat';
import adjustMusicVolume from './adjustMusicVolume';

const {
    UP, W,
    DOWN, S,
    LEFT, A,
    RIGHT, D,
    TAB,
    SHIFT,
    MINUS, NUMPAD_MINUS,
    EQUAL, NUMPAD_PLUS,
    V,
    F,
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
    V: 'toggle viewing cone (automap only)',
    F: 'toggle FPS count',
});

export default () => {
	document.onkeydown = (event) => {
        const { keyCode } = event;

        // allow page refresh (Command + R)
        if (keyCode !== 91 && keyCode !== 82) {
            event.preventDefault();
        }
        console.log({ keyCode });

        dispatch({ type: 'REGISTER_KEY_STROKE', payload: keyCode });
        const cheat = checkForCheat();
        if (cheat) {
            return;
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
                break;
            }
            case NUMPAD_PLUS:
            case EQUAL: {
                const { music: { volume } } = getState();
                adjustMusicVolume(volume + 0.1);
                break;
            }
            case V: {
                dispatch({ type: 'TOGGLE_VIEWING_CONE' });
                break;
            }
            case F: {
                dispatch({ type: 'TOGGLE_FPS' });
                break;
            }
        }
	};

	document.onkeyup = (event) => {
        const { keyCode } = event;
        event.preventDefault();
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
