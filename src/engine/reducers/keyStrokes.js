const initState = {
    keyPressCount: 0,
    history: []
};
export default (prevState = initState, action) => {
    const { type, payload = {} } = action;

    const { keyCode } = payload;

    switch (type) {
        default:
            return prevState;
        case 'INCREMENT_KEYPRESS_COUNT': {
            return {
                ...prevState,
                keyPressCount: prevState.keyPressCount + 1
            };
        }
        case 'REGISTER_KEY_STROKE': {
            return {
                ...prevState,
                history: [...prevState.history, keyCode]
            };
        }
        case 'CLEAR_KEY_STROKES': {
            return {
                ...prevState,
                history: []
            };
        }
    }
};
