import initSprites from '../initSprites';
import { dispatch } from '../store';

export default state => {
    const {
        constants: { ITEM_PATH },
        itemTypes,
        items
    } = state;

    const itemList = initSprites(items, itemTypes, ITEM_PATH, state);
    dispatch({ type: 'INIT_ITEMS', payload: itemList });
};
