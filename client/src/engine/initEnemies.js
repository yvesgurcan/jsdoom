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
            type,
            x,
            y,
        } = enemy;

        if (!type) {
            console.error('initEnemies(): Enemy type is undefined. Entity will not be placed on the map.', { entity: enemy });
            /* eslint-disable-next-line */
            continue;
        }

        if (!x || !y) {
            console.error('initEnemies(): x and/or y coordinates are undefined. Entity will not be placed on the map.', { entity: enemy });
            /* eslint-disable-next-line */
            continue;
        }
        
        const enemyType = enemyTypes[enemy.type];
        const {
            moveSpeed,
            rotSpeed,
        } = enemyType;

        if (!moveSpeed || !rotSpeed) {
            console.error('initEnemies(): moveSpeed and/or rotSpeed is undefined. Entity will not be placed on the map.', { entity: enemy });
            /* eslint-disable-next-line */
            continue;
        }
        
        const id = uuid4();

        const img = createElement('img');
        img.id = id;
        img.className = type;
        img.src = `${wolfPath}/${enemyType.img}${ext}`;
        img.style.display = 'none';
        img.style.position = 'absolute';

        const element = {
            ...enemy,
            id,
            rot: 0,
            rotDeg: 0,
            dir: 0,
            speed: 0,
            moveSpeed,
            rotSpeed,
            oldStyles: {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                clip: '',
                display: 'none',
                zIndex: 0
            },
            img,
        };

        enemies = [
            ...enemies,
            element,
        ];

        screen.appendChild(img);
    }
    dispatch({ type: 'INIT_ENEMY_MAP', payload: enemies });
};
