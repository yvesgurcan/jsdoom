import decorations from '../../maps/decorations';

const initState = [...decorations];
export default (prevState = initState, action) => {
    const { type, payload } = action;

    const nextState = [...prevState];
    switch (type) {
        case 'INIT_DECORATION_MAP': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
