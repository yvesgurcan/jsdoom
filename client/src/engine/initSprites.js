import {
    ext,
    decorationPath,
} from './constants';
import {
    getState,
    dispatch,
} from './store';
import getElementById from './getElementById';
import createElement from './createElement';

export default () => {
    const spriteMap = [];
    
    const {
        wallMap: map,
        decorationTypes: itemTypes,
        decorationMapInit: mapItems,
    } = getState();

	for (let y = 0; y < map.length; y++) {
		spriteMap[y] = [];
	}

    const screen = getElementById('screen');

	for (let i = 0; i < mapItems.length; i++) {
		const sprite = { ...mapItems[i] };
        const itemType = itemTypes[sprite.type];
        if (!itemType) {
            console.error(`Could not find decoration type '${sprite.type}' for decoration at {x: ${sprite.x}, y: ${sprite.y}}`);
            /* eslint-disable-next-line */
            continue;
        }

		const img = createElement('img');
		img.src = `${decorationPath}/${itemType.img}${ext}`;
		img.style.display = 'none';
		img.style.position = 'absolute';

		sprite.visible = false;
		sprite.block = itemType.block;
		sprite.img = img;

		spriteMap[sprite.y][sprite.x] = sprite;
        screen.appendChild(img);
	}
    dispatch({ type: 'PLACE_DECORATIONS', payload: spriteMap });
};
