import player from '../../maps/player';

const initState = { ...player };

export default (prevState = initState, action) => {
    const {
        type,
        payload,
    } = action;

    const nextState = { ...prevState };
    switch (type) {
        case 'INIT_PLAYER': {
            return payload;
        }
        case 'MOVE_PLAYER': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
