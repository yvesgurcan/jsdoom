import songs from '../types/music';
import { dispatch } from './store';

export default () => {
    const songNames = Object.keys(songs).map(name => name);
    const randomIndex = Math.floor(Math.random() * (songNames.length - 1));
    const songName = songs[songNames[randomIndex]];
    const songNameFormatted = songName.replace(/ /g, '_').replace(/'/g, '_').replace(/\./g, '_')

    const song = new Audio(`/client/assets/music/${songNameFormatted}.mp3`);

    const volume = 0.3;

    song.volume = volume;
    song.loop = true;

    song.play();
    console.log(`Playing '${songName}'...`);

    window.music = song;

    dispatch({ type: 'SET_MUSIC', payload: { songName, songObject: song, volume } });
};
