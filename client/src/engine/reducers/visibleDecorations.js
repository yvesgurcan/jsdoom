const initState = [];
export default (prevState = initState, action) => {
    const {
        type,
        visibleDecorations,
    } = action;

    const nextState = [...prevState];
    switch (type) {
        case 'UPDATE_SPRITES': {
            return visibleDecorations;
        }
        default: {
            return nextState;
        }
    }
};
