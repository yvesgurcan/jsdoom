const initState = {
    keyPressCount: 0,
    history: [],
};
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        default: return prevState;
        case 'REGISTER_KEY_STROKE': {
            return {
                ...prevState,
                keyPressCount: prevState.keyPressCount + 1,
                history: [
                    ...prevState.history,
                    payload,
                ],
            };
        }
        case 'CLEAR_KEY_STROKES': {
            return {
                ...prevState,
                history: [],
            };
        }
    }
};
