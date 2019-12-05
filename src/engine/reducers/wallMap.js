import { wallMap } from '../../maps/walls';

const initState = [...wallMap];
export default (prevState = initState, action) => {
    const { type, payload } = action;

    const nextState = [...prevState];
    switch (type) {
        case 'INIT_WALL_MAP': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
