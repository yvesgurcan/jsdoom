import getElementById from '../util/getElementById';

const drawThings = (state, things, color) => {
    const {
        automap: { scale }
    } = state;
    const miniMapObjects = getElementById('minimapobjects');
    const objectCtx = miniMapObjects.getContext('2d');

    for (let i = 0; i < things.length; i++) {
        const thing = things[i];
        const square = {
            x: thing.x * scale,
            y: thing.y * scale
        };
        objectCtx.fillStyle = color;

        // draw a dot at the enemy position
        objectCtx.fillRect(square.x, square.y, scale, scale);
    }
};

export default state => {
    const miniMapObjects = getElementById('minimapobjects');

    const {
        player,
        enemies,
        decorations,
        items,
        automap: {
            scale,
            showAutomap,
            showGrid,
            revealThings,
            playerColor,
            enemyColor,
            itemColor,
            decorationColor
        }
    } = state;

    const weapon = getElementById('weapon');

    if (!showAutomap) {
        if (weapon.style.display !== 'block') {
            weapon.style.display = 'block';
        }

        return false;
    }

    if (weapon.style.display !== 'none') {
        weapon.style.display = 'none';
    }

    const objectCtx = miniMapObjects.getContext('2d');
    miniMapObjects.width = miniMapObjects.width;

    const playerSquare = {
        x: player.x * scale,
        y: player.y * scale
    };

    // draw a dot at the player position
    objectCtx.fillStyle = playerColor;
    objectCtx.fillRect(playerSquare.x, playerSquare.y, scale, scale);

    if (revealThings) {
        drawThings(state, enemies, enemyColor);
        drawThings(state, decorations, decorationColor);
        drawThings(state, items, itemColor);
    }

    const grid = getElementById('grid');
    if (showGrid && grid.style.display !== 'block') {
        grid.style.display = 'block';
    } else if (!showGrid && grid.style.display !== 'none') {
        grid.style.display = 'none';
    }
};
