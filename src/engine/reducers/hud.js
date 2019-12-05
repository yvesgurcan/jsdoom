import { MUGSHOT_TIME } from '../constants';

const initState = {
    showFPS: true,
    hideStatusBar: false,
    nextMugShot: 0
};
export default (prevState = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        default:
            return prevState;
        case 'SET_HUD': {
            return { ...payload };
        }
        case 'TOGGLE_FPS': {
            return {
                ...prevState,
                showFPS: !prevState.showFPS
            };
        }
        case 'SET_NEXT_MUGSHOT': {
            return {
                ...prevState,
                nextMugShot:
                    prevState.nextMugShot <= 0
                        ? MUGSHOT_TIME
                        : prevState.nextMugShot - 1
            };
        }
        case 'TOGGLE_GODMODE': {
            return {
                ...prevState,
                nextMugShot: 0
            };
        }
    }
};
