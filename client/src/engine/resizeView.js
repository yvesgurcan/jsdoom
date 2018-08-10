import initScreen from './initScreen';
import store from './store';

const { dispatch } = store;

function resizeView() {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    dispatch({ type: 'SCREEN_RESIZE', width, height });
    initScreen();
}

export default () => {
    resizeView();

	window.onresize = function () {
        resizeView();
	};
};
