import decorationMap from '../../maps/decorations';

const initState = [...decorationMap];
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    const nextState = [...prevState];
    switch (type) {
        case 'SET_DECORATION_MAP': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
