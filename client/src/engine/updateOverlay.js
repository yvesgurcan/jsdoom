import getElementById from './getElementById';

export default (fps) => {
    const overlay = getElementById('overlay');
	overlay.innerHTML = fps.toFixed(1);
};
