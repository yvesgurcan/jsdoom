import getElementById from './getElementById';
import createElement from './createElement';
import { map } from '../map/walls';
import itemTypes from '../resources/items';
import mapItems from '../map/items';
import store from './store';

const { dispatch } = store;

export default () => {
    const spriteMap = [];
	for (let y = 0; y < map.length; y++) {
		spriteMap[y] = [];
    }

	const screen = getElementById('screen');

	for (let i = 0; i < mapItems.length; i++) {
		const sprite = mapItems[i];
		const itemType = itemTypes[sprite.type];
		const img = createElement('img');
		img.src = itemType.img;
		img.style.display = 'none';
		img.style.position = 'absolute';

		sprite.visible = false;
		sprite.block = itemType.block;
		sprite.img = img;

		spriteMap[sprite.y][sprite.x] = sprite;
		screen.appendChild(img);
    }
    
    dispatch({ type: 'SPRITE_MAP_SET', spriteMap });
};
