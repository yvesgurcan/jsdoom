import { getState, dispatch } from './store';
import checkCollision from './collisions/checkCollision';

export default (entityType, entity, timeDelta, index) => {
    const {
        game: { delay }
    } = getState();

    if (delay <= 0) {
        console.error(
            'Invalid value: game.delay should be a number greater than zero.'
        );
        return false;
    }

    // time timeDelta has passed since we moved last time. We should have moved after time gameCycleDelay,
    // so calculate how much we should multiply our movement to ensure game speed is constant

    const updatedEntity = { ...entity };

    const mul = timeDelta / delay;

    let toX = updatedEntity.x;
    let toY = updatedEntity.y;
    let moveStep = 0;
    let rotation = 0;
    if (entity.strafe) {
        let reduceSpeed = 1;
        if (updatedEntity.dir !== 0 && updatedEntity.speed !== 0) {
            reduceSpeed = 2;
        }

        if (updatedEntity.dir !== 0) {
            moveStep =
                (mul * updatedEntity.dir * -1 * updatedEntity.moveSpeed * 1.2) /
                reduceSpeed;

            toX += Math.cos(updatedEntity.rot - Math.PI / 2) * moveStep;
            toY += Math.sin(updatedEntity.rot - Math.PI / 2) * moveStep;
        }
        if (updatedEntity.speed !== 0) {
            moveStep =
                (mul * updatedEntity.speed * updatedEntity.moveSpeed) /
                reduceSpeed;

            toX += Math.cos(updatedEntity.rot) * moveStep;
            toY += Math.sin(updatedEntity.rot) * moveStep;
        }
    } else {
        // entity will move this far along the current direction vector
        moveStep = mul * updatedEntity.speed * updatedEntity.moveSpeed;

        rotation = mul * updatedEntity.dir * updatedEntity.rotSpeed;

        updatedEntity.rotDeg += rotation; // add rotation if entity is rotating (entity.dir != 0)
        updatedEntity.rotDeg %= 360;

        if (updatedEntity.rotDeg < -180) updatedEntity.rotDeg += 360;
        if (updatedEntity.rotDeg >= 180) updatedEntity.rotDeg -= 360;

        const snap = (updatedEntity.rotDeg + 360) % 90;
        if (snap < 2 || snap > 88) {
            updatedEntity.rotDeg = Math.round(updatedEntity.rotDeg / 90) * 90;
        }

        updatedEntity.rot = (updatedEntity.rotDeg * Math.PI) / 180;

        // calculate new entity position with simple trigonometry
        toX += Math.cos(updatedEntity.rot) * moveStep;
        toY += Math.sin(updatedEntity.rot) * moveStep;
    }

    const pos = checkCollision(updatedEntity, { toX, toY }, 0.01);

    // set new position
    updatedEntity.x = pos.x;
    updatedEntity.y = pos.y;

    switch (entityType) {
        default:
            break;
        case 'enemy': {
            dispatch({
                type: 'UPDATE_ENEMY_COORDINATES',
                index,
                payload: { x: updatedEntity.x, y: updatedEntity.y }
            });
            break;
        }
        case 'player': {
            dispatch({
                type: 'SET_PLAYER_COORDINATES',
                payload: updatedEntity
            });
            break;
        }
    }

    return false;
};
