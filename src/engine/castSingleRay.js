import { stripWidth, twoPI } from './constants';
import { getState } from './store';
import drawViewingCone from './drawViewingCone';
import getElementById from './util/getElementById';

export default (rayAngle, stripIdx) => {
    const state = getState();
    const {
        constants: { IMG_EXT, TEXTURE_PATH },
        player,
        map: { mapWidth, mapHeight },
        automap: { showViewingCone },
        view: { screenHeight, viewDist },
        wallTypes: wallTextures,
        wallMap: map
    } = state;

    // first make sure the angle is between 0 and 360 degrees
    rayAngle %= twoPI;
    if (rayAngle < 0) rayAngle += twoPI;

    // moving right/left? up/down? Determined by which quadrant the angle is in.
    const right = rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25;
    const up = rayAngle < 0 || rayAngle > Math.PI;

    let wallType = 0;

    // only do these once
    const angleSin = Math.sin(rayAngle);
    const angleCos = Math.cos(rayAngle);

    let dist = 0; // the distance to the block we hit
    let xHit = 0; // the x and y coord of where the ray hit the block
    let yHit = 0;
    let xWallHit = 0;
    let yWallHit = 0;

    let textureX; // the x-coord on the texture of the block, ie. what part of the texture are we going to render
    let wallX; // the (x,y) map coords of the block
    let wallY;

    let wallIsShaded = false;

    // first check against the vertical map/wall lines
    // we do this by moving to the right or left edge of the block we're standing in
    // and then moving in 1 map unit steps horizontally. The amount we have to move vertically
    // is determined by the slope of the ray, which is simply defined as sin(angle) / cos(angle).

    let slope = angleSin / angleCos; // the slope of the straight line made by the ray
    const dXVer = right ? 1 : -1; // we move either 1 map unit to the left or right
    const dYVer = dXVer * slope; // how much to move up or down

    let x = right ? Math.ceil(player.x) : Math.floor(player.x); // starting horizontal position, at one of the edges of the current map block
    let y = player.y + (x - player.x) * slope; // starting vertical position. We add the small horizontal step we just made, multiplied by the slope.

    while (x > 0 && x < mapWidth && y > 0 && y < mapHeight) {
        wallX = (x + (right ? 0 : -1)) >> 0;
        wallY = y >> 0;

        // is this point inside a wall block?
        if (map[wallY][wallX] !== 0) {
            const distX = x - player.x;
            const distY = y - player.y;
            dist = distX * distX + distY * distY; // the distance from the player to this point, squared.

            wallType = map[wallY][wallX]; // we'll remember the type of wall we hit for later
            textureX = y % 1; // where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.
            if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed

            xHit = x; // save the coordinates of the hit. We only really use these to draw the rays on minimap.
            yHit = y;
            xWallHit = wallX;
            yWallHit = wallY;

            // make horizontal walls shaded
            // DEACTIVATED FOR NOW - should use a different method (CSS maybe?)
            wallIsShaded = false;

            break;
        }
        x += dXVer;
        y += dYVer;
    }

    // now check against horizontal lines. It's basically the same, just 'turned around'.
    // the only difference here is that once we hit a map block,
    // we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.
    // If so, we only register this hit if this distance is smaller.

    slope = angleCos / angleSin;
    const dYHor = up ? -1 : 1;
    const dXHor = dYHor * slope;
    y = up ? Math.floor(player.y) : Math.ceil(player.y);
    x = player.x + (y - player.y) * slope;

    const screenStrips = getElementById('strips');

    while (x > 0 && x < mapWidth && y > 0 && y < mapHeight) {
        wallY = (y + (up ? -1 : 0)) >> 0;
        wallX = x >> 0;

        if (map[wallY][wallX] !== 0) {
            const distX = x - player.x;
            const distY = y - player.y;
            const blockDist = distX * distX + distY * distY;
            if (!dist || blockDist < dist) {
                dist = blockDist;
                xHit = x;
                yHit = y;
                xWallHit = wallX;
                yWallHit = wallY;

                wallType = map[wallY][wallX];
                textureX = x % 1;
                if (up) textureX = 1 - textureX;

                wallIsShaded = false;
            }
            break;
        }
        x += dXHor;
        y += dYHor;
    }

    if (dist) {
        if (showViewingCone) {
            drawViewingCone(xHit, yHit);
        }

        const strip = screenStrips.children[stripIdx];

        if (!strip) {
            console.error(
                `Rendering Error: Index ${stripIdx} is out of range.`
            );
            return;
        }

        dist = Math.sqrt(dist);

        // use perpendicular distance to adjust for fish eye
        // distorted_dist = correct_dist / cos(relative_angle_of_ray)
        dist *= Math.cos(player.rot - rayAngle);

        // now calc the position, height and width of the wall strip

        // 'real' wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
        // thus the height on the screen is equal to wall_height_real * viewDist / dist

        const height = Math.round(viewDist / dist);

        // width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
        const width = height * stripWidth;

        // top placement is easy since everything is centered on the x-axis, so we simply move
        // it half way down the screen and then half the wall height back up.
        const top = Math.round((screenHeight - height) / 2);

        const imgTop = 0;

        const style = strip.style;
        const oldStyles = strip.oldStyles;

        const wallTexture = wallTextures[wallType];
        if (!wallTexture) {
            console.error(
                `Could not find texture '${wallType}' for wall at {x: ${wallX}, y: ${wallY}}`
            );
            return;
        }

        let src = null;

        // hardcoded: get wolfenstein textures from `wolf` folder
        if (isNaN(wallType)) {
            src = `${TEXTURE_PATH}/${wallTexture}${IMG_EXT}`;
        } else {
            src = `${TEXTURE_PATH}/${wallTexture}${IMG_EXT}`;
        }

        if (oldStyles.src !== src) {
            strip.src = src;
            oldStyles.src = src;
        }

        const styleHeight = height;

        if (oldStyles.height !== styleHeight) {
            style.height = `${styleHeight}px`;
            oldStyles.height = styleHeight;
        }

        let texX = Math.round(textureX * width);
        if (texX > width - stripWidth) {
            texX = width - stripWidth;
        }
        texX += wallIsShaded ? width : 0;

        const styleWidth = width >> 0;
        if (oldStyles.width !== styleWidth) {
            style.width = `${styleWidth}px`;
            oldStyles.width = styleWidth;
        }

        const styleTop = top - imgTop;
        if (oldStyles.top !== styleTop) {
            style.top = `${styleTop}px`;
            oldStyles.top = styleTop;
        }

        const styleLeft = stripIdx * stripWidth - texX;
        if (oldStyles.left !== styleLeft) {
            style.left = `${styleLeft}px`;
            oldStyles.left = styleLeft;
        }

        const styleClip = `rect(${imgTop}, ${texX + stripWidth}, ${imgTop +
            height}, ${texX})`;
        if (oldStyles.clip !== styleClip) {
            style.clip = styleClip;
            oldStyles.clip = styleClip;
        }

        const dwx = xWallHit - player.x;
        const dwy = yWallHit - player.y;
        const wallDist = dwx * dwx + dwy * dwy;
        const styleZIndex = -(wallDist * 1000) >> 0;
        if (styleZIndex !== oldStyles.zIndex) {
            strip.style.zIndex = styleZIndex;
            oldStyles.zIndex = styleZIndex;
        }
    }
};
