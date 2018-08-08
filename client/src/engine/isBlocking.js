import {
    map,
    mapWidth,
    mapHeight,
} from './map';

export default (x, y) => {
	// first make sure that we cannot move outside the boundaries of the level
	if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth)
		return true;

	// return true if the map block is not 0, ie. if there is a blocking wall.
	return (map[Math.floor(y)][Math.floor(x)] != 0);
}