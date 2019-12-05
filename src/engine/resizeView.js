import { dispatch, getState } from './store';
import initScreen from './initScreen';
import initAutomap from './automap/initAutomap';
import getElementById from './util/getElementById';

const resizeView = () => {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;
    dispatch({ type: 'SET_VIEW_SIZE', payload: { screenWidth, screenHeight } });
};

const adjustStatusBarFiller = state => {
    const {
        constants: { STATUS_BAR_FILLER }
    } = state;
    const statusBarBackground = getElementById('statusbar');
    const statusBarContainer = getElementById('statusbarcontainer');
    statusBarContainer.style.backgroundImage = `url('${STATUS_BAR_FILLER}')`;
    statusBarContainer.style.height = statusBarBackground.offsetHeight;
};

export default () => {
    resizeView();

    window.onresize = function() {
        resizeView();
        initScreen();

        const state = getState();
        const {
            automap: { showAutomap }
        } = state;
        adjustStatusBarFiller(state);

        if (showAutomap) {
            initAutomap();
        }
    };
};
