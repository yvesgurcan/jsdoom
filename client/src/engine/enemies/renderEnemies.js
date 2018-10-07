import renderSprites from '../renderSprites';

export default state => {
    const {
        enemyMap: enemies,
        enemyTypes,
    } = state;

	renderSprites(state, enemies, enemyTypes, 'enemies');
};
