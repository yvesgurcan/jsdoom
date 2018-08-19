import getElementById from './getElementById';
import logRemoveEvent from './logRemoveEvent';
import { getState, dispatch } from './store';

export default (message = '') => {
    dispatch({ type: 'ADD_LOG_EVENT', payload: message });
    const { log } = getState();
    const logMessages = getElementById('log');
    logMessages.innerHTML = log.join('<br/>');

    setTimeout(logRemoveEvent, 3000);    
    return true;
};
