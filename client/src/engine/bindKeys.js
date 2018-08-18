import { keys } from './constants';
import { dispatch, getState } from './store';
import checkForCheat from './checkForCheat';

const {
    UP, W,
    DOWN, S,
    LEFT, A,
    RIGHT, D,
    V,
    TAB,
    SHIFT,
} = keys;

console.table({
    'UP-or-W': 'forward',
    'DOWN-or-S': 'backward',
    'LEFT-or-A': 'left',
    'RIGHT-or-D': 'right',
    shift: 'strafe',
    tab: 'toggle automap',
    v: 'toggle viewing cone (automap only)',
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
            case V: {
                dispatch({ type: 'TOGGLE_VIEWING_CONE' });
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
