import getWeaponSettings from './weapons/getWeaponSettings';
import getElementById from './getElementById';
import { getState, dispatch } from './store';

export default state => {
    document.onclick = event => {
        const viewport = getElementById('viewport');
        if (document.pointerLockElement !== viewport) {
            viewport.requestPointerLock();
        }
    };

    document.onmousedown = event => {
        const currentState = getState();
        const { game: { paused } } = currentState;

        if (paused) {
            return false;
        }

        dispatch({ type: 'START_PLAYER_FIRE' });
    };

    document.onmouseup = event => {
        const currentState = getState();
        const {
            game: { paused },
            weapons: { currentFireFrame },
        } = currentState;

        if (paused) {
            return false;
        }
        
        if (currentFireFrame !== 0) {
            dispatch({ type: 'WAIT_FOR_WEAPON_ANIMATION_END' });
            return false;
        }

        const weaponSettings = getWeaponSettings(currentState);
        if (!weaponSettings) {
            return false;
        }
    
        const { fireFrames } = weaponSettings;
        dispatch({ type: 'STOP_PLAYER_FIRE', currentFireFrame: fireFrames.length - 1 });
    };

    document.onmousemove = event => {
        const currentState = getState();
        const { game: { paused } } = currentState;

        if (paused) {
            return false;
        }

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
