import store from './store';
import getElementById from './getElementById';

const { getState } = store;

export default () => {
    const { fps } = getState();
    const overlay = getElementById('overlay');
	overlay.innerHTML = `FPS: ${fps.toFixed(1)}<br/>`;
};
