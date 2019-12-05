import initSprites from '../initSprites';
import { dispatch } from '../store';

export default state => {
    const {
        constants: { DECORATION_PATH },
        decorationTypes,
        decorations
    } = state;

    const decorationList = initSprites(
        decorations,
        decorationTypes,
        DECORATION_PATH,
        state,
        'decorations'
    );
    dispatch({ type: 'INIT_DECORATION_MAP', payload: decorationList });
};
