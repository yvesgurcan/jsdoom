import { soundPath, sndExt } from '../constants';
import { getState } from '../store';

export default (filename, volume = 1) => {
    const {
        game: { paused },
        sound: { volume: masterVolume }
    } = getState();
    if (paused || masterVolume === 0 || !filename) {
        return false;
    }

    const mixedVolume = Math.min(masterVolume, volume * masterVolume);

    if (mixedVolume < 0.045) {
        return false;
    }

    const path = `${soundPath}/${filename}${sndExt}`;
    const sound = new Audio(path);
    sound.volume = mixedVolume;
    sound.play();
    return true;
};
