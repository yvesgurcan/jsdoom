const initState = [];
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        default: return prevState;
        case 'ADD_LOG_EVENT': {
            return [
                ...prevState,
                payload,
            ];
        }
        case 'REMOVE_LOG_EVENT': {
            const nextState = prevState.filter((event, index) => index !== 0);
            return [...nextState];
        }
    }
};
