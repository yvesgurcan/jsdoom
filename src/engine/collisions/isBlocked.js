const FRAC_UNIT = 64;

const blockedBy = (sourceId, things, { x, y }, checkBlockFlag = false) => {
    return !!things.find(thing => {
        if (!checkBlockFlag || (checkBlockFlag && thing.block)) {
            if (thing.id !== sourceId) {
                const { x: thingX, y: thingY, radius = FRAC_UNIT / 2 } = thing;
                const convertedRadius = (radius * 2) / FRAC_UNIT;
                if (
                    thingX >= x - convertedRadius &&
                    thingX <= x + convertedRadius
                ) {
                    if (
                        thingY >= y - convertedRadius &&
                        thingY <= y + convertedRadius
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    });
};

export default (state, id, x, y) => {
    const {
        map: { mapHeight, mapWidth },
        wallMap,
        decorations,
        enemies,
        player
    } = state;

    // first make sure that we cannot move outside the boundaries of the level
    if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth) {
        return true;
    }

    const targetCoordinates = { x, y };

    const north = wallMap[Math.floor(y - 0.5)][Math.floor(x - 0.5)];
    if (north !== 0) {
        return true;
    }

    const south = wallMap[Math.floor(y + 0.5)][Math.floor(x + 0.5)];
    if (south !== 0) {
        return true;
    }

    const west = wallMap[Math.floor(y)][Math.floor(x - 0.5)];
    if (west !== 0) {
        return true;
    }

    const east = wallMap[Math.floor(y)][Math.floor(x + 0.5)];
    if (east !== 0) {
        return true;
    }

    // return true if the map block is not 0, ie. if there is a blocking wall.
    if (wallMap[Math.floor(y)][Math.floor(x)] !== 0) {
        return true;
    }

    if (!blockedBy(id, decorations, targetCoordinates, true)) {
        if (!blockedBy(id, enemies, targetCoordinates)) {
            if (!blockedBy(id, [player], targetCoordinates)) {
                return false;
            }
        }
    }

    return true;
};
