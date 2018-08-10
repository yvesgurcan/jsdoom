import getElementById from './getElementById';
import createElement from './createElement';
import enemyTypes from '../resources/enemies';
import mapEnemies from '../map/enemies';
import store from './store';

const { dispatch } = store;

export default () => {
	const screen = getElementById('screen');

    const enemies = [];
	for (let i = 0; i < mapEnemies.length; i++) {
		const enemy = mapEnemies[i];
		const type = enemyTypes[enemy.type];
		const img = createElement('img');
		img.src = type.img;
		img.style.display = 'none';
		img.style.position = 'absolute';

		enemy.state = 0;
		enemy.rot = 0;
		enemy.rotDeg = 0;
		enemy.dir = 0;
		enemy.speed = 0;
		enemy.moveSpeed = type.moveSpeed;
		enemy.rotSpeed = type.rotSpeed;
		enemy.totalStates = type.totalStates;

		enemy.oldStyles = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			clip: '',
			display: 'none',
			zIndex: 0,
		};

		enemy.img = img;
		enemies.push(enemy);

		screen.appendChild(img);
    }

    dispatch({ type: 'ENEMIES_SET', enemies });
};
