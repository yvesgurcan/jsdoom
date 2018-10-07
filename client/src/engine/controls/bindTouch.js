import startFiring from '../weapons/startFiring';
import stopFiring from '../weapons/stopFiring';
import { getState, dispatch } from '../store';

export default state => {
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
        }
    };
};
