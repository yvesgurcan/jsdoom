import playSound from '../sound/playSound';
import calculateVolume from '../sound/calculateVolume';
import { dispatch, getState } from '../store';

const selectSound = soundList => {
    const randomIndex =
        Math.floor(Math.random() * soundList.length) / soundList.length;
    return soundList[randomIndex];
};

const setRandomInterval = baseInterval => {
    const modifier = Math.random() > 0.5 ? 1 : -1;
    return (
        baseInterval +
        Math.floor(baseInterval * (Math.random() / 1.5) * modifier)
    );
};

const queueSound = (soundType, interval, selectedSound, enemyId) => {
    dispatch({
        type: 'SET_ENEMY_ACTIVE_SOUND',
        payload: { enemyId, soundType }
    });
    setTimeout(() => handleSound(selectedSound, enemyId, soundType), interval);
    return true;
};

const handleSound = (selectedSound, enemyId, soundType) => {
    const { player, enemies } = getState();

    const enemy = enemies.find(e => e.id === enemyId);
    if (enemy === undefined) {
        console.error(
            `playActiveSound(): Could not find enemy with id '${enemyId}'.`
        );
        return false;
    }

    const adjustedVolume = calculateVolume(player, enemy);
    playSound(selectedSound, adjustedVolume);
    dispatch({
        type: 'UNSET_ENEMY_ACTIVE_SOUND',
        payload: { enemyId, soundType }
    });
    return true;
};

export default (enemy, enemyType, index) => {
    const { walk } = enemyType;
    if (!walk) {
        return false;
    }

    const {
        soundFixed,
        soundRandom,
        soundFixedInterval,
        soundBaseInterval
    } = walk;
    if (!soundFixed && !soundRandom) {
        return false;
    }

    if (soundFixedInterval) {
        const { fixedSoundQueued } = enemy;
        if (fixedSoundQueued) {
            return false;
        }

        const selectedSound = selectSound(soundFixed);
        return queueSound(
            'fixedInterval',
            soundFixedInterval,
            selectedSound,
            enemy.id
        );
    }

    if (soundBaseInterval) {
        const { randomSoundQueued } = enemy;
        if (randomSoundQueued) {
            return false;
        }

        const selectedSound = selectSound(soundRandom);
        const randomInterval = setRandomInterval(soundBaseInterval);
        return queueSound(
            'randomInterval',
            randomInterval,
            selectedSound,
            enemy.id
        );
    }
};
