import { MOVE } from '../constants';

const { FORWARD, LEFT, RIGHT, BACKWARD } = MOVE;

export default (enemy, player) => {
    // console.log(enemy.nextMotion);
    if (enemy.nextMotion > 0) {
        return enemy;
    }

    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    // const dist = Math.sqrt((dx * dx) + (dy * dy));

    let speed = 1;

    let direction = FORWARD;
    const randomDirection = Math.random();
    if (randomDirection > 0.6) {
        direction = BACKWARD;
        if (randomDirection > 0.7) {
            direction = LEFT;
            if (randomDirection > 0.85) {
                direction = RIGHT;
            }
        }
    }

    let rot = Math.atan2(dy, dx);
    const angleModifier = Math.random();
    if (direction === BACKWARD) {
        rot -= Math.PI * angleModifier;
    }
    if (direction === LEFT) {
        speed = 0.5;
        rot += Math.PI / 2;
    } else if (direction === RIGHT) {
        speed = 0.5;
        rot -= Math.PI / 2;
    }

    const rotDeg = (rot * 180) / Math.PI;

    return {
        rot,
        rotDeg,
        speed,
        direction
    };
};
