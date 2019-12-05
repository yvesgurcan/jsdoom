import decorationTypes from '../../types/decorations';

const initState = { ...decorationTypes };

export default (prevState = initState, action) => {
    const { type, payload } = action;

    const nextState = { ...prevState };
    switch (type) {
        case 'SET_DECORATION_TYPES': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
