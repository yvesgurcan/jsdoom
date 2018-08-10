import store from './store';

const { dispatch, getState } = store;

export default () => {
	// clear the visible sprites array but keep a copy in oldVisibleSprites for later.
    // also mark all the sprites as not visible so they can be added to visibleSprites again during raycasting.
    

    const { sprites: { visibleSprites } } = getState();

	const oldVisibleSprites = [];
	for (let i = 0; i < visibleSprites.length; i++) {
		const sprite = visibleSprites[i];
		oldVisibleSprites[i] = sprite;
		sprite.visible = false;
	}
    
    dispatch({ type: 'SPRITES_SET', oldVisibleSprites, visibleSprites: [] });
};
