import getElementById from './getElementById';
import createElement from './createElement';
import {
    stripWidth,
    textureFolder
} from './constants';
import store from './store';
const { dispatch, getState } = store;

export default () => {
    let screen = getElementById('scene');
    screen.innerHTML = '';

    const { screen: screenState } = getState();
    const { width: screenWidth } = screenState;

    let strips = [];
	for (let i = 0; i < screenWidth; i += stripWidth) {
		let strip = createElement('div');
		strip.style.position = 'absolute';
		strip.style.left = i + 'px';
		strip.style.width = stripWidth + 'px';
		strip.style.overflow = 'hidden';
        strip.style.backgroundColor = 'magenta';

        if (i % 8 === 0) {
            // strip.style.backgroundColor = 'yellow';
        }

		let img = new Image();
		img.src = `${textureFolder}/ZZWOLF9.png`;
		img.style.position = 'absolute';

        strip.appendChild(img);
        // assign the image to a property on the strip element so we have easy access to the image later
		strip.img = img;	

		strips.push(strip);
        screen.appendChild(strip);
    }
    dispatch({ type: 'SCREEN_SET_STRIPS', strips });

}
