import { dispatch } from './store';
import checkForCheat from './checkForCheat';

console.table({
    'UP-or-W': 'forward',
    'DOWN-or-S': 'backward',
    'LEFT-or-A': 'left',
    'RIGHT-or-D': 'right',
    tab: 'show automap',
    v: 'show viewing cone (automap only)',
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
            // tab
            case 9: {
                dispatch({ type: 'TOGGLE_AUTOMAP' });
                break;
            }
            // v
            case 86: {
                dispatch({ type: 'TOGGLE_VIEWING_CONE' });
                break;
            }
            // up or w
            case 38:
            case 87: {
                dispatch({ type: 'MOVE_PLAYER_FORWARD' });
				break;
            }
            // down or s
            case 40:
            case 83: {
                dispatch({ type: 'MOVE_PLAYER_BACKWARD' });
				break;
            }
            // left or a
            case 37:
            case 65: {
                dispatch({ type: 'ROTATE_PLAYER_LEFT' });
				break;
            }
            // right or d
            case 39:
            case 68: {
                dispatch({ type: 'ROTATE_PLAYER_RIGHT' });
                break;
            }
        }
	};

	document.onkeyup = (event) => {
        const { keyCode } = event;
        event.preventDefault();
		switch (keyCode) {
            default: break;
            case 38:
            case 87:
            case 40:
            case 83:
                dispatch({ type: 'STOP_PLAYER_SPEED' });
				break;
            case 37:
            case 65:
            case 39:
            case 68:
                dispatch({ type: 'STOP_PLAYER_DIRECTION' });
				break;
		}
	};
};
