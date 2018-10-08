import renderSprites from '../renderSprites';

export default state => {
    const { items } = state;
	renderSprites(state, items);
};
