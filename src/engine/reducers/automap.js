import automapSettings from '../../maps/automap';

const initState = {
    showAutomap: false,
    showGrid: false,
    showViewingCone: true,
    revealMap: false,
    revealThings: false,
    ...automapSettings
};

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;

    const { scale } = payload;

    switch (type) {
        default:
            return prevState;
        case 'SET_AUTOMAP_SCALE': {
            return {
                ...prevState,
                scale
            };
        }
        case 'TOGGLE_AUTOMAP': {
            return {
                ...prevState,
                showAutomap: !prevState.showAutomap
            };
        }
        case 'TOGGLE_AUTOMAP_GRID': {
            return {
                ...prevState,
                showGrid: !prevState.showGrid
            };
        }
        case 'TOGGLE_VIEWING_CONE': {
            if (prevState.showAutomap) {
                return {
                    ...prevState,
                    showViewingCone: !prevState.showViewingCone
                };
            }
            return prevState;
        }
        case 'TOGGLE_CHEAT_AUTOMAP': {
            const reset = prevState.revealThings && prevState.revealMap;
            if (reset) {
                return {
                    ...prevState,
                    revealMap: false,
                    revealThings: false
                };
            }
            if (prevState.revealMap) {
                return {
                    ...prevState,
                    revealMap: true,
                    revealThings: true
                };
            }
            return {
                ...prevState,
                revealMap: true,
                revealThings: false
            };
        }
    }
};
