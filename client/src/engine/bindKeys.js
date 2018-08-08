import store from './store';
const { dispatch } = store;

// bind keyboard events to game functions (movement, etc)
export default () => {
	document.onkeydown = function(event) {
        event.preventDefault();
		const { keyCode } = event;
		switch (keyCode) {

            case 38:
                dispatch({ type: 'PLAYER_MOVE_FORWARD' });
				break;

			case 40:
                dispatch({ type: 'PLAYER_MOVE_BACKWARD' });
				break;

			case 37:
                dispatch({ type: 'PLAYER_TURN_LEFT' });
				break;

			case 39:
                dispatch({ type: 'PLAYER_TURN_RIGHT' });
				break;
		}
	}

	document.onkeyup = function(event) {
        event.preventDefault();
		const { keyCode } = event;
		switch (keyCode) {
			case 38:
            case 40:
                dispatch({ type: 'PLAYER_MOVE_STOP' });
				break;
			case 37:
			case 39:
                dispatch({ type: 'PLAYER_TURN_STOP' });
				break;
		}
	}
}
