import itemTypes from '../../types/items';

const initState = { ...itemTypes };

export default (prevState = initState, action) => {
    const { type } = action;

    switch (type) {
        default:
            return prevState;
    }
};
