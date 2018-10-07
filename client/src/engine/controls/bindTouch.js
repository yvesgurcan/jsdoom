import startFiring from '../weapons/startFiring';
import stopFiring from '../weapons/stopFiring';
import { getState, dispatch } from '../store';

const TOUCH_OFFSET = 200;

export default () => {
    document.ontouchstart = event => {
        const { clientX, clientY } = event.touches[0];
        const touch = {
            clientX,
            clientY,
            timestamp: (new Date()).getTime(),
        };

        dispatch({ type: 'REGISTER_TOUCH', payload: { touch } });
    };


    document.ontouchend = event => {
        event.preventDefault();

        const { clientX, clientY } = event.changedTouches[0];
        const touchEnd = {
            clientX,
            clientY,
            timestamp: (new Date()).getTime(),
        };

        const newState = getState();
        const { touch: touchStart } = newState;

        const timeDiff = touchEnd.timestamp - touchStart.timestamp;

        dispatch({ type: 'UNREGISTER_TOUCH' });

        if (timeDiff < 200) {
            startFiring(newState);
            stopFiring(newState);
        } else {
            const diffX = touchEnd.clientX - touchStart.clientX;
            const diffY = touchEnd.clientY - touchStart.clientY;


            console.log({ diffX, diffY });

            if (diffX > 0 && diffY > -TOUCH_OFFSET && diffY < TOUCH_OFFSET) {
                dispatch({ type: 'ROTATE_PLAYER_RIGHT' });
            } else if (diffX < 0 && diffY > -TOUCH_OFFSET && diffY < TOUCH_OFFSET) {
                dispatch({ type: 'ROTATE_PLAYER_LEFT' });
            }
    
            if (diffY < 0 && diffX > -TOUCH_OFFSET && diffX < TOUCH_OFFSET) {
                dispatch({ type: 'MOVE_PLAYER_FORWARD' });
            } else if (diffY > 0 && diffX > -TOUCH_OFFSET && diffX < TOUCH_OFFSET) {
                dispatch({ type: 'MOVE_PLAYER_BACKWARD' });
            }
    
            if (clientX !== 0) {
                setTimeout(() => {
                    dispatch({ type: 'STOP_PLAYER_DIRECTION' });
                }, timeDiff / 1.5);
            }
    
            if (clientY !== 0) {
                setTimeout(() => {
                    dispatch({ type: 'STOP_PLAYER_SPEED' });
                }, timeDiff / 1.5);
            }
        }
    };
};
