import { dispatch, getState } from './store';
import checkForCheat from './checkForCheat';
import adjustMusicVolume from './adjustMusicVolume';
import adjustSoundVolume from './sound/adjustSoundVolume';
import logAddEvent from './log/logAddEvent';
import startMusic from './startMusic';

export default (state) => {
    const {
        constants: {
            KEYBOARD,
            ON,
            OFF,
        },
    } = state;
    const {
        UP, W,
        DOWN, S,
        LEFT, A,
        RIGHT, D,
        TAB,
        SHIFT,
        COMMAND,
        MINUS, NUMPAD_MINUS,
        EQUAL, NUMPAD_PLUS,
        ONE,
        TWO,
        THREE,
        FOUR,
        FIVE,
        SIX,
        SEVEN,
        F,
        G,
        J,
        M,
        P,
        R,
        V,
    } = KEYBOARD;
    
    console.table({
        'UP-or-W': 'forward',
        'DOWN-or-S': 'backward',
        'LEFT-or-A': 'left',
        'RIGHT-or-D': 'right',
        SHIFT: 'strafe',
        TAB: 'toggle automap',
        MINUS: 'turn volume down',
        'EQUAL-or-PLUS': 'turn volume up',
        F: 'toggle FPS count',
        G: 'toggle automap grid',
        J: 'toggle playlist mode',
        M: 'change song',
        P: 'toggle pause',
        V: 'toggle viewing cone (automap only)',
    });

	document.onkeydown = (event) => {
        const { keyCode } = event;
        const {
            keyStrokes: { keyPressCount },
            game: { paused },
            automap: { showGrid },
            music: {
                volume: musicVolume,
                playlistMode,
            },
            sound: { volume: soundVolume },
        } = getState();

        // allow page refresh
        if (keyCode !== COMMAND && keyCode !== R) {
            event.preventDefault();
        }
        console.log({ keyCode });

        if (keyPressCount < 2) {
            dispatch({ type: 'INCREMENT_KEYPRESS_COUNT' });
        }

        switch (keyCode) {
            default: break;
            case P: {
                dispatch({ type: 'TOGGLE_PAUSE' });
                break;
            }
            case NUMPAD_MINUS:
            case MINUS: {
                adjustMusicVolume(musicVolume - 0.1);
                adjustSoundVolume(soundVolume - 0.1);
                logAddEvent('Volume down.');
                break;
            }
            case NUMPAD_PLUS:
            case EQUAL: {
                adjustMusicVolume(musicVolume + 0.1);
                adjustSoundVolume(soundVolume + 0.1);
                logAddEvent('Volume up.');
                break;
            }
            case F: {
                dispatch({ type: 'TOGGLE_FPS' });
                break;
            }
            case J: {
                console.log(`Playlist mode: ${!playlistMode ? ON : OFF}`);
                logAddEvent(`Playlist mode: ${!playlistMode ? ON : OFF}`);
                dispatch({ type: 'TOGGLE_PLAYLIST_MODE' });
                break;
            }
            case M: {
                startMusic(true);
                break;
            }
        }

        if (paused) {
            return false;
        }

        dispatch({ type: 'REGISTER_KEY_STROKE', payload: keyCode });

        const currentState = getState();
        const cheat = checkForCheat(null, currentState);
        if (cheat) {
            return false;
        }

        switch (keyCode) {
            default: break;
            case UP:
            case W: {
                dispatch({ type: 'MOVE_PLAYER_FORWARD' });
				break;
            }
            case DOWN:
            case S: {
                dispatch({ type: 'MOVE_PLAYER_BACKWARD' });
				break;
            }
            case LEFT:
            case A: {
                dispatch({ type: 'ROTATE_PLAYER_LEFT' });
				break;
            }
            case RIGHT:
            case D: {
                dispatch({ type: 'ROTATE_PLAYER_RIGHT' });
                break;
            }
            case TAB: {
                dispatch({ type: 'TOGGLE_AUTOMAP' });
                break;
            }
            case SHIFT: {
                dispatch({ type: 'START_PLAYER_STRAFE' });
                break;
            }
            case G: {
                logAddEvent(`Grid ${!showGrid ? ON : OFF}.`);
                dispatch({ type: 'TOGGLE_AUTOMAP_GRID' });
                break;
            }
            case V: {
                dispatch({ type: 'TOGGLE_VIEWING_CONE' });
                break;
            }
        }
	};

	document.onkeyup = (event) => {
        const { keyCode } = event;
        event.preventDefault();
        
        const { game: { paused } } = getState();
        if (paused) {
            return false;
        }

		switch (keyCode) {
            default: break;
            case UP:
            case DOWN:
            case W:
            case S:
                dispatch({ type: 'STOP_PLAYER_SPEED' });
                break;
            case LEFT:
            case RIGHT:
            case A:
            case D: {
                dispatch({ type: 'STOP_PLAYER_DIRECTION' });
                break;
            }
            case SHIFT: {
                dispatch({ type: 'STOP_PLAYER_STRAFE' });
                break;
            }
		}
	};
};
