import enemyMap from '../../maps/enemies';

const initState = [...enemyMap];
export default (prevState = initState, action) => {
    const {
        type,
        payload = {},
        index,
    } = action;

    const {
        x,
        y,
        rotDeg,
        rot,
        speed,
        walkFrame,
    } = payload;

    switch (type) {
        case 'INIT_ENEMY_MAP': {
            return payload;
        }
        case 'UPDATE_ENEMY_COORDINATES': {
            const nextState = prevState.map((enemy, i) => {
                if (i === index) {
                    return {
                        ...enemy,
                        x,
                        y,
                    };
                }
                return enemy;
            });
            return nextState;
        }
        case 'MOVE_ENEMY': {
            const nextState = prevState.map((enemy, i) => {
                if (i === index) {
                    return {
                        ...enemy,
                        speed,
                        rotDeg,
                        rot,
                        walkFrame,
                    };
                }
                return enemy;
            });
            return nextState;           
        }
        case 'STOP_ENEMY': {
            const nextState = prevState.map((enemy, i) => {
                if (i === index) {
                    return {
                        ...enemy,
                        state: 0,
                        speed: 0,
                    };
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
