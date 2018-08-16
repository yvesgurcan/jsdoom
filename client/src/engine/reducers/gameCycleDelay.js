const initState = 1000 / 30;
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'INIT_MAP': {
            return payload;
        }
        default: {
            return prevState;
        }
    }
};
