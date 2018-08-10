import getElementById from './getElementById';
import {
    map,
    mapWidth,
    mapHeight,
} from '../map/walls';
import { miniMapScale } from './constants';
import store from './store';

const { getState } = store;

export function drawRay(rayX, rayY) {
    const { player } = getState();

	const miniMapObjects = getElementById('minimapobjects');
	const objectCtx = miniMapObjects.getContext('2d');

	objectCtx.strokeStyle = 'rgba(0,100,0,0.3)';
	objectCtx.lineWidth = 0.5;
	objectCtx.beginPath();
	objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
	objectCtx.lineTo(
		rayX * miniMapScale,
		rayY * miniMapScale,
	);
	objectCtx.closePath();
	objectCtx.stroke();
}

export function updateMiniMap() {
	const miniMap = getElementById('minimap');
	const miniMapObjects = getElementById('minimapobjects');

	const objectCtx = miniMapObjects.getContext('2d');
	miniMapObjects.width = miniMapObjects.width;

    const { player } = getState();

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
		(player.y + (Math.sin(player.rot) * 4)) * miniMapScale,
	);
	objectCtx.closePath();
    objectCtx.stroke();
    
    const { enemies } = getState();

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
}

export function drawMiniMap() {
	// draw the topdown view minimap

	const miniMap = getElementById('minimap');			// the actual map
	const miniMapCtr = getElementById('minimapcontainer');		// the container div element
	const miniMapObjects = getElementById('minimapobjects');	// the canvas used for drawing the objects on the map (player character, etc)

	miniMap.width = mapWidth * miniMapScale;	// resize the internal canvas dimensions
	miniMap.height = mapHeight * miniMapScale;	// of both the map canvas and the object canvas
	miniMapObjects.width = miniMap.width;
    miniMapObjects.height = miniMap.height;
    
	// minimap CSS dimensions
	const w = `${mapWidth * miniMapScale}px`;
	const h = `${mapHeight * miniMapScale}px`;
	miniMap.style.width = miniMapObjects.style.width = miniMapCtr.style.width = w;
	miniMap.style.height = miniMapObjects.style.height = miniMapCtr.style.height = h;

	const ctx = miniMap.getContext('2d');

	ctx.fillStyle = 'white';
	ctx.fillRect(
        0,
        0,
        miniMap.width,
        miniMap.height,
    );

    const { spriteMap } = getState();

	// loop through all blocks on the map
	for (let y = 0; y < mapHeight; y++) {
		for (let x = 0; x < mapWidth; x++) {
			const wall = map[y][x];
            
            // if there is a wall block at this (x,y) ...
			if (wall !== 0) { 
                ctx.fillStyle = 'rgb(200,200,200)';
                // ... then draw a block on the minimap
				ctx.fillRect(				
					x * miniMapScale,
					y * miniMapScale,
                    miniMapScale,
                    miniMapScale,
				);
            }

            if (spriteMap && spriteMap[y] && spriteMap[y][x]) {
				ctx.fillStyle = 'rgb(100,200,100)';
				ctx.fillRect(
					(x * miniMapScale) + (miniMapScale * 0.25),
					(y * miniMapScale) + (miniMapScale * 0.25),
                    miniMapScale * 0.5,
                    miniMapScale * 0.5,
				);
			}
		}
	}

	updateMiniMap();
}
