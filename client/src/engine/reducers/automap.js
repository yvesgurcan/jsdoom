const initState = {
    showAutomap: false,
};

export default (prevState = initState, action) => {
    const {
        type,
    } = action;

    const nextState = { ...prevState };
    switch (type) {
        case 'TOGGLE_AUTOMAP': {
            return {
                ...prevState,
                showAutomap: !prevState.showAutomap,
            };
        }
        case 'TURN_OFF_AUTOMAP': {
            return {
                ...prevState,
                showAutomap: false,
            };
        }
        default: {
            return nextState;
        }
    }
};
