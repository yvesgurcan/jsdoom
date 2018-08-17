import {
    ext,
    wolfPath,
} from './constants';
import {
    getState,
    dispatch,
} from './store';
import bindKeys from './bindKeys';
import initPlayer from './initPlayer';
import initSprites from './initSprites';
import initEnemies from './initEnemies';
import renderEnemies from './renderEnemies';
import updateOverlay from './updateOverlay';
import updateMiniMap from './updateMiniMap';
import drawMiniMap from './drawMiniMap';
import gameCycle from './gameCycle';

// just a few helper functions
const $ = (id) => document.getElementById(id);
const dc = (tag) => document.createElement(tag);

let mapWidth = 0;
let mapHeight = 0;

const miniMapScale = 10;

const screenWidth = 320;
const screenHeight = 200;

const showOverlay = true;

const stripWidth = 3;
const fov = (60 * Math.PI) / 180;

const numRays = Math.ceil(screenWidth / stripWidth);
const fovHalf = fov / 2;

const viewDist = (screenWidth / 2) / Math.tan((fov / 2));

const twoPI = Math.PI * 2;


const screenStrips = [];

function init() {
    const { wallMap: map } = getState();
	mapWidth = map[0].length;
	mapHeight = map.length;

	bindKeys();

	initScreen();
    initPlayer();
	initSprites();
	initEnemies();

	drawMiniMap();

	gameCycle();
	renderCycle();
}

var visibleSprites = [];
var oldVisibleSprites = [];

function renderCycle() {
	updateMiniMap();

	clearSprites();

	castRays();

	renderSprites();

	renderEnemies();

    const { lastRenderCycleTime } = getState();

	// time since last rendering
	const now = new Date().getTime();
	const timeDelta = now - lastRenderCycleTime;
	let cycleDelay = 1000 / 30;
	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
    }
    
    dispatch({ type: 'SET_LAST_RENDER_CYCLE_TIME', payload: now });

	setTimeout(renderCycle, cycleDelay);

	if (showOverlay) {
        const fps = 1000 / timeDelta;
		updateOverlay(fps);
	}
}
function clearSprites() {
	// clear the visible sprites array but keep a copy in oldVisibleSprites for later.
	// also mark all the sprites as not visible so they can be added to visibleSprites again during raycasting.
	oldVisibleSprites = [];
	for (let i = 0; i < visibleSprites.length; i++) {
		const sprite = visibleSprites[i];
		oldVisibleSprites[i] = sprite;
		sprite.visible = false;
	}
	visibleSprites = [];
}

function renderSprites() {
    const { player } = getState();
	for (let i = 0; i < visibleSprites.length; i++) {
		const sprite = visibleSprites[i];
		const img = sprite.img;
		img.style.display = 'block';

		// translate position to viewer space
		const dx = sprite.x + 0.5 - player.x;
		const dy = sprite.y + 0.5 - player.y;

		// distance to sprite
		const dist = Math.sqrt(dx * dx + dy * dy);

		// sprite angle relative to viewing angle
		const spriteAngle = Math.atan2(dy, dx) - player.rot;

		// size of the sprite
		const size = viewDist / (Math.cos(spriteAngle) * dist);

		if (size <= 0) continue;

		// x-position on screen
		const x = Math.tan(spriteAngle) * viewDist;

		img.style.left = (screenWidth / 2 + x - size / 2) + 'px';

		// y is constant since we keep all sprites at the same height and vertical position
		img.style.top = ((screenHeight - size) / 2) + 'px';

		img.style.width = size + 'px';
		img.style.height =  size + 'px';

		const dbx = sprite.x - player.x;
		const dby = sprite.y - player.y;
		const blockDist = dbx * dbx + dby * dby;
		img.style.zIndex = -Math.floor(blockDist * 1000);
	}

	// hide the sprites that are no longer visible
	for (let i = 0; i < oldVisibleSprites.length; i++) {
		const sprite = oldVisibleSprites[i];
		if (visibleSprites.indexOf(sprite) < 0) {
			sprite.visible = false;
			sprite.img.style.display = 'none';
		}
	}
}

