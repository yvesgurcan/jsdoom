import initSprites from '../initSprites';
import { dispatch } from '../store';

export default state => {
    const {
        constants: { DECORATION_PATH },
        wallMap: map,
        decorationTypes,
        decorations,
    } = state;

    const spriteMap = [];
    for (let y = 0; y < map.length; y++) {
        spriteMap[y] = [];
    }

    // generate blockmap
    for (let i = 0; i < decorations.length; i++) {
        const decoration = { ...decorations[i] };

        if (!decoration.type) {
            console.error(`initDecorations(): Could not find sprite type '${decoration.type}' for sprite at {x: ${decoration.x}, y: ${decoration.y}}`);
            /* eslint-disable-next-line */
            continue;
        }

        const decorationType = decorationTypes[decoration.type];
        if (decorationType.block) {
            spriteMap[decoration.y][decoration.x] = {
                block: true,
            };
        }
    }

    const decorationList = initSprites(decorations, decorationTypes, DECORATION_PATH, state, 'decorations');
    dispatch({ type: 'INIT_DECORATION_MAP', payload: decorationList });
    dispatch({ type: 'PLACE_DECORATIONS', payload: spriteMap });
};
