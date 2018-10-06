import getElementById from '../getElementById';

export default state => {
    const {
        items,
        player,
        view: {
            screenHeight,
            screenWidth,
            viewDist,
        },
        automap: { showAutomap },
    } = state;

    if (showAutomap) {
        return false;
    }

	for (let i = 0; i < items.length; i++) {  
        const item = { ...items[i] };
        const { id, x, y, oldStyles = {}, } = item;
        const img = getElementById(id);

        const dx = x - player.x;
        const dy = y - player.y;

        let angle = Math.atan2(dy, dx) - player.rot;

        if (angle < -Math.PI) angle += 2 * Math.PI;
        if (angle >= Math.PI) angle -= 2 * Math.PI;

		// is enemy in front of player? Maybe use the FOV value instead.
		if (angle > -Math.PI * 0.5 && angle < Math.PI * 0.5) {
			const distSquared = (dx * dx) + (dy * dy);
			const dist = Math.sqrt(distSquared);
			const size = viewDist / (Math.cos(angle) * dist);

            // not visible
			if (size <= 0) {
                if (img.style.display !== 'none') {
                    item.visible = false;
                    img.style.display = 'none';
                }
                /* eslint-disable-next-line */
                continue;
            }

            if (img.style.display !== 'block') {
                item.visible = true;
                img.style.display = 'block';
            }

			const renderX = Math.tan(angle) * viewDist;

			const style = img.style;

			// height is equal to the sprite size
			if (size !== oldStyles.height) {
				style.height = `${size}px`;
				oldStyles.height = size;
			}

			// top position is halfway down the screen, minus half the sprite height
			const styleTop = ((screenHeight - size) / 2);
			if (styleTop !== oldStyles.top) {
				style.top = `${styleTop}px`;
				oldStyles.top = styleTop;
			}

			// place at x position, adjusted for sprite size
			const styleLeft = (((screenWidth / 2) + renderX) - (size / 2));
			if (styleLeft !== oldStyles.left) {
				style.left = `${styleLeft}px`;
				oldStyles.left = styleLeft;
			}

			const styleZIndex = -(distSquared * 1000) >> 0;
			if (styleZIndex !== oldStyles.zIndex) {
				style.zIndex = styleZIndex;
				oldStyles.zIndex = styleZIndex;
			}

			const styleDisplay = 'block';
			if (styleDisplay !== oldStyles.display) {
				style.display = styleDisplay;
				oldStyles.display = styleDisplay;
			}
		} else {
			const styleDisplay = 'none';
			if (styleDisplay !== oldStyles.display) {
				img.style.display = styleDisplay;
				oldStyles.display = styleDisplay;
			}
		}
	}
};
