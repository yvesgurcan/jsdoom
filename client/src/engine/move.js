import checkCollision from './checkCollision';
import { gameCycleDelay } from './constants';

export default (entity, timeDelta) => {
	// time timeDelta has passed since we moved last time. We should have moved after time gameCycleDelay, 
    // so calculate how much we should multiply our movement to ensure game speed is constant
    
    const mul = timeDelta / gameCycleDelay;
    
    // entity will move this far along the current direction vector
	const moveStep = mul * entity.speed * entity.moveSpeed;	

    console.log({ a: entity.rotDeg })

    // add rotation if entity is rotating (entity.dir != 0)
    entity.rotDeg += mul * entity.dir * entity.rotSpeed; 
    

    console.log({ rotDeg: entity.rotDeg })

	entity.rotDeg %= 360;

	if (entity.rotDeg < -180) entity.rotDeg += 360;
	if (entity.rotDeg >= 180) entity.rotDeg -= 360;

	const snap = (entity.rotDeg + 360) % 90;
	if (snap < 2 || snap > 88) {
		entity.rotDeg = Math.round(entity.rotDeg / 90) * 90;
	}

    entity.rot = entity.rotDeg * (Math.PI / 180);
    
    console.log({ entity });

	const newX = entity.x + (Math.cos(entity.rot) * moveStep);	// calculate new entity position with simple trigonometry
	const newY = entity.y + (Math.sin(entity.rot) * moveStep);

	const pos = checkCollision(entity.x, entity.y, newX, newY, 0.35);

	entity.x = pos.x; // set new position
	entity.y = pos.y;
};
