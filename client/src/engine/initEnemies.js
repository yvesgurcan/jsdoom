import uuid4 from 'uuid4';
import {
    ext,
    wolfPath,
} from './constants';
import getElementById from './getElementById';
import createElement from './createElement';

import { getState, dispatch } from './store';

export default () => {
    let enemies = [];
    const screen = getElementById('screen');

    const {
        enemyMap: mapEnemies,
        enemyTypes,
    } = getState();

    for (let i = 0; i < mapEnemies.length; i++) {
        const enemy = { ...mapEnemies[i] };
        const {
            moveSpeed,
            rotSpeed,
        } = enemy;

        if (!moveSpeed || !rotSpeed) {
            console.error('initEnemies(): moveSpeed and/or rotSpeed is undefined. Entity will not be placed on the map.', { entity: enemy });
            /* eslint-disable-next-line */
            continue;
        }
        
        const type = { ...enemyTypes[enemy.type] };
        const id = uuid4();

        const img = createElement('img');
        img.id = id;
        img.src = `${wolfPath}/${type.img}${ext}`;
        img.style.display = 'none';
        img.style.position = 'absolute';

        enemy.id = id;
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
            zIndex: 0
        };

        enemy.img = img;

        enemies = [
            ...enemies,
            enemy,
        ];

        screen.appendChild(img);
    }
    dispatch({ type: 'INIT_ENEMY_MAP', payload: enemies });
};
