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
	objectCtx.lineWidth = 10;
	objectCtx.beginPath();
	objectCtx.moveTo((player.x * scale) + 14, (player.y * scale) + 14);
	objectCtx.lineTo(
		(rayX * scale) + 14,
		(rayY * scale) + 14,
	);
	objectCtx.closePath();
    objectCtx.stroke();
    return true;
};
