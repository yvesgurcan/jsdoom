import {
    map,
    mapWidth,
    mapHeight,
} from '../map/walls';
import store from './store';

const { getState } = store;

export default (x, y) => {
	// first make sure that we cannot move outside the boundaries of the level
	if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth) {
        return true;
    }

	const ix = Math.floor(x);
	const iy = Math.floor(y);

    console.log({ ix, iy });
    if (isNaN(iy) || isNaN(ix)) {
        return true;
    }

	// return true if the map block is not 0, ie. if there is a blocking wall.
	if (map[iy][ix] !== 0) {
        return true;
    }

    const { spriteMap } = getState();
	if (spriteMap[iy][ix] && spriteMap[iy][ix].block) {
        return true;
    }

	return false;
};
