import getElementById from './getElementById';
import { getState, dispatch } from './store';

export default id => {
    dispatch({ type: 'REMOVE_LOG_EVENT', payload: id });
    const { log } = getState();
    const logMessages = getElementById('log');
    logMessages.innerHTML = log.map(item => item.message).join('<br/>');
    
    return true;
};
