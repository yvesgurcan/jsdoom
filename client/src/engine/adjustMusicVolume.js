import { dispatch } from './store';

export default (volume) => {
    if (!window.music) {
        console.error('It looks like there isn\'t any song to update.');
        return;
    }

    const adjustedVolume = Math.max(0, Math.min(1, volume));

    const song = window.music;
    song.volume = adjustedVolume;

    console.log(`Volume: ${adjustedVolume.toFixed(2)}`);

    dispatch({ type: 'SET_MUSIC_VOLUME', payload: { volume: adjustedVolume } });
};
