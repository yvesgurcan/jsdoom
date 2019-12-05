import { mapWidth, mapHeight } from '../../maps/walls';

const initState = {
    mapWidth,
    mapHeight
};
export default (prevState = initState, action) => {
    const { type, payload } = action;

    const nextState = { ...prevState };
    switch (type) {
        case 'INIT_MAP': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
