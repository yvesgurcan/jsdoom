const initState = 0;

export default (prevState = initState, action) => {
    const {
        type,
        fps,
    } = action;

    switch (type) {
        case 'FPS_SET': {
            return fps;
        }
        default: {
            return prevState;
        }
    }
};
