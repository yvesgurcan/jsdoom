const initState = 1000 / 30;
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'INIT_GAME_CYCLE_DELAY': {
            return payload;
        }
        default: {
            return prevState;
        }
    }
};
