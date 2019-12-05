import getElementById from '../util/getElementById';
import { getState, dispatch } from '../store';

export default () => {
    const {
        automap: { backgroundColor, wallColor, gridColor },
        map: { mapWidth, mapHeight }
    } = getState();

    // grab elements
    const automapContainer = getElementById('automapcontainer');
    const automap = getElementById('minimap');
    const grid = getElementById('grid');
    const autmapObjects = getElementById('minimapobjects');

    // get the biggest possible size for the canvas
    automap.style.width = '100%';
    automap.style.height = '100%';
    automap.width = automap.offsetWidth;
    automap.height = automap.offsetHeight;

    // reset CSS width and height
    automap.style.width = '';
    automap.style.height = '';

    // resize the grid canvas
    grid.width = automap.width;
    grid.height = automap.height;

    // resize the object canvas
    autmapObjects.width = automap.width;
    autmapObjects.height = automap.height;

    // set the scale to keep the same ratio for the drawing (everything should be square)
    let scaleY = automap.height / mapHeight;
    let scaleX = automap.width / mapWidth;
    if (scaleY > scaleX) {
        scaleY = scaleX;
        const usedHeight = scaleY * mapHeight;
        const marginHeight = automap.height - usedHeight;
        automapContainer.style.marginTop = marginHeight / 2;
    } else if (scaleY < scaleX) {
        scaleX = scaleY;
        const usedWidth = scaleX * mapWidth;
        const marginWidth = automap.width - usedWidth;
        automapContainer.style.marginLeft = marginWidth / 2;
    }

    const scale = scaleX;
    dispatch({ type: 'SET_AUTOMAP_SCALE', payload: { scale } });

    const automapCanvas = automap.getContext('2d');
    const gridCanvas = grid.getContext('2d');

    // set the background
    automapCanvas.fillStyle = backgroundColor;
    automapCanvas.fillRect(0, 0, automap.width, automap.height);

    const { wallMap: map } = getState();

    // loop through all blocks on the map
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const wall = map[y][x];

            // draw a block on the minimap if there is a wall block at these coordinates
            if (wall !== 0) {
                automapCanvas.fillStyle = wallColor;
                automapCanvas.fillRect(
                    x * scale + scale / 2,
                    y * scale + scale / 2,
                    scale + 1,
                    scale + 1
                );
            }

            // grid
            gridCanvas.fillStyle = gridColor;
            gridCanvas.fillRect(x * scale, 1, 1, mapHeight * scale - 1);
        }

        // grid
        gridCanvas.fillStyle = gridColor;
        gridCanvas.fillRect(1, y * scale, mapWidth * scale - 1, 1);
    }
};