function initScreen() {
	const screen = $('screen');

	for (let i = 0; i < screenWidth; i += stripWidth) {
		const strip = dc('img');
		strip.style.position = 'absolute';
		strip.style.height = '0px';
		strip.style.left = strip.style.top = '0px';

		strip.oldStyles = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			clip: '',
			src: ''
		};

		screenStrips.push(strip);
		screen.appendChild(strip);
	}

	// overlay div for adding text like fps count, etc.
	const overlay = dc('div');
	overlay.id = 'overlay';
	overlay.style.display = showOverlay ? 'block' : 'none';
	screen.appendChild(overlay);
}

function castRays() {
	let stripIdx = 0;

    const { player } = getState();

	for (let i = 0; i < numRays; i++) {
		// where on the screen does ray go through?
		const rayScreenPos = (-numRays / 2 + i) * stripWidth;

		// the distance from the viewer to the point on the screen, simply Pythagoras.
		const rayViewDist = Math.sqrt(rayScreenPos * rayScreenPos + viewDist * viewDist);

		// the angle of the ray, relative to the viewing direction.
		// right triangle: a = sin(A) * c
		const rayAngle = Math.asin(rayScreenPos / rayViewDist);

		castSingleRay(
			player.rot + rayAngle, 	// add the players viewing direction to get the angle in world space
			stripIdx++
		);
	}
}

