const initState = [];
export default (prevState = initState, action) => {
    const {
        type,
        visibleSprites,
    } = action;

    const nextState = [...prevState];
    switch (type) {
        case 'UPDATE_SPRITES': {
            return visibleSprites;
        }
        default: {
            return nextState;
        }
    }
};
