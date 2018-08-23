import uuid4 from 'uuid4';
import {
    enemyPath,
    imgExt,
} from '../constants';
import getElementById from '../getElementById';
import createElement from '../createElement';

import { getState, dispatch } from '../store';

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
        
        const enemyType = enemyTypes[type];

        if (!enemyType) {
            console.error(`initEnemies(): Enemy type '${type}' is undefined. Entity will not be placed on the map.`, { entity: enemy, enemyType });
            /* eslint-disable-next-line */
            continue;
        }

        const {
            prefix,
            moveSpeed,
            rotSpeed,
        } = enemyType;

        if (!prefix) {
            console.error('initEnemies(): Enemy type is missing a prefix for image filenames. Entity will not be placed on the map.', { entity: enemy, enemyType });
            /* eslint-disable-next-line */
            continue;
        }

        if (!moveSpeed || !rotSpeed) {
            console.error('initEnemies(): moveSpeed and/or rotSpeed of enemy type is undefined. Entity will not be placed on the map.', { entity: enemy, enemyType });
            /* eslint-disable-next-line */
            continue;
        }
        
        const id = uuid4();

        const img = createElement('img');
        img.id = id;
        img.className = type;
        img.src = `${enemyPath}/${enemyType.prefix}/${enemyType.prefix}A1${imgExt}`;
        img.style.display = 'none';
        img.style.position = 'absolute';

        const element = {
            rotDeg: 0,
            rot: 0,
            ...enemy,
            id,
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
