import getElementById from '../getElementById';
import logRemoveEvent from '../log/logRemoveEvent';
import { getState, dispatch } from '../store';

export default (message = '') => {
    dispatch({ type: 'ADD_LOG_EVENT', payload: message });
    const {
        log,
        gameCycle: { paused },
    } = getState();

    if (paused) {
        // return false;
    }

    const { length } = log;
    if (length > 2) {
        dispatch({ type: 'TRUNCATE_LOG' });
    }

    const logMessages = getElementById('log');
    logMessages.innerHTML = log.map(item => item.message).join('<br/>');

    const loggedMessage = log[length - 1];
    setTimeout(() => logRemoveEvent(loggedMessage.id), 3000);
    
    return true;
};
