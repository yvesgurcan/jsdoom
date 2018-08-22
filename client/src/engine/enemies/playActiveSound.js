
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
        soundFixed,
        soundRandom,
        soundFixedInterval,
        soundBaseInterval,
    } = walk;
    if (!soundFixed && !soundRandom) {
        return false;
    }

    if (soundFixedInterval) {
        const randomSoundIndex = Math.floor(Math.random() * soundFixed.length) / soundFixed.length;
        const selectedSound = soundFixed[randomSoundIndex];
        dispatch({ type: 'SET_ENEMY_ACTIVE_SOUND', index });
        setTimeout(() => handleSound(selectedSound, index), soundFixedInterval);
    }

    if (soundBaseInterval) {
        const randomSoundIndex = Math.floor(Math.random() * soundRandom.length) / soundRandom.length;
        const selectedSound = soundRandom[randomSoundIndex];
        const modifier = Math.random() > 0.5 ? 1 : -1;
        const randomInterval = soundBaseInterval + Math.floor(soundBaseInterval * (Math.random() / 1.5) * modifier);
        dispatch({ type: 'SET_ENEMY_ACTIVE_SOUND', index });
        setTimeout(() => handleSound(selectedSound, index), randomInterval);
    }
};
