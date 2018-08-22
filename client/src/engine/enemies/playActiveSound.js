
import playSound from '../sound/playSound';
import calculateVolume from '../sound/calculateVolume';
import { dispatch, getState } from '../store';

const handleSound = (selectedSound, index) => {
    const {
        player,
        enemyMap,
    } = getState();

    const enemy = enemyMap[index];
    const adjustedVolume = calculateVolume(player, enemy);
    playSound(selectedSound, adjustedVolume);
    dispatch({ type: 'UNSET_ENEMY_ACTIVE_SOUND', index });
};

export default (enemy, enemyType, index) => {
    const { soundQueued } = enemy;
    if (soundQueued) {
        return false;
    }

    const { walk } = enemyType;
    if (!walk) {
        return false;
    }

    const {
        sounds,
        soundFixedInterval,
        soundBaseInterval,
    } = walk;
    if (!sounds) {
        return false;
    }

    let selectedSound = null;
    if (soundFixedInterval || soundBaseInterval) {
        const randomSoundIndex = Math.floor(Math.random() * sounds.length) / sounds.length;
        selectedSound = sounds[randomSoundIndex];
    }

    if (soundFixedInterval) {
        dispatch({ type: 'SET_ENEMY_ACTIVE_SOUND', index });
        setTimeout(() => handleSound(selectedSound, index), soundFixedInterval);
    }

    if (soundBaseInterval) {
        const modifier = Math.random() > 0.5 ? 1 : -1;
        const randomInterval = soundBaseInterval + Math.floor(soundBaseInterval * (Math.random() / 1.5) * modifier);
        dispatch({ type: 'SET_ENEMY_ACTIVE_SOUND', index });
        setTimeout(() => handleSound(selectedSound, index), randomInterval);
    }
};
