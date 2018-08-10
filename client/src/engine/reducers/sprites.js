const initState = {
    visibleSprites: [],
    oldVisibleSprites: [],
};

export default (prevState = initState, action) => {
    const {
        type,
        visibleSprites,
        oldVisibleSprites,
    } = action;
    const nextState = { ...prevState };

    switch (type) {
        case 'SPRITES_SET': {
            return {
                ...prevState,
                visibleSprites,
                oldVisibleSprites,
            };
        }
        default: {
            return nextState;
        }
    }
};
