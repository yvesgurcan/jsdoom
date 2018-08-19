import getElementById from './getElementById';
import { getState, dispatch } from './store';

export default () => {
    dispatch({ type: 'REMOVE_LOG_EVENT' });
    const { log } = getState();
    const logMessages = getElementById('log');
    logMessages.innerHTML = log.join('<br/>');
    
    return true;
};
