const initState = 0;
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'SET_LAST_GAME_CYCLE_TIME': {
            return payload;
        }
        default: {
            return prevState;
        }
    }
};
