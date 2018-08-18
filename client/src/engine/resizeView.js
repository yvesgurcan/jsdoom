import { dispatch } from './store';
import initScreen from './initScreen';

function resizeView() {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;
    dispatch({ type: 'SET_VIEW_SIZE', payload: { screenWidth, screenHeight } });
}

export default () => {
    resizeView();

	window.onresize = function () {
        initScreen();
        resizeView();
	};
};
