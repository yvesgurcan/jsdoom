import {
    soundPath,
    sndExt,
} from '../constants';
import { getState } from '../store';

export default (filename, volume = 1) => {
    const { sound: { volume: masterVolume } } = getState();
    if (masterVolume === 0 || !filename) {
        return false;
    }
    
    const mixedVolume = Math.min(1, volume * masterVolume);

    if (mixedVolume < 0.045) {
        return false;
    }

    const path = `${soundPath}/${filename}${sndExt}`;
    const sound = new Audio(path);
    sound.volume = mixedVolume;
    console.log({ mixedVolume });
    sound.play();
    return true;
};
