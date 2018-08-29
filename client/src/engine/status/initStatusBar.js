import {
    statusBarPath,
    imgExt,
} from '../constants';
import getElementById from '../getElementById';

export default () => {
    const statusBar = getElementById('statusbar');
    const statusBarBackground = new Image();
    statusBarBackground.id = 'stbar';
    statusBarBackground.src = `${statusBarPath}/STBAR${imgExt}`;
    statusBarBackground.style.width = '100%';
    statusBar.appendChild(statusBarBackground);

    setTimeout(() => {
        const statusBarGrid = getElementById('statusbargrid');
        statusBarGrid.height = statusBarBackground.height;
    }, 50);
};
