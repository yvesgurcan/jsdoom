import { miniMapScale } from './constants';
import getElementById from './getElementById';
import { getState } from './store';

export default () => {
    // the actual map
    const miniMap = getElementById('minimap');
    // the container div element
    // const miniMapCtr = getElementById('minimapcontainer');
    // the canvas used for drawing the objects on the map (player character, etc)
	const miniMapObjects = getElementById('minimapobjects');

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
    
    /*
        // minimap CSS dimensions
        const w = `${mapWidth * miniMapScale}px`; 	
        const h = `${mapHeight * miniMapScale}px`;
        miniMap.style.width = miniMapObjects.style.width = miniMapCtr.style.width = w;
        miniMap.style.height = miniMapObjects.style.height = miniMapCtr.style.height = h;
    */

	const ctx = miniMap.getContext('2d');

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(
        0,
        0,
        miniMap.width,
        miniMap.height,
    );

    const { wallMap: map } = getState();

	// loop through all blocks on the map
	for (let y = 0; y < mapHeight; y++) {
		for (let x = 0; x < mapWidth; x++) {
			const wall = map[y][x];

            // draw a block on the minimap if there is a wall block at these coordinates
			if (wall !== 0) {
                ctx.fillStyle = 'rgb(255, 0, 0)';
				ctx.fillRect(				
					x * miniMapScale,
					y * miniMapScale,
                    miniMapScale,
                    miniMapScale,
				);
			}
		}
	}
};
