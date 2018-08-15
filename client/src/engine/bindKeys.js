import { dispatch } from './store';

export default () => {
	document.onkeydown = (event) => {
        const { keyCode } = event;
        switch (keyCode) { // which key was pressed?
            default: break;
			case 38:
                dispatch({ type: 'MOVE_PLAYER_FORWARD' });
				break;

			case 40: // down, move player backward, set negative speed
                dispatch({ type: 'MOVE_PLAYER_BACKWARD' });
				break;

			case 37: // left, rotate player left
                dispatch({ type: 'ROTATE_PLAYER_LEFT' });
				break;

			case 39: // right, rotate player right
                dispatch({ type: 'ROTATE_PLAYER_RIGHT' });
				break;
        }
	};

	document.onkeyup = (event) => {
        const { keyCode } = event;
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
