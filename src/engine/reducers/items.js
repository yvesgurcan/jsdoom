import initItems from '../../maps/items';

const initState = [...initItems];

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;

    const { items } = payload;

    switch (type) {
        default:
            return prevState;
        case 'INIT_ITEMS': {
            return [...payload];
        }
        case 'PICK_UP_ITEMS': {
            const pickedUpIds = items.map(item => item.id);
            const remainingItems = prevState.filter(
                item => pickedUpIds.indexOf(item.id) === -1
            );
            return [...remainingItems];
        }
    }
};
