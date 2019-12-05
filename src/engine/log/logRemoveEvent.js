import getElementById from '../util/getElementById';
import { getState, dispatch } from '../store';

const logRemoveEvent = id => {
    dispatch({ type: 'REMOVE_LOG_EVENT', payload: id });

    const { log } = getState();

    const logMessages = getElementById('log');
    logMessages.innerHTML = log.map(item => item.message).join('<br/>');

    return true;
};

export default logRemoveEvent;
