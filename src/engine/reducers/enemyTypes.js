import enemyTypes from '../../types/enemies';

const initState = { ...enemyTypes };

export default (prevState = initState, action) => {
    const { type, payload } = action;

    const nextState = { ...prevState };
    switch (type) {
        case 'SET_ENEMY_TYPES': {
            return payload;
        }
        default: {
            return nextState;
        }
    }
};
