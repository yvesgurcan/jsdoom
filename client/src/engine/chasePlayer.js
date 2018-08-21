import move from './move';
import { dispatch, getState } from './store';

export default (timeDelta) => {
    const {
        enemyMap: enemies,
        enemyTypes,
        player,
    } = getState();
    
    for (let index = 0; index < 3; index++) {
        const enemy = { ...enemies[index] };
        const enemyType = { ...enemyTypes[enemy.type] };

        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.sqrt((dx * dx) + (dy * dy));
        if (dist > 1) {
            const rot = Math.atan2(dy, dx);
            const rotDeg = (rot * 180) / Math.PI;
            const speed = 1;

            const walkCycleTime = enemyType.walk.cycle;
            const numWalkSprites = enemyType.walk.count;

            const walkFrame = Math.floor((new Date() % walkCycleTime) / (walkCycleTime / numWalkSprites)) + 1;
            
            dispatch({ type: 'MOVE_ENEMY', index, payload: { speed, rotDeg, rot, walkFrame } });
            const updatedEnemy = {
                ...enemy,
                rotDeg,
                rot,
                speed,
                walkFrame,
            };

            move('enemy', updatedEnemy, timeDelta, index);
        } else if (enemy.speed !== 0) {
            dispatch({ type: 'STOP_ENEMY', index });
        }
    }
};
