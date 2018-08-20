const initState = {
    // set the goal for max FPS
    delay: 1000 / 30,
    lastCycle: 0,
    lastRender: 0,
    paused: false,
};

export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        default: return prevState;
        case 'SET_LAST_GAME_CYCLE_TIME': {
            return {
                ...prevState,
                lastCycle: payload,
            };
        }
        case 'SET_LAST_RENDER_CYCLE_TIME': {
            return {
                ...prevState,
                lastRender: payload,
            };
        }
        case 'TOGGLE_PAUSE': {
            const now = new Date().getTime();
            return {
                ...prevState,
                paused: !prevState.paused,
                lastCycle: now,
            };
        }
    }
};
