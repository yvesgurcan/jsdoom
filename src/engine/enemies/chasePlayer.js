import move from '../move';
import pickDirection from './pickDirection';
import playActiveSound from './playActiveSound';
import { dispatch, getState } from '../store';

export default timeDelta => {
    const { enemies, enemyTypes, player } = getState();

    for (let index = 0; index < 3; index++) {
        const enemy = { ...enemies[index] };
        const enemyType = { ...enemyTypes[enemy.type] };

        if (enemy.awake) {
            playActiveSound(enemy, enemyType, index);

            const { rot, rotDeg, speed, direction } = pickDirection(
                enemy,
                player
            );

            const walkCycleTime = enemyType.walk.cycle;
            const numWalkSprites = enemyType.walk.count;

            const walkFrame =
                Math.floor(
                    (new Date() % walkCycleTime) /
                        (walkCycleTime / numWalkSprites)
                ) + 1;

            dispatch({
                type: 'MOVE_ENEMY',
                index,
                payload: { speed, rotDeg, rot, walkFrame, direction }
            });
            const updatedEnemy = {
                ...enemy,
                rotDeg,
                rot,
                speed,
                walkFrame
            };

            move('enemy', updatedEnemy, timeDelta, index);
        } else if (enemy.speed !== 0) {
            dispatch({ type: 'STOP_ENEMY', index });
        }
    }
};
