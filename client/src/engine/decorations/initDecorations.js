import initSprites from '../initSprites';
import { dispatch } from '../store';

export default state => {
    const {
        constants: { DECORATION_PATH },
        wallMap: map,
        decorationTypes,
        decorationMap: decorations,
    } = state;

    const spriteMap = [];
    for (let y = 0; y < map.length; y++) {
		spriteMap[y] = [];
	}

    const decorationList = initSprites(decorations, decorationTypes, DECORATION_PATH, state, 'decorations', spriteMap);
    dispatch({ type: 'INIT_DECORATION_MAP', payload: decorationList });
    dispatch({ type: 'PLACE_DECORATIONS', payload: spriteMap });
};
