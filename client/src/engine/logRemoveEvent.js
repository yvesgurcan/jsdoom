import getElementById from './getElementById';
import { getState, dispatch } from './store';

const logRemoveEvent = id => {
    dispatch({ type: 'REMOVE_LOG_EVENT', payload: id });
    const {
        log,
        gameCycle: {
            delay,
            paused,
        },
    } = getState();

    if (paused) {
        setTimeout(logRemoveEvent, delay);
        return false;
    }

    const logMessages = getElementById('log');
    logMessages.innerHTML = log.map(item => item.message).join('<br/>');
    
    return true;
};

export default logRemoveEvent;
