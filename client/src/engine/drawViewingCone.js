import { miniMapScale } from './constants';
import getElementById from './getElementById';
import { getState } from './store';

export default (rayX, rayY) => {
    const {
        automap: { showAutomap },
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
	objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
	objectCtx.lineTo(
		rayX * miniMapScale,
		rayY * miniMapScale
	);
	objectCtx.closePath();
    objectCtx.stroke();
    return true;
};