function castSingleRay(rayAngle, stripIdx) {
    const { player } = getState();

	// first make sure the angle is between 0 and 360 degrees
	rayAngle %= twoPI;
	if (rayAngle < 0) rayAngle += twoPI;

	// moving right/left? up/down? Determined by which quadrant the angle is in.
	var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
	var up = (rayAngle < 0 || rayAngle > Math.PI);

	var wallType = 0;

	// only do these once
	var angleSin = Math.sin(rayAngle);
	var angleCos = Math.cos(rayAngle);

	var dist = 0;	// the distance to the block we hit
	var xHit = 0; 	// the x and y coord of where the ray hit the block
	var yHit = 0;
	var xWallHit = 0;
	var yWallHit = 0;

	var textureX;	// the x-coord on the texture of the block, ie. what part of the texture are we going to render
	var wallX;	// the (x,y) map coords of the block
	var wallY;

	var wallIsShaded = false;

	var wallIsHorizontal = false;

	// first check against the vertical map/wall lines
	// we do this by moving to the right or left edge of the block we're standing in
	// and then moving in 1 map unit steps horizontally. The amount we have to move vertically
	// is determined by the slope of the ray, which is simply defined as sin(angle) / cos(angle).

	var slope = angleSin / angleCos; 	// the slope of the straight line made by the ray
	var dXVer = right ? 1 : -1; 	// we move either 1 map unit to the left or right
	var dYVer = dXVer * slope; 	// how much to move up or down

	var x = right ? Math.ceil(player.x) : Math.floor(player.x);	// starting horizontal position, at one of the edges of the current map block
	var y = player.y + (x - player.x) * slope;			// starting vertical position. We add the small horizontal step we just made, multiplied by the slope.

    const {
        decorationMapPlacement: spriteMap,
        wallTypes: wallTextures,
        wallMap: map,
    } = getState();

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallX = (x + (right ? 0 : -1))>>0;
		var wallY = (y)>>0;

		if (spriteMap[wallY][wallX] && !spriteMap[wallY][wallX].visible) {
			spriteMap[wallY][wallX].visible = true;
			visibleSprites.push(spriteMap[wallY][wallX]);
		}

		// is this point inside a wall block?
		if (map[wallY][wallX] !== 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			dist = distX*distX + distY*distY;	// the distance from the player to this point, squared.

			wallType = map[wallY][wallX]; // we'll remember the type of wall we hit for later
            textureX = y % 1;	// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.
			if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed

			xHit = x;	// save the coordinates of the hit. We only really use these to draw the rays on minimap.
			yHit = y;
			xWallHit = wallX;
			yWallHit = wallY;

			// make horizontal walls shaded
			wallIsShaded = true;

			wallIsHorizontal = true;

			break;
		}
		x = x + dXVer;
		y = y + dYVer;
	}

	// now check against horizontal lines. It's basically the same, just 'turned around'.
	// the only difference here is that once we hit a map block, 
	// we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.
	// If so, we only register this hit if this distance is smaller.

	var slope = angleCos / angleSin;
	var dYHor = up ? -1 : 1;
	var dXHor = dYHor * slope;
	var y = up ? Math.floor(player.y) : Math.ceil(player.y);
	var x = player.x + (y - player.y) * slope;

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallY = (y + (up ? -1 : 0))>>0;
		var wallX = (x)>>0;

		if (spriteMap[wallY][wallX] && !spriteMap[wallY][wallX].visible) {
			spriteMap[wallY][wallX].visible = true;
			visibleSprites.push(spriteMap[wallY][wallX]);
		}

		if (map[wallY][wallX] !== 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			var blockDist = distX*distX + distY*distY;
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
		x = x + dXHor;
		y = y + dYHor;
	}

	if (dist) {
		drawRay(xHit, yHit);

		var strip = screenStrips[stripIdx];

		dist = Math.sqrt(dist);

		// use perpendicular distance to adjust for fish eye
		// distorted_dist = correct_dist / cos(relative_angle_of_ray)
		dist = dist * Math.cos(player.rot - rayAngle);

		// now calc the position, height and width of the wall strip

		// 'real' wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
		// thus the height on the screen is equal to wall_height_real * viewDist / dist

		var height = Math.round(viewDist / dist);

		// width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
		var width = height * stripWidth;

		// top placement is easy since everything is centered on the x-axis, so we simply move
		// it half way down the screen and then half the wall height back up.
		var top = Math.round((screenHeight - height) / 2);

		var imgTop = 0;

		var style = strip.style;
		var oldStyles = strip.oldStyles;

        var styleHeight;

        const wallTexture = wallTextures[wallType];
        if (!wallTexture) {
            console.error(`Could not find texture '${wallType}' for wall at {x: ${wallX}, y: ${wallY}}`);
            return;
        }

        const styleSrc = `${wolfPath}/${wallTexture}${ext}`;
        if (oldStyles.src !== styleSrc) {
            strip.src = styleSrc;
            oldStyles.src = styleSrc
        }
        var styleHeight = height;

		if (oldStyles.height !== styleHeight) {
			style.height = styleHeight + 'px';
			oldStyles.height = styleHeight
		}

		var texX = Math.round(textureX*width);
		if (texX > width - stripWidth)
			texX = width - stripWidth;
		texX += (wallIsShaded ? width : 0);

		var styleWidth = (width*2)>>0;
		if (oldStyles.width !== styleWidth) {
			style.width = styleWidth +'px';
			oldStyles.width = styleWidth;
		}

		var styleTop = top - imgTop;
		if (oldStyles.top !== styleTop) {
			style.top = styleTop + 'px';
			oldStyles.top = styleTop;
		}

		var styleLeft = stripIdx*stripWidth - texX;
		if (oldStyles.left !== styleLeft) {
			style.left = styleLeft + 'px';
			oldStyles.left = styleLeft;
		}

		var styleClip = 'rect(' + imgTop + ', ' + (texX + stripWidth)  + ', ' + (imgTop + height) + ', ' + texX + ')';
		if (oldStyles.clip !== styleClip) {
			style.clip = styleClip;
			oldStyles.clip = styleClip;
		}

		var dwx = xWallHit - player.x;
		var dwy = yWallHit - player.y;
		var wallDist = dwx*dwx + dwy*dwy;
		var styleZIndex = -(wallDist*1000)>>0;
		if (styleZIndex !== oldStyles.zIndex) {
			strip.style.zIndex = styleZIndex;
			oldStyles.zIndex = styleZIndex;
		}
	}
}

function drawRay(rayX, rayY) {
	var miniMapObjects = $('minimapobjects');
	var objectCtx = miniMapObjects.getContext('2d');

    const { player } = getState();

	objectCtx.strokeStyle = 'rgba(0,100,0,0.3)';
	objectCtx.lineWidth = 0.5;
	objectCtx.beginPath();
	objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
	objectCtx.lineTo(
		rayX * miniMapScale,
		rayY * miniMapScale
	);
	objectCtx.closePath();
	objectCtx.stroke();
}

setTimeout(init, 1);
