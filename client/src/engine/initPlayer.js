import {
    getState,
    dispatch,
} from './store';

export default () => {
    const { player } = getState();
    const updatedPlayer = { ...player };
    updatedPlayer.rotDeg %= 360;

	if (updatedPlayer.rotDeg < -180) updatedPlayer.rotDeg += 360;
	if (updatedPlayer.rotDeg >= 180) updatedPlayer.rotDeg -= 360;

	const snap = (updatedPlayer.rotDeg + 360) % 90;
	if (snap < 2 || snap > 88) {
		updatedPlayer.rotDeg = Math.round(updatedPlayer.rotDeg / 90) * 90;
	}

    updatedPlayer.rot = (updatedPlayer.rotDeg * Math.PI) / 180;
    dispatch({ type: 'SET_PLAYER_COORDINATES', payload: updatedPlayer });
};
