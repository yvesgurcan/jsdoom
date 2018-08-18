const initState = {
    showOverlay: true,
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
        default: {
            return prevState;
        }
    }
};
