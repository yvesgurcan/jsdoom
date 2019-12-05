import { dispatch } from '../store';

export default volume => {
    const adjustedVolume = Math.max(0, Math.min(1, volume));

    console.log(`adjustSoundVolume(): ${adjustedVolume.toFixed(2)}`);

    dispatch({ type: 'SET_SOUND_VOLUME', payload: { volume: adjustedVolume } });
    return true;
};
