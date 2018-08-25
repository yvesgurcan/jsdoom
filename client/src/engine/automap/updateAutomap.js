import { miniMapScale } from '../constants';
import getElementById from '../getElementById';
import { getState } from '../store';

export default () => {
	const miniMapObjects = getElementById('minimapobjects');

    const {
        player,
        enemyMap: enemies,
        decorationMap,
        automap: {
            showAutomap,
            showGrid,
            revealThings,
            backgroundColor,
            gridColor,
            playerColor,
            enemyColor,
            decorationColor,
        },
        map: {
            mapWidth,
            mapHeight,
        },
    } = getState();

    if (!showAutomap) {
        return false;
    }
    
	const objectCtx = miniMapObjects.getContext('2d');
	miniMapObjects.width = miniMapObjects.width;

    const scale = miniMapScale * 0.5;

    const playerSquare = {
        x: player.x * miniMapScale,
        y: player.y * miniMapScale,
    };

    // draw a dot at the player position
    objectCtx.fillStyle = playerColor;
	objectCtx.fillRect(		
		playerSquare.x - (scale / 2), 
		playerSquare.y - (scale / 2),
        scale,
        scale,
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

    if (revealThings) {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const enemySquare = {
                x: enemy.x * miniMapScale,
                y: enemy.y * miniMapScale,
            };
            objectCtx.fillStyle = enemyColor;

            // draw a dot at the enemy position
            objectCtx.fillRect(
                enemySquare.x + 2, 
                enemySquare.y + 2,
                scale,
                scale,
            );
        }

        for (let i = 0; i < decorationMap.length; i++) {
            const decoration = decorationMap[i];
            const decorationSquare = {
                x: decoration.x * miniMapScale,
                y: decoration.y * miniMapScale,
            };
            objectCtx.fillStyle = decorationColor;

            // draw a dot at the decoration position
            objectCtx.fillRect(
                decorationSquare.x + 2,
                decorationSquare.y + 2,
                scale,
                scale,
            );
        }
    }

    const grid = getElementById('grid');
    if (showGrid && grid.style.display !== 'block') {
        grid.style.display = 'block';
    } else if (!showGrid && grid.style.display !== 'none') {
        grid.style.display = 'none';
    }
};
