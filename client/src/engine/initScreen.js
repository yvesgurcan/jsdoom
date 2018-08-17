import {
    stripWidth,
} from './constants';
import getElementById from './getElementById';
import createElement from './createElement';
import { getState } from './store';

export default () => {
	const screenStrips = getElementById('strips');

    const {
        hud: { showOverlay },
        view: { screenWidth },
    } = getState();

	for (let i = 0; i < screenWidth; i += stripWidth) {
		const strip = createElement('img');
		strip.style.position = 'absolute';
		strip.style.height = '0px';
		strip.style.left = strip.style.top = '0px';

		strip.oldStyles = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			clip: '',
			src: ''
		};

		screenStrips.appendChild(strip);
	}

	// overlay div for adding text like fps count, etc.
	const screen = getElementById('screen');
	const overlay = createElement('div');
	overlay.id = 'overlay';
	overlay.style.display = showOverlay ? 'block' : 'none';
	screen.appendChild(overlay);
};
