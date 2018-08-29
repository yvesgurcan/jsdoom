import { getState } from '../store';

export default () => {
    const { game: { singlePlayer } } = getState();
    if (singlePlayer) {
        
    } else {
        // TODO
    }
};
