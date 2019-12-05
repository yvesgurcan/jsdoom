import { stripWidth, fov } from '../constants';

const initState = {
    screenWidth: 320,
    screenHeight: 200
};

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;
    const { screenWidth, screenHeight } = payload;
    const nextState = { ...prevState };

    switch (type) {
        case 'SET_VIEW_SIZE': {
            const numRays = Math.ceil(screenWidth / stripWidth);
            const viewDist = screenWidth / 2 / Math.tan(fov / 2);
            return {
                ...prevState,
                screenWidth,
                screenHeight,
                numRays,
                viewDist
            };
        }
        default: {
            return nextState;
        }
    }
};
