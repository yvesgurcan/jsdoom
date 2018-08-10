const initState = 0;

export default (prevState = initState, action) => {
    const {
        type,
        lastGameCycleTime,
    } = action;

    switch (type) {
        case 'LAST_GAME_CYCLE_TIME_SET': {
            return lastGameCycleTime;
        }
        default: {
            return prevState;
        }
    }
};
