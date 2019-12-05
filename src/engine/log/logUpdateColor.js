import getElementById from '../util/getElementById';
import { getState } from '../store';

export default () => {
    const {
        automap: { showAutomap }
    } = getState();
    const logMessages = getElementById('log');

    if (showAutomap && logMessages.style.color !== 'orange') {
        logMessages.style.color = 'orange';
    } else if (!showAutomap && logMessages.style.color !== 'red') {
        logMessages.style.color = 'red';
    }
};
