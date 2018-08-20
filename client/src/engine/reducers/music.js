const initState = { song: null };

export default (prevState = initState, action) => {
    const {
        type,
        payload = {},
    } = action;
    const {
        song,
        songName,
        volume,
    } = payload;

    switch (type) {
        default: return prevState;
        case 'SET_MUSIC': {
            return {
                ...prevState,
                song,
                songName,
                volume: volume || prevState.volume,
            };
        }
        case 'SET_MUSIC_VOLUME': {
            return {
                ...prevState,
                volume,
            };
        }
    }
};
