import songs from '../types/music';
import logAddEvent from './log/logAddEvent';
import { dispatch, getState } from './store';

const startMusic = (log = true) => {
    const {
        music: { song: songState, volume, playlistMode }
    } = getState();
    if (songState && songState.play) {
        songState.pause();
    }

    const songNames = Object.keys(songs).map(name => name);
    const randomIndex = Math.floor(Math.random() * (songNames.length - 1));
    const songName = songs[songNames[randomIndex]];
    const songNameFormatted = songName
        .replace(/ /g, '_')
        .replace(/'/g, '_')
        .replace(/\./g, '_');

    const song = new Audio(`/assets/music/${songNameFormatted}.mp3`);
    song.volume = volume;
    song.loop = !playlistMode;

    return song
        .play()
        .then(() => {
            console.log(`startMusic(): ${songName}.`);
            dispatch({
                type: 'SET_MUSIC',
                payload: { song, songName, volume }
            });
            logAddEvent(`Playing '${songName}'...`);

            song.addEventListener(
                'ended',
                () => {
                    if (playlistMode) {
                        console.log('startMusic(): Queuing up next song.');
                        startMusic(true, true);
                    }
                },
                false
            );

            return true;
        })
        .catch(error => {
            if (log) {
                console.error(`startMusic(): Couldn't play '${songName}'.`, {
                    error
                });
                logAddEvent(`Couldn't play '${songName}'.`);
            }
            return false;
        });
};

export default (dontListenForClick = false) => {
    if (dontListenForClick) {
        const {
            keyStrokes: { keyPressCount }
        } = getState();
        if (keyPressCount > 1) {
            startMusic();
            return true;
        }
        return false;
    }

    document.addEventListener(
        'keydown',
        () => {
            const {
                constants: { ON, OFF },
                music: { playlistMode }
            } = getState();
            console.log(
                `startMusic(): Playlist mode: ${playlistMode ? ON : OFF}`
            );
            return startMusic();
        },
        { once: true }
    );
    return true;
};
