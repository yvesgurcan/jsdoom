import getElementById from './getElementById';
import createElement from './createElement';
import { stripWidth } from './constants';
import store from './store';
const { dispatch, getState } = store;

export default () => {
	let screen = getElementById('screen');

    const { screen: screenState } = getState();
    const { width: screenWidth } = screenState;

    let strips = [];
	for (let i = 0; i < screenWidth; i += stripWidth) {
		let strip = createElement('div');
		strip.style.position = 'absolute';
		strip.style.left = i + 'px';
		strip.style.width = stripWidth+'px';
		strip.style.height = '0px';
		strip.style.overflow = 'hidden';

		strip.style.backgroundColor = 'magenta';

		var img = new Image();
		img.src = (window.opera ? 'walls-19-colors.png' : 'walls.png');
		img.style.position = 'absolute';
		img.style.left = '0px';

        strip.appendChild(img);
        // assign the image to a property on the strip element so we have easy access to the image later
		strip.img = img;	

		strips.push(strip);
        screen.appendChild(strip);
    }
    dispatch({ type: 'SCREEN_SET_STRIPS', strips });

}
