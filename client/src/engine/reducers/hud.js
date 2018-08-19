const initState = {
    showFPS: true,
};
export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case 'SET_HUD': {
            return { ...payload };
        }
        case 'TOGGLE_FPS': {
            return {
                ...prevState,
                showFPS: !prevState.showFPS,
            };
        }
        default: {
            return prevState;
        }
    }
};
