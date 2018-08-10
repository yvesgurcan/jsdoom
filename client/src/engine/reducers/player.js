const initState = {
    x: 16,
    y: 10,
    // the direction that the player is turning, either -1 for left or 1 for right.
    dir: 0,
    // the current angle of rotation	
    rot: 0,
    // is the playing moving forward (speed = 1) or backwards (speed = -1).	
    speed: 0,
    // how far (in map units) does the player move each step/update
    moveSpeed: 0.18,
    // how much does the player rotate each step/update (in radians)
    rotSpeed: 6 * (Math.PI / 180),
};

export default (prevState = initState, action) => {
    const {
        type,
        x,
        y,
        rotation,
        width,
    } = action;
    const nextState = { ...prevState };

    switch (type) {
        case 'SCREEN_RESIZE': {
            // if this goes out of control, 0.18 is a trustable value for small screens
            const moveSpeed = Math.max(0.10, Math.min(1.1, 0.000001 * width * (width / 1.4)));
            return {
                ...prevState,
                moveSpeed,
            };
        }
        case 'PLAYER_MOVE_FORWARD': {
            return {
                ...prevState,
                speed: 1,
            };
        }
        case 'PLAYER_MOVE_BACKWARD': {
            return {
                ...prevState,
                speed: -1,
            };
        }
        case 'PLAYER_MOVE_STOP': {
            return {
                ...prevState,
                speed: 0,
            };
        }
        case 'PLAYER_TURN_LEFT': {
            return {
                ...prevState,
                dir: -1,
            };
        }
        case 'PLAYER_TURN_RIGHT': {
            return {
                ...prevState,
                dir: 1,
            };
        }
        case 'PLAYER_TURN_STOP': {
            return {
                ...prevState,
                dir: 0,
            };
        }
        case 'PLAYER_SET_POSITION': {
            return {
                ...prevState,
                x,
                y,
                rot: rotation,
            };
        }
        default: {
            return nextState;
        }
    }
};
