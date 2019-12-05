import startFiring from '../weapons/startFiring';
import stopFiring from '../weapons/stopFiring';
import getElementById from '../util/getElementById';
import { getState, dispatch } from '../store';

export default state => {
    document.onclick = event => {
        const viewport = getElementById('viewport');
        if (document.pointerLockElement !== viewport) {
            viewport.requestPointerLock();
        }
    };

    document.onmousedown = event => {
        const currentState = getState();
        const {
            game: { paused }
        } = currentState;

        if (paused) {
            return false;
        }

        startFiring(currentState);
    };

    document.onmouseup = event => {
        const currentState = getState();
        const {
            game: { paused }
        } = currentState;

        if (paused) {
            return false;
        }

        stopFiring(currentState);
    };

    document.onmousemove = event => {
        const currentState = getState();
        const {
            game: { paused }
        } = currentState;

        if (paused) {
            return false;
        }

        const { movementX, movementY } = event;

        if (movementX > 0) {
            dispatch({ type: 'ROTATE_PLAYER_RIGHT' });
        } else if (movementX < 0) {
            dispatch({ type: 'ROTATE_PLAYER_LEFT' });
        }

        if (movementY < 0) {
            dispatch({ type: 'MOVE_PLAYER_FORWARD' });
        } else if (movementY > 0) {
            dispatch({ type: 'MOVE_PLAYER_BACKWARD' });
        }

        if (movementX !== 0) {
            setTimeout(() => {
                dispatch({ type: 'STOP_PLAYER_DIRECTION' });
            }, 30);
        }

        if (movementY !== 0) {
            setTimeout(() => {
                dispatch({ type: 'STOP_PLAYER_SPEED' });
            }, 30);
        }
    };
};
