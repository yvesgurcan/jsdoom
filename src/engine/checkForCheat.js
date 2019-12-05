import logAddEvent from './log/logAddEvent';
import { getState, dispatch } from './store';

export default (externalInput, state = getState()) => {
    const {
        constants: {
            CHEATS,
            CHEATS: [
                CHEAT_GOD,
                CHEAT_AMMO,
                CHEAT_AMMO_KEY,
                CHEAT_MAP,
                CHEAT_MUSIC
            ],
            ON,
            OFF
        },
        keyStrokes: { history }
    } = state;
    const input =
        externalInput || history.map(key => String.fromCharCode(key)).join('');
    const match = CHEATS.find(cheat => input.indexOf(cheat) > -1);
    switch (match) {
        default:
            return false;
        case CHEAT_GOD: {
            dispatch({ type: 'TOGGLE_GODMODE' });
            const {
                player: { godMode }
            } = getState();
            logAddEvent(`Degreelessness mode ${godMode ? ON : OFF}.`);
            break;
        }
        case CHEAT_AMMO: {
            dispatch({ type: 'CHEAT_AMMO' });
            logAddEvent('Ammo (no keys) added.');
            break;
        }
        case CHEAT_AMMO_KEY: {
            dispatch({ type: 'CHEAT_AMMO_AND_KEYS' });
            logAddEvent('Very happy ammo added.');
            break;
        }
        case CHEAT_MAP: {
            const {
                automap: {
                    revealMap: prevRevealMap,
                    revealThings: prevRevealThings
                }
            } = getState();
            dispatch({ type: 'TOGGLE_CHEAT_AUTOMAP' });
            const {
                automap: { revealMap, revealThings }
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
