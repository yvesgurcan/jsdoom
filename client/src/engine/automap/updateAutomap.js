import getElementById from '../getElementById';
import { getState } from '../store';

export default () => {
	const miniMapObjects = getElementById('minimapobjects');

    const {
        player,
        enemyMap: enemies,
        decorationMap,
        automap: {
            scale,
            showAutomap,
            showGrid,
            revealThings,
            playerColor,
            enemyColor,
            decorationColor,
        },
    } = getState();

    if (!showAutomap) {
        return false;
    }
    
	const objectCtx = miniMapObjects.getContext('2d');
	miniMapObjects.width = miniMapObjects.width;

    const playerSquare = {
        x: player.x * scale,
        y: player.y * scale,
    };

    // draw a dot at the player position
    objectCtx.fillStyle = playerColor;
	objectCtx.fillRect(		
		playerSquare.x - (scale / 2), 
		playerSquare.y - (scale / 2),
        scale,
        scale,
	);

    if (revealThings) {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const enemySquare = {
                x: enemy.x * scale,
                y: enemy.y * scale,
            };
            objectCtx.fillStyle = enemyColor;

            // draw a dot at the enemy position
            objectCtx.fillRect(
                enemySquare.x - (scale / 2), 
                enemySquare.y - (scale / 2),
                scale,
                scale,
            );
        }

        for (let i = 0; i < decorationMap.length; i++) {
            const decoration = decorationMap[i];
            const decorationSquare = {
                x: decoration.x * scale,
                y: decoration.y * scale,
            };
            objectCtx.fillStyle = decorationColor;

            // draw a dot at the decoration position
            objectCtx.fillRect(
                decorationSquare.x,
                decorationSquare.y,
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
