const initState = [];
export default (prevState = initState, action) => {
    const {
        type,
        oldVisibleSprites,
    } = action;

    const nextState = [...prevState];
    switch (type) {
        case 'UPDATE_SPRITES': {
            return oldVisibleSprites;
        }
        default: {
            return nextState;
        }
    }
};
