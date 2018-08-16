import { getState } from './store';

export default (x, y) => {
    const {
        map: {
            mapHeight,
            mapWidth,
        },
        wallMap,
        decorationMapPlacement,
    } = getState();


    // first make sure that we cannot move outside the boundaries of the level
	if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth) {
        return true;
    }

	const ix = Math.floor(x);
	const iy = Math.floor(y);

    // return true if the map block is not 0, ie. if there is a blocking wall.
	if (wallMap[iy][ix] !== 0) {
        return true;
    }

	if (decorationMapPlacement[iy][ix] && decorationMapPlacement[iy][ix].block) {
        return true;
    }

	return false;
};
