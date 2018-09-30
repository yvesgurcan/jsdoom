import { getState } from '../store';

export default () => {
    const {
        player,
        visibleDecorations,
        view: {
            screenWidth,
            screenHeight,
            viewDist,
        },
        automap: { showAutomap },
    } = getState();

    if (showAutomap) {
        return false;
    }

	for (let i = 0; i < visibleDecorations.length; i++) {
		const sprite = visibleDecorations[i];
        const img = sprite.img;
        if (img.style.display !== 'block') {
            img.style.display = 'block';
        }

		// translate position to viewer space
		const dx = (sprite.x + 0.5) - player.x;
		const dy = (sprite.y + 0.5) - player.y;

		// distance to sprite
		const dist = Math.sqrt((dx * dx) + (dy * dy));

		// sprite angle relative to viewing angle
		const spriteAngle = Math.atan2(dy, dx) - player.rot;

		// size of the sprite
        const naturalHeight = img.naturalHeight;
        const naturalWidth = img.naturalWidth;

        const size = viewDist / (Math.cos(spriteAngle) * dist);
        const height = (viewDist / (Math.cos(spriteAngle) * dist)) * (naturalHeight / 52);
        const width = (viewDist / (Math.cos(spriteAngle) * dist)) * (naturalWidth / 52);

        const heightOffset = (viewDist / (Math.cos(spriteAngle) * dist)) - height;

        // not visible
		if (size <= 0) {
            if (sprite.img.style.display !== 'none') {
                sprite.visible = false;
                sprite.img.style.display = 'none';
            }
            /* eslint-disable-next-line */
            continue;
        }

        if (sprite.img.style.display !== 'block') {
            sprite.visible = true;
			sprite.img.style.display = 'block';
        }

		// x-position on screen
		const x = Math.tan(spriteAngle) * viewDist;

		img.style.left = `${((screenWidth / 2) + x) - (width / 2)}px`;

		// y is constant since we keep all sprites at the same height and vertical position
		img.style.top = `${((screenHeight / 2) - (height / 3)) + (heightOffset / 1.5)}px`;

		img.style.width = `${width}px`;
		img.style.height = `${height}px`;

		const dbx = sprite.x - player.x;
		const dby = sprite.y - player.y;
		const blockDist = (dbx * dbx) + (dby * dby);
		img.style.zIndex = -Math.floor(blockDist * 1000);
	}
};
