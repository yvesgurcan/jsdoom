import {
    screenWidth,
    screenHeight,
    viewDist,
} from './constants';
import { getState } from './store';

export default () => {
    const {
        player,
        visibleSprites,
        oldVisibleSprites,
    } = getState();
	for (let i = 0; i < visibleSprites.length; i++) {
		const sprite = visibleSprites[i];
		const img = sprite.img;
		img.style.display = 'block';

		// translate position to viewer space
		const dx = (sprite.x + 0.5) - player.x;
		const dy = (sprite.y + 0.5) - player.y;

		// distance to sprite
		const dist = Math.sqrt((dx * dx) + (dy * dy));

		// sprite angle relative to viewing angle
		const spriteAngle = Math.atan2(dy, dx) - player.rot;

		// size of the sprite
		const size = viewDist / (Math.cos(spriteAngle) * dist);

		if (size <= 0) {
            /* eslint-disable-next-line */
            continue;
        }

		// x-position on screen
		const x = Math.tan(spriteAngle) * viewDist;

		img.style.left = `${((screenWidth / 2) + x) - (size / 2)}px`;

		// y is constant since we keep all sprites at the same height and vertical position
		img.style.top = `${(screenHeight - size) / 2}px`;

		img.style.width = `${size}px`;
		img.style.height = `${size}px`;

		const dbx = sprite.x - player.x;
		const dby = sprite.y - player.y;
		const blockDist = (dbx * dbx) + (dby * dby);
		img.style.zIndex = -Math.floor(blockDist * 1000);
	}

    // hide the sprites that are no longer visible
	for (let i = 0; i < oldVisibleSprites.length; i++) {
		const sprite = oldVisibleSprites[i];
		if (visibleSprites.indexOf(sprite) < 0) {
			sprite.visible = false;
			sprite.img.style.display = 'none';
		}
    }
};
