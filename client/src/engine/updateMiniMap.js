import { miniMapScale } from './constants';
import getElementById from './getElementById';
import { getState } from './store';

export default () => {
	const miniMapObjects = getElementById('minimapobjects');

    const { player } = getState();
    
	const objectCtx = miniMapObjects.getContext('2d');
	miniMapObjects.width = miniMapObjects.width;

    objectCtx.fillStyle = 'red';
    // draw a dot at the current player position
	objectCtx.fillRect(		
		(player.x * miniMapScale) - 2, 
		(player.y * miniMapScale) - 2,
        4,
        4,
	);

	objectCtx.strokeStyle = 'red';
	objectCtx.beginPath();
	objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
	objectCtx.lineTo(
		(player.x + (Math.cos(player.rot) * 4)) * miniMapScale,
		(player.y + (Math.sin(player.rot) * 4)) * miniMapScale
	);
	objectCtx.closePath();
	objectCtx.stroke();


    const { enemyMap: enemies } = getState();

	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];

        objectCtx.fillStyle = 'blue';
        // draw a dot at the enemy position
		objectCtx.fillRect(		
			(enemy.x * miniMapScale) - 2, 
			(enemy.y * miniMapScale) - 2,
            4,
            4,
		);
	}
};
