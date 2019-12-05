import packageData from '../../../package.json';

const {
    name,
    description,
    version,
    bugs: { url: issues }
} = packageData;

const initState = {
    name,
    description,
    version,
    issues,
    singlePlayer: true,
    // set the goal for max FPS
    delay: 1000 / 30,
    lastCycle: 0,
    lastRender: 0,
    paused: false,
    logFPS: false,
    logFPSInterval: 1000,
    compareFPSInterval: 4000,
    lastFPSLog: null,
    lastFPSCompare: null,
    lastFPSCompareValue: 0
};

export default (prevState = initState, action) => {
    const { type, payload = {} } = action;
    const { fps } = payload;

    switch (type) {
        default:
            return prevState;
        case 'SET_LAST_GAME_CYCLE_TIME': {
            return {
                ...prevState,
                lastCycle: payload
            };
        }
        case 'SET_LAST_RENDER_CYCLE_TIME': {
            return {
                ...prevState,
                lastRender: payload
            };
        }
        case 'TOGGLE_PAUSE': {
            const now = new Date().getTime();
            return {
                ...prevState,
                paused: !prevState.paused,
                lastCycle: now
            };
        }
        case 'LAST_FPS_LOG': {
            const now = new Date().getTime();
            return {
                ...prevState,
                lastFPSLog: now
            };
        }
        case 'LAST_FPS_COMPARE': {
            const now = new Date().getTime();
            return {
                ...prevState,
                lastFPSCompare: now,
                lastFPSCompareValue: fps
            };
        }
    }
};
