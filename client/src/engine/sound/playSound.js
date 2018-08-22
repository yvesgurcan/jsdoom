import {
    soundPath,
    sndExt,
} from '../constants';

export default (filename, volume = 1) => {
    if (volume < 0.04 || !filename) {
        return false;
    }
    
    const path = `${soundPath}/${filename}${sndExt}`;
    const sound = new Audio(path);
    sound.volume = Math.min(1, volume);
    sound.play();
    return true;
};
