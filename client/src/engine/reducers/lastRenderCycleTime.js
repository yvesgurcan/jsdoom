const initState = 0;

export default (prevState = initState, action) => {
    const {
        type,
        lastRenderCycleTime,
    } = action;

    switch (type) {
        case 'LAST_RENDER_CYCLE_TIME_SET': {
            return lastRenderCycleTime;
        }
        default: {
            return prevState;
        }
    }
};
