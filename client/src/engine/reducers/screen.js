const initState = {
    strips: [],
};

export default (prevState = initState, action) => {
    const {
        type,
        strips,
    } = action;
    const nextState = { ...prevState };

    switch(type) {
        case 'SCREEN_SET_STRIPS': {
            return {
                ...prevState,
                strips,
            };
        }
        default: {
            return nextState;
        }
    }
}
