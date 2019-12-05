import renderSprites from '../renderSprites';

export default state => {
    const { items, itemTypes } = state;
    renderSprites(state, items, itemTypes, 'items');
};
