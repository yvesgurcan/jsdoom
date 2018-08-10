import move from './move';
import store from './store';

const { getState } = store;

export default (timeDelta) => {
    const { player, enemies } = getState();

	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];

		const dx = player.x - enemy.x;
		const dy = player.y - enemy.y;

		const dist = Math.sqrt((dx * dx) + (dy * dy));
		if (dist > 4) {
			const angle = Math.atan2(dy, dx);

			enemy.rotDeg = angle * (180 / Math.PI);
			enemy.rot = angle;
			enemy.speed = 1;

			const walkCycleTime = 1000;
			const numWalkSprites = 4;

			enemy.state = Math.floor((new Date() % walkCycleTime) / (walkCycleTime / numWalkSprites)) + 1;
		} else {
			enemy.state = 0;
			enemy.speed = 0;
		}

		move(enemies[i], timeDelta);
	}
};
