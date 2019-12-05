const initState = {
    volume: 0
};

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;
    const { volume } = payload;

    switch (type) {
        default:
            return prevState;
        case 'SET_SOUND_VOLUME': {
            return {
                ...prevState,
                volume
            };
        }
    }
};
