import { dispatch } from './store';

export default () => {
	document.onkeydown = (event) => {
        const { keyCode } = event;
        event.preventDefault();
        console.log(keyCode);
        switch (keyCode) {
            default: break;
            case 9: {
                dispatch({ type: 'TOGGLE_AUTOMAP' });
                break;
            }
			case 38: {
                dispatch({ type: 'MOVE_PLAYER_FORWARD' });
				break;
            }
			case 40: {
                dispatch({ type: 'MOVE_PLAYER_BACKWARD' });
				break;
            }
			case 37: {
                dispatch({ type: 'ROTATE_PLAYER_LEFT' });
				break;
            }
			case 39: {
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
			case 40:
                dispatch({ type: 'STOP_PLAYER_SPEED' });
				break;
			case 37:
			case 39:
                dispatch({ type: 'STOP_PLAYER_DIRECTION' });
				break;
		}
	};
};
