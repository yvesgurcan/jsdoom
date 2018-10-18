import { dispatch } from '../store';
import giveHealth from './giveHealth';
import giveArmor from './giveArmor';
import deleteElementById from '../util/deleteElementById';
import setColorMap from './setOverlay';

const applyItemEffectsToPlayer = (state, item) => {
    const pickedUpHealth = giveHealth(state, item);
    const pickedUpArmor = giveArmor(state, item);

    const pickedUp = pickedUpHealth || pickedUpArmor;
    if (pickedUp) {
        setColorMap(state);
    }

    return pickedUp;
};

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
        let itemsToPickUp = [];
        for (let i = 0; i < items.length; i++) {
            const pickedUp = applyItemEffectsToPlayer(state, items[i]);
            if (pickedUp) {
                itemsToPickUp = [
                    ...itemsToPickUp,
                    items[i],
                ];
                deleteElementById(items[i].id);
            }
        }

        if (itemsToPickUp.length > 0) {
            dispatch({ type: 'PICK_UP_ITEMS', payload: { items: itemsToPickUp } });
        }
    }
};