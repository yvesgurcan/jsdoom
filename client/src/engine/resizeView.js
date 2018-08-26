import { dispatch, getState } from './store';
import initScreen from './initScreen';
import initAutomap from './automap/initAutomap';

function resizeView() {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;
    dispatch({ type: 'SET_VIEW_SIZE', payload: { screenWidth, screenHeight } });
}

export default () => {
    resizeView();

	window.onresize = function () {
        resizeView();
        initScreen();
        const { automap: { showAutomap } } = getState();
        if (showAutomap) {
            initAutomap();
        }
	};
};
