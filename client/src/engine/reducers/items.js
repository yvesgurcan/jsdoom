import items from '../../maps/items';

const initState = [...items];

export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        default: return prevState;
        case 'INIT_ITEMS': {
            return [...payload];
        }
    }
};
