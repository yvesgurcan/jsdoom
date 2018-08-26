import {
    statusBarPath,
    imgExt,
} from '../constants';
import getElementById from '../getElementById';

export default () => {
    const statusBar = getElementById('statusbar');
    const statusBarBackground = new Image();
    statusBarBackground.src = `${statusBarPath}/STBAR${imgExt}`;
    statusBarBackground.style.width = '100%';
    statusBar.appendChild(statusBarBackground);
};
