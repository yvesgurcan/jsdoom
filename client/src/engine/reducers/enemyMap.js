import enemyMap from '../../maps/enemies';

const initState = [...enemyMap];
export default (prevState = initState, action) => {
    const {
        type,
        payload,
        index,
    } = action;

    switch (type) {
        case 'INIT_ENEMY_MAP': {
            return payload;
        }
        case 'SET_ENEMY_COORDINATES': {
            const nextState = prevState.map((enemy, i) => {
                if (i === index) {
                    return payload;
                }
                return enemy;
            });
            return nextState;
        }
        default: {
            return prevState;
        }
    }
};
