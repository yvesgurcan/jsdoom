import { getState, dispatch } from './store';

export default volume => {
    const {
        music: { song }
    } = getState();
    if (!song) {
        console.error(
            "adjustMusicVolume(): It looks like there isn't any song to update."
        );
        return false;
    }

    const adjustedVolume = Math.max(0, Math.min(1, volume));
    song.volume = adjustedVolume;

    console.log(`adjustMusicVolume(): ${adjustedVolume.toFixed(2)}`);

    dispatch({ type: 'SET_MUSIC_VOLUME', payload: { volume: adjustedVolume } });
    return true;
};
