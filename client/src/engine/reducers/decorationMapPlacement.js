const initState = [];
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    const nextState = [...prevState];
    switch (type) {
        case 'PLACE_DECORATIONS': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
