import { getState, dispatch } from './store';

export default () => {
    const cheats = [
        'IDDT',
    ];
    const { keyStrokes } = getState();
    const input = keyStrokes.map(key => String.fromCharCode(key)).join('');
    const match = cheats.find(cheat => input.indexOf(cheat) > -1);
    switch (match) {
        default: return false;
        case 'IDDT': {
            dispatch({ type: 'TOGGLE_CHEAT_AUTOMAP' });
            break;
        }
    }
    dispatch({ type: 'CLEAR_KEY_STROKES' });
    return true;
};
