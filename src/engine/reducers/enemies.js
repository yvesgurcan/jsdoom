import enemyMap from '../../maps/enemies';
import { MOVE_TIME } from '../constants';

const findEnemy = (enemies, enemyId) => {
    let foundIndex = null;
    const foundEnemy = enemies.find((e, i) => {
        if (e.id === enemyId) {
            foundIndex = i;
            return true;
        }
        return false;
    });

    return {
        foundEnemy,
        foundIndex
    };
};

const updateEnemySoundQueue = (enemy, soundType, newValue) => {
    const fixedSoundQueued =
        soundType === 'fixedInterval' ? newValue : enemy.fixedSoundQueued;
    const randomSoundQueued =
        soundType === 'randomInterval' ? newValue : enemy.randomSoundQueued;
    return {
        ...enemy,
        fixedSoundQueued,
        randomSoundQueued
    };
};

const initState = [...enemyMap];
export default (prevState = initState, action) => {
    const { type, payload = {}, index } = action;

    const {
        x,
        y,
        rotDeg,
        rot,
        speed,
        walkFrame,
        direction,
        enemyId,
        soundType
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
                        y
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
                        direction,
                        nextMotion:
                            !enemy.nextMotion || enemy.nextMotion <= 0
                                ? MOVE_TIME + MOVE_TIME * Math.random()
                                : enemy.nextMotion - 100
                    };
                }
                return enemy;
            });
            return nextState;
        }
        case 'SET_ENEMY_ACTIVE_SOUND': {
            const { foundEnemy, foundIndex } = findEnemy(prevState, enemyId);
            if (foundEnemy === undefined || foundIndex === null) {
                console.error(
                    `enemies reducer: Could not find enemy with id '${enemyId}'.`
                );
                return prevState;
            }

            const enemy = updateEnemySoundQueue(foundEnemy, soundType, true);
            const nextState = [...prevState];
            nextState[foundIndex] = enemy;
            return nextState;
        }
        case 'UNSET_ENEMY_ACTIVE_SOUND': {
            const { foundEnemy, foundIndex } = findEnemy(prevState, enemyId);
            if (foundEnemy === undefined || foundIndex === null) {
                console.error(
                    `enemies reducer: Could not find enemy with id '${enemyId}'.`
                );
                return prevState;
            }

            const enemy = updateEnemySoundQueue(foundEnemy, soundType, false);
            const nextState = [...prevState];
            nextState[foundIndex] = enemy;
            return nextState;
        }
        case 'STOP_ENEMY': {
            const nextState = prevState.map((enemy, i) => {
                if (i === index) {
                    return {
                        ...enemy,
                        state: 0,
                        speed: 0
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
