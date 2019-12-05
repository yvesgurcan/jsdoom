const initState = {
    volume: 0
};

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;
    const { touch } = payload;

    switch (type) {
        default:
            return prevState;
        case 'REGISTER_TOUCH': {
            return {
                ...prevState,
                ...touch
            };
        }
        case 'UNREGISTER_TOUCH': {
            return null;
        }
    }
};
