import { miniMapScale } from '../constants';
import getElementById from '../getElementById';
import { getState } from '../store';

export default () => {
    // the actual map
    const miniMap = getElementById('minimap');
    const grid = getElementById('grid');
    
    // the canvas used for drawing the objects on the map (player character, etc)
	const miniMapObjects = getElementById('minimapobjects');

    const {
        automap: {
            backgroundColor,
            wallColor,
            gridColor,
        },
        map: {
            mapWidth,
            mapHeight,
        },
    } = getState();

    // resize the internal canvas dimensions 
    miniMap.width = mapWidth * miniMapScale;
	miniMap.height = mapHeight * miniMapScale;	
    
    // resize the object canvas
	miniMapObjects.width = miniMap.width;
    miniMapObjects.height = miniMap.height;

    // resize the grid canvas
	grid.width = mapWidth * miniMapScale;
    grid.height = mapHeight * miniMapScale;
    
    /*
        // minimap CSS dimensions
        const w = `${mapWidth * miniMapScale}px`; 	
        const h = `${mapHeight * miniMapScale}px`;
        miniMap.style.width = miniMapObjects.style.width = miniMapCtr.style.width = w;
        miniMap.style.height = miniMapObjects.style.height = miniMapCtr.style.height = h;
    */

	const canvas = miniMap.getContext('2d');
	const gridCanvas = grid.getContext('2d');

    // set the background
	canvas.fillStyle = backgroundColor;
	canvas.fillRect(
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
                canvas.fillStyle = wallColor;
				canvas.fillRect(				
					x * miniMapScale,
					y * miniMapScale,
                    miniMapScale,
                    miniMapScale,
				);
            }
            
            // grid
            gridCanvas.fillStyle = gridColor;
            gridCanvas.fillRect(
                x * miniMapScale,
                1,
                1,
                miniMap.height,
            );
        }

        // grid
        gridCanvas.fillStyle = gridColor;
        gridCanvas.fillRect(
            1,
            y * miniMapScale,
            miniMap.width,
            1,
        );
	}
};
