const initState = [];
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        default: return prevState;
        case 'REGISTER_KEY_STROKE': {
            return [
                ...prevState,
                payload,
            ];
        }
        case 'CLEAR_KEY_STROKES': {
            return [];
        }
    }
};
