import { miniMapScale } from './constants';
import getElementById from './getElementById';
import { getState } from './store';

export default () => {
	const miniMapObjects = getElementById('minimapobjects');

    const {
        player,
        automap: {
            showAutomap,
            revealThings,
        },
    } = getState();

    if (!showAutomap) {
        return false;
    }
    
	const objectCtx = miniMapObjects.getContext('2d');
	miniMapObjects.width = miniMapObjects.width;

    const playerSquare = {
        x: player.x * miniMapScale,
        y: player.y * miniMapScale,
        scale: miniMapScale * 0.5
    };

    // draw a dot at the current player position
    objectCtx.fillStyle = 'white';
	objectCtx.fillRect(		
		playerSquare.x - (playerSquare.scale / 2), 
		playerSquare.y - (playerSquare.scale / 2),
        playerSquare.scale,
        playerSquare.scale,
	);

    /*
        objectCtx.strokeStyle = 'white';
        objectCtx.beginPath();
        objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
        objectCtx.lineTo(
            (player.x + (Math.cos(player.rot) * 1)) * miniMapScale,
            (player.y + (Math.sin(player.rot) * 1)) * miniMapScale
        );
        objectCtx.closePath();
        objectCtx.stroke();
    */

    const { enemyMap: enemies } = getState();

    if (revealThings) {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            objectCtx.fillStyle = 'blue';
            // draw a dot at the enemy position
            objectCtx.fillRect(
                (enemy.x * miniMapScale) - 2, 
                (enemy.y * miniMapScale) - 2,
                miniMapScale * 0.5,
                miniMapScale * 0.5,
            );
        }    
    }
};
