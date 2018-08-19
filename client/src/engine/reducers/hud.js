const initState = {
    showFPS: true,
};
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        default: return prevState;
        case 'SET_HUD': {
            return { ...payload };
        }
        case 'TOGGLE_FPS': {
            return {
                ...prevState,
                showFPS: !prevState.showFPS,
            };
        }
    }
};
