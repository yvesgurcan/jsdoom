import {
    stripWidth,
    fov,
} from '../constants';

const initState = {
    strips: [],
};

export default (prevState = initState, action) => {
    const {
        type,
        strips,
        width,
        height,
    } = action;
    const nextState = { ...prevState };

    switch(type) {
        case 'SCREEN_SET_STRIPS': {
            return {
                ...prevState,
                strips,
            };
        }
        case 'SCREEN_RESIZE': {
            const numRays = Math.ceil(width / stripWidth);
            const viewDist = (width / 2) / Math.tan((fov / 2));
            return {
                ...prevState,
                width,
                height,
                numRays,
                viewDist,
            };
        }
        default: {
            return nextState;
        }
    }
}
