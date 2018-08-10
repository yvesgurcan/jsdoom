const initState = [];

export default (prevState = initState, action) => {
    const {
        type,
        spriteMap,
    } = action;
    const nextState = { ...prevState };

    switch (type) {
        case 'SPRITE_MAP_SET': {
            return {
                ...prevState,
                ...spriteMap,
            };
        }
        default: {
            return nextState;
        }
    }
};
