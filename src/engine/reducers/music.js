const initState = {
    volume: 0,
    song: null,
    playlistMode: true
};

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;
    const { song, songName, volume } = payload;

    switch (type) {
        default:
            return prevState;
        case 'SET_MUSIC': {
            return {
                ...prevState,
                song,
                songName,
                volume: volume || prevState.volume
            };
        }
        case 'SET_MUSIC_VOLUME': {
            return {
                ...prevState,
                volume
            };
        }
        case 'TOGGLE_PLAYLIST_MODE': {
            if (prevState.song) {
                if (prevState.playlistMode === false) {
                    prevState.song.loop = false;
                } else {
                    prevState.song.loop = true;
                }
            }
            return {
                ...prevState,
                playlistMode: !prevState.playlistMode
            };
        }
    }
};
