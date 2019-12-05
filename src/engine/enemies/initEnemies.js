import initSprites from '../initSprites';
import { dispatch } from '../store';

export default state => {
    const {
        constants: { ITEM_PATH },
        enemyTypes,
        enemies
    } = state;

    const enemyList = initSprites(
        enemies,
        enemyTypes,
        ITEM_PATH,
        state,
        'enemies'
    );
    dispatch({ type: 'INIT_ENEMY_MAP', payload: enemyList });
};
