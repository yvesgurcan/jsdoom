import uuid4 from 'uuid4';
import {
    imgExt,
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
    const screen = getElementById('screen');
    
    const {
        wallMap: map,
        decorationTypes: itemTypes,
        decorationMap: mapItems,
    } = getState();

	for (let y = 0; y < map.length; y++) {
		spriteMap[y] = [];
	}

    let decorations = [];
	for (let i = 0; i < mapItems.length; i++) {
        const decoration = { ...mapItems[i] };
		const sprite = { ...decoration };
        const itemType = itemTypes[sprite.type];
        if (!itemType) {
            console.error(`Could not find decoration type '${sprite.type}' for decoration at {x: ${sprite.x}, y: ${sprite.y}}`);
            /* eslint-disable-next-line */
            continue;
        }

        const id = uuid4();

        const img = createElement('img');
        img.id = id;
        img.className = sprite.type;
		img.src = `${decorationPath}/${itemType.img}${imgExt}`;
		img.style.display = 'none';
		img.style.position = 'absolute';

		// sprite.visible = false;
		sprite.block = itemType.block;
		sprite.img = img;

		spriteMap[sprite.y][sprite.x] = sprite;
        screen.appendChild(img);

        decorations = [
            ...decorations,
            {
                ...decoration,
                id,
            },
        ];
    }
    
    dispatch({ type: 'INIT_DECORATION_MAP', payload: decorations });
    dispatch({ type: 'PLACE_DECORATIONS', payload: spriteMap });
};
