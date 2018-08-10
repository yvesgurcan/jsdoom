const initState = [];

export default (prevState = initState, action) => {
    const {
        type,
        enemies,
    } = action;
    const nextState = { ...prevState };

    switch (type) {
        case 'ENEMIES_SET': {
            return {
                ...prevState,
                ...enemies,
            };
        }
        default: {
            return nextState;
        }
    }
};
