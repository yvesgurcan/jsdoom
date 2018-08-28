import {
    ON,
    OFF,
} from './constants';
import logAddEvent from './log/logAddEvent';
import { getState, dispatch } from './store';

export default (externalInput) => {
    const cheats = [
        'IDDQD',
        'IDDT',
        'IDMUS',
    ];
    const { keyStrokes: { history } } = getState();
    const input = externalInput || history.map(key => String.fromCharCode(key)).join('');
    const match = cheats.find(cheat => input.indexOf(cheat) > -1);
    switch (match) {
        default: return false;
        case 'IDDQD': {
            dispatch({ type: 'TOGGLE_GODMODE' });
            const { player: { godMode } } = getState();
            logAddEvent(`Degreelessness mode ${godMode ? ON : OFF}.`);
            break;
        }
        case 'IDDT': {
            const {
                automap: {
                    revealMap: prevRevealMap,
                    revealThings: prevRevealThings,
                }
            } = getState();
            dispatch({ type: 'TOGGLE_CHEAT_AUTOMAP' });
            const {
                automap: {
                    revealMap,
                    revealThings,
                }
            } = getState();
            if (prevRevealMap === false && revealMap === true) {
                logAddEvent('Reveal map.');
            } else if (prevRevealThings === false && revealThings === true) {
                logAddEvent('Reveal things.');
            } else {
                logAddEvent('Hide things and full map.');
            }
            break;
        }
    }
    dispatch({ type: 'CLEAR_KEY_STROKES' });
    return true;
};
