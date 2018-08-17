import { miniMapScale } from './constants';
import getElementById from './getElementById';
import { getState } from './store';
import updateMiniMap from './updateMiniMap';

export default () => {
	const miniMap = getElementById('minimap');			// the actual map
	const miniMapCtr = getElementById('minimapcontainer');		// the container div element
	const miniMapObjects = getElementById('minimapobjects');	// the canvas used for drawing the objects on the map (player character, etc)

    const {
        map: {
            mapWidth,
            mapHeight,
        },
    } = getState();

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

    const {
        decorationMapPlacement: spriteMap,
        wallMap: map,
    } = getState();

	// loop through all blocks on the map
	for (let y = 0; y < mapHeight; y++) {
		for (let x = 0; x < mapWidth; x++) {
			const wall = map[y][x];

            // draw a block on the minimap if there is a wall block at this (x, y)
			if (wall !== 0) {
                ctx.fillStyle = 'rgb(200, 200, 200)';
				ctx.fillRect(				
					x * miniMapScale,
					y * miniMapScale,
                    miniMapScale,
                    miniMapScale,
				);
			}

			if (spriteMap[y][x]) {
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
};
