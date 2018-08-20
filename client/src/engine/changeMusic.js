import initMusic from './initMusic';
import { getState } from './store';

export default () => {
    const { music: { song } } = getState();
    if (song && song.play) {
        song.pause();
    }
    
    initMusic(true);
    return true;
};
