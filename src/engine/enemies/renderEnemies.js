import renderSprites from '../renderSprites';

export default state => {
    const { enemyTypes, enemies } = state;

    renderSprites(state, enemies, enemyTypes, 'enemies');
};
