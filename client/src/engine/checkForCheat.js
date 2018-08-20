import logAddEvent from './logAddEvent';
import { getState, dispatch } from './store';

export default (externalInput) => {
    const cheats = [
        'IDDT',
    ];
    const { keyStrokes } = getState();
    const input = externalInput || keyStrokes.map(key => String.fromCharCode(key)).join('');
    const match = cheats.find(cheat => input.indexOf(cheat) > -1);
    switch (match) {
        default: return false;
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
