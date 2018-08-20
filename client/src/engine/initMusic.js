import songs from '../types/music';
import logAddEvent from './logAddEvent';
import { dispatch, getState } from './store';

const startMusic = () => {
    const songNames = Object.keys(songs).map(name => name);
    const randomIndex = Math.floor(Math.random() * (songNames.length - 1));
    const songName = songs[songNames[randomIndex]];
    const songNameFormatted = songName.replace(/ /g, '_').replace(/'/g, '_').replace(/\./g, '_');

    const song = new Audio(`/client/assets/music/${songNameFormatted}.mp3`);

    const volume = 0.3;

    song.volume = volume;
    song.loop = true;

    song.play();
    console.log(`initMusic(): ${songName}`);

    dispatch({ type: 'SET_MUSIC', payload: { song, songName, volume } });
    logAddEvent(`Playing '${songName}'...`);
    
    return true;
};

export default (dontListenForClick) => {
    if (dontListenForClick) {
        const { keyStrokes: { keyPressCount } } = getState();
        if (keyPressCount > 1) {
            startMusic();
            return true;    
        }
        return false;
    }
    
    document.addEventListener('keydown', startMusic, { once: true });
    return true;
};
