const blockedBy = (sourceId, things, { x, y }) => {
    return things.find(thing => thing.id !== sourceId && Math.floor(thing.x) === x && Math.floor(thing.y) === y);
};

export default (state, id, x, y) => {
    const {
        map: {
            mapHeight,
            mapWidth,
        },
        wallMap,
        decorations,
        enemies,
    } = state;


    // first make sure that we cannot move outside the boundaries of the level
	if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth) {
        return true;
    }

	const ix = Math.floor(x);
    const iy = Math.floor(y);
    
    const targetCoordinates = { x: ix, y: iy };

    // return true if the map block is not 0, ie. if there is a blocking wall.
	if (wallMap[iy][ix] !== 0) {
        return true;
    }

    if (!blockedBy(id, decorations, targetCoordinates)) {
        if (!blockedBy(id, enemies, targetCoordinates)) {
            return false;
        }
    }

    return true;
};
