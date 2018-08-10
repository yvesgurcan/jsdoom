import getElementById from './getElementById';
import createElement from './createElement';
import { stripWidth } from './constants';
import store from './store';

const { dispatch, getState } = store;

export default () => {
    const screen = getElementById('scene');

    const { screen: screenState } = getState();
    const { width: screenWidth } = screenState;

    const strips = [];
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
			src: '',
		};

		strips.push(strip);
        screen.appendChild(strip);
    }
    dispatch({ type: 'SCREEN_SET_STRIPS', strips });

    // overlay div for adding text like fps count, etc.
	const overlay = createElement('div');
	overlay.id = 'overlay';
	overlay.style.display = 'block';
    screen.appendChild(overlay);

};
