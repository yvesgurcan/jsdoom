import getElementById from './getElementById';
import { getState } from './store';

export default (rayX, rayY) => {
    const {
        automap: {
            scale,
            showAutomap
        },
        player,
    } = getState();
    
    if (!showAutomap) {
        return false;
    }

	const miniMapObjects = getElementById('minimapobjects');
	const objectCtx = miniMapObjects.getContext('2d');


	objectCtx.strokeStyle = 'rgba(0,100,0,0.3)';
	objectCtx.lineWidth = 0.5;
	objectCtx.beginPath();
	objectCtx.moveTo(player.x * scale, player.y * scale);
	objectCtx.lineTo(
		rayX * scale,
		rayY * scale
	);
	objectCtx.closePath();
    objectCtx.stroke();
    return true;
};
