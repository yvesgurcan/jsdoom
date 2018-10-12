import { dispatch } from '../store';
import deleteElementById from '../util/deleteElementById';

const touchItems = state => {
    const {
        constants: { FRAC_UNIT },
        player: { x, y },
        items,
    } = state;
    return items.filter(item => {
        const { x: thingX, y: thingY, radius = FRAC_UNIT / 2 } = item;
        const convertedRadius = (radius * 2) / FRAC_UNIT;
        if (thingX >= x - convertedRadius && thingX <= x + convertedRadius) {
            if (thingY >= y - convertedRadius && thingY <= y + convertedRadius) {
                return true;
            }
        }

        return false;
    });
};

export default state => {
    const items = touchItems(state);
    if (items.length > 0) {
        dispatch({ type: 'PICK_UP_ITEMS', payload: { items } });
        for (let i = 0; i < items.length; i++) {
            deleteElementById(items[i].id);
        }
    }
};
