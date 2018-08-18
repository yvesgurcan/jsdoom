import { getState, dispatch } from './store';

const debugPlayer = {
    init: () => {
        dispatch({ type: 'INIT_PLAYER' });
    },
    move: (x = 1, y = 1, rotDeg = 0) => {
        const { player } = getState();

        // this is an approximate calculation
        const rot = (rotDeg / 180) * 3;

        const updatedPlayer = {
            ...player,
            x,
            y,
            rotDeg,
            rot,
        };

        dispatch({ type: 'SET_PLAYER_COORDINATES', payload: updatedPlayer });
    }
};

console.log('debug functions', {
    player: debugPlayer
});

export default () => {
    window.player = debugPlayer;
};
