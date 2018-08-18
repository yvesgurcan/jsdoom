import {
    getState,
    dispatch,
} from './store';
import checkCollision from './checkCollision';

export default (entityType, entity, timeDelta, index) => {
    const { gameCycleDelay } = getState();
	// time timeDelta has passed since we moved last time. We should have moved after time gameCycleDelay, 
	// so calculate how much we should multiply our movement to ensure game speed is constant

    const updatedEntity = { ...entity };

	const mul = timeDelta / gameCycleDelay;

	const moveStep = mul * updatedEntity.speed * updatedEntity.moveSpeed;	// entity will move this far along the current direction vector

    const rotation = mul * updatedEntity.dir * updatedEntity.rotSpeed;

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
	const newX = updatedEntity.x + (Math.cos(updatedEntity.rot) * moveStep);	
	const newY = updatedEntity.y + (Math.sin(updatedEntity.rot) * moveStep);

	const pos = checkCollision(updatedEntity.x, updatedEntity.y, newX, newY, 0.01);

	updatedEntity.x = pos.x; // set new position
    updatedEntity.y = pos.y;

    if (moveStep !== 0 || rotation !== 0) {
        switch (entityType) {
            default: break;
            case 'enemy': {
                dispatch({ type: 'SET_ENEMY_COORDINATES', index, payload: updatedEntity });
                break;
            }
            case 'player': {
                dispatch({ type: 'SET_PLAYER_COORDINATES', payload: updatedEntity });
                break;
            }
        }
        return true;
    }

    return false;
};
