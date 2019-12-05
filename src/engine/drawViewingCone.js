import getElementById from './util/getElementById';
import { getState } from './store';

export default (rayX, rayY) => {
    const {
        automap: { scale, showAutomap },
        player
    } = getState();

    if (!showAutomap) {
        return false;
    }

    const miniMapObjects = getElementById('minimapobjects');
    const objectCtx = miniMapObjects.getContext('2d');

    objectCtx.strokeStyle = 'rgba(0,100,0,0.3)';
    objectCtx.lineWidth = 1;
    objectCtx.beginPath();
    objectCtx.moveTo(
        player.x * scale + scale / 2,
        player.y * scale + scale / 2
    );
    objectCtx.lineTo(rayX * scale + scale / 2, rayY * scale + scale / 2);
    objectCtx.closePath();
    objectCtx.stroke();
    return true;
};
