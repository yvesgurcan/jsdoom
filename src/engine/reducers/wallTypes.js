import wallTypes from '../../types/walls';

const initState = { ...wallTypes };

export default (prevState = initState, action) => {
    const { type, payload } = action;

    const nextState = { ...prevState };
    switch (type) {
        case 'SET_WALL_TYPES': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
