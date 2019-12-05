import { stripWidth } from './constants';
import getElementById from './util/getElementById';
import createElement from './createElement';
import { getState } from './store';

export default () => {
    const screenStrips = getElementById('strips');
    const {
        view: { screenWidth }
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
};
