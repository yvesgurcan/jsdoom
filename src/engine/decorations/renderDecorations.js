import renderSprites from '../renderSprites';

export default state => {
    const { decorations } = state;
    renderSprites(state, decorations);
};
