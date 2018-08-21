import {
    soundPath,
    sndExt,
} from '../constants';
import playSound from '../playSound';
import { dispatch } from '../store';

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
        const path = `${soundPath}/${selectedSound}${sndExt}`;
        dispatch({ type: 'SET_ENEMY_ACTIVE_SOUND', index });
        setTimeout(() => {
            dispatch({ type: 'UNSET_ENEMY_ACTIVE_SOUND', index });
            playSound(path);
        }, soundFixedInterval);
    }

    if (soundBaseInterval) {
        const path = `${soundPath}/${selectedSound}${sndExt}`;
        const modifier = Math.random() > 0.5 ? 1 : -1;
        const randomInterval = soundBaseInterval + Math.floor(soundBaseInterval * (Math.random() / 1.5) * modifier);
        console.log({ randomInterval });
        dispatch({ type: 'SET_ENEMY_ACTIVE_SOUND', index });
        setTimeout(() => {
            playSound(path);
            dispatch({ type: 'UNSET_ENEMY_ACTIVE_SOUND', index });
        }, randomInterval);
    }
};
