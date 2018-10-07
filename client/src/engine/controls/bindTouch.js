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

    document.ontouchmove = event => {
        event.preventDefault();

        const { clientX, clientY } = event.changedTouches[0];
        const touchMove = {
            clientX,
            clientY,
            timestamp: (new Date()).getTime(),
        };

        console.log('touchMove', touchMove);

        const newState = getState();
        const { touch: touchStart } = newState;

        const diffX = touchMove.clientX - touchStart.clientX;
        const diffY = touchMove.clientY - touchStart.clientY;
        
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

        dispatch({ type: 'UNREGISTER_TOUCH' });

        /*
            startFiring(newState);
            stopFiring(newState);
        */

        dispatch({ type: 'STOP_PLAYER_DIRECTION' });
        dispatch({ type: 'STOP_PLAYER_SPEED' });
    };
};
