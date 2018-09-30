import getElementById from './getElementById';
import { dispatch } from './store';

export default state => {
    document.onclick = event => {
        const viewport = getElementById('viewport');
        if (document.pointerLockElement !== viewport) {
            viewport.requestPointerLock();
        }
    };

    document.onmousedown = event => {
        dispatch({ type: 'START_PLAYER_FIRE' });
    };

    document.onmouseup = event => {
        dispatch({ type: 'STOP_PLAYER_FIRE' });
    };

    document.onmousemove = event => {
        const {
            movementX,
            movementY,
        } = event;

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
