import {
    soundPath,
    sndExt,
} from '../constants';
import { getState } from '../store';

export default (filename, volume = 1) => {
    const { sound: { volume: masterVolume } } = getState();
    if (volume < 0.04 || !filename) {
        return false;
    }
    
    const path = `${soundPath}/${filename}${sndExt}`;
    const sound = new Audio(path);
    sound.volume = Math.min(1, volume * masterVolume);
    console.log({ vol: sound.volume });
    sound.play();
    return true;
};
