import isBlocking from './isBlocking';
import { getState } from './store';

export default (fromX, fromY, toX, toY, radius) => {
    const {
        map: {
            mapHeight,
            mapWidth,
        },
    } = getState();

	const pos = {
		x: fromX,
		y: fromY
	};

	if (toY < 0 || toY >= mapHeight || toX < 0 || toX >= mapWidth) {
        return pos;
    }

	const blockX = Math.floor(toX);
	const blockY = Math.floor(toY);


	if (isBlocking(blockX, blockY)) {
		return pos;
    }

	pos.x = toX;
	pos.y = toY;

	const blockTop = isBlocking(blockX, blockY - 1);
	const blockBottom = isBlocking(blockX, blockY + 1);
	const blockLeft = isBlocking(blockX - 1, blockY);
	const blockRight = isBlocking(blockX + 1, blockY);

	if (blockTop !== 0 && toY - blockY < radius) {
		toY = pos.y = blockY + radius;
	}
	if (blockBottom !== 0 && (blockY + 1) - toY < radius) {
		toY = pos.y = (blockY + 1) - radius;
	}
	if (blockLeft !== 0 && toX - blockX < radius) {
		toX = pos.x = blockX + radius;
	}
	if (blockRight !== 0 && (blockX + 1) - toX < radius) {
		toX = pos.x = (blockX + 1) - radius;
	}

	// is tile to the top-left a wall
	if (isBlocking(blockX - 1, blockY - 1) !== 0 && !(blockTop !== 0 && blockLeft !== 0)) {
		const dx = toX - blockX;
		const dy = toY - blockY;
		if ((dx * dx) + (dy * dy) < radius * radius) {
			if (dx * dx > dy * dy) {
				toX = pos.x = blockX + radius;
			} else {
                toY = pos.y = blockY + radius;
            }
		}
	}
	// is tile to the top-right a wall
	if (isBlocking(blockX + 1, blockY - 1) !== 0 && !(blockTop !== 0 && blockRight !== 0)) {
		const dx = toX - (blockX + 1);
		const dy = toY - blockY;
		if ((dx * dx) + (dy * dy) < radius * radius) {
			if (dx * dx > dy * dy) {
				toX = pos.x = (blockX + 1) - radius;
			} else {
                toY = pos.y = blockY + radius;
            }
		}
	}
	// is tile to the bottom-left a wall
	if (isBlocking(blockX - 1, blockY + 1) !== 0 && !(blockBottom !== 0 && blockBottom !== 0)) {
		const dx = toX - blockX;
		const dy = toY - (blockY + 1);
		if ((dx * dx) + (dy * dy) < radius * radius) {
			if (dx * dx > dy * dy) {
				toX = pos.x = blockX + radius;
			} else {
                toY = pos.y = (blockY + 1) - radius;
            }
		}
	}
	// is tile to the bottom-right a wall
	if (isBlocking(blockX + 1, blockY + 1) !== 0 && !(blockBottom !== 0 && blockRight !== 0)) {
		const dx = toX - (blockX + 1);
		const dy = toY - (blockY + 1);
		if ((dx * dx) + (dy * dy) < radius * radius) {
			if (dx * dx > dy * dy) {
				toX = pos.x = (blockX + 1) - radius;
			} else {
                toY = pos.y = (blockY + 1) - radius;
            }
		}
	}

	return pos;
};
