import store from './store';
const { getState, dispatch } = store;
import $ from './getElementById';
import dc from './createElement';
import {
    map,
    mapWidth,
    mapHeight,
} from './map';
import {
    miniMapScale,
    screenWidth,
    screenHeight,
    stripWidth,
    numRays,
    viewDist,
    twoPI,
    numTextures,
} from './constants';

var player = {
	x : 16,			// current x, y position
	y : 10,
	dir : 0,		// the direction that the player is turning, either -1 for left or 1 for right.
	rot : 0,		// the current angle of rotation
	speed : 0,		// is the playing moving forward (speed = 1) or backwards (speed = -1).
	moveSpeed : 0.18,	// how far (in map units) does the player move each step/update
	rotSpeed : 6 * Math.PI / 180	// how much does the player rotate each step/update (in radians)
}

function init() {
	bindKeys();

	initScreen();

	drawMiniMap();

	gameCycle();
}

var screenStrips = [];

// bind keyboard events to game functions (movement, etc)
function bindKeys() {
	document.onkeydown = function(e) {
		e = e || window.event;

		switch (e.keyCode) {

            case 38:
                dispatch({ type: 'PLAYER_MOVE_FORWARD' });
				break;

			case 40:
                dispatch({ type: 'PLAYER_MOVE_BACKWARD' });
				break;

			case 37:
                dispatch({ type: 'PLAYER_TURN_LEFT' });
				break;

			case 39:
                dispatch({ type: 'PLAYER_TURN_RIGHT' });
				break;
		}
	}

	document.onkeyup = function(e) {
		e = e || window.event;

		switch (e.keyCode) {
			case 38:
            case 40:
                dispatch({ type: 'PLAYER_MOVE_STOP' });
				break;
			case 37:
			case 39:
                dispatch({ type: 'PLAYER_TURN_STOP' });
				break;
		}
	}
}

function initScreen() {
	var screen = $("screen");

	for (let i = 0; i < screenWidth; i += stripWidth) {
		var strip = dc("div");
		strip.style.position = "absolute";
		strip.style.left = i + "px";
		strip.style.width = stripWidth+"px";
		strip.style.height = "0px";
		strip.style.overflow = "hidden";

		strip.style.backgroundColor = "magenta";

		var img = new Image();
		img.src = (window.opera ? "walls-19-colors.png" : "walls.png");
		img.style.position = "absolute";
		img.style.left = "0px";

		strip.appendChild(img);
		strip.img = img;	// assign the image to a property on the strip element so we have easy access to the image later

		screenStrips.push(strip);
		screen.appendChild(strip);
	}

}

function gameCycle() {
	move();

	updateMiniMap();

	castRays();

	setTimeout(gameCycle,1000/30); // aim for 30 FPS
}

function move() {
	var moveStep = player.speed * player.moveSpeed;	// player will move this far along the current direction vector

	player.rot += player.dir * player.rotSpeed; // add rotation if player is rotating (player.dir != 0)

	// make sure the angle is between 0 and 360 degrees
	//while (player.rot < 0) player.rot += twoPI;
	//while (player.rot >= twoPI) player.rot -= twoPI;

	var newX = player.x + Math.cos(player.rot) * moveStep;	// calculate new player position with simple trigonometry
	var newY = player.y + Math.sin(player.rot) * moveStep;

	if (isBlocking(newX, newY)) {	// are we allowed to move to the new position?
		return; // no, bail out.
	}

	player.x = newX; // set new position
	player.y = newY;
}

function castRays() {
	var stripIdx = 0;

	for (let i = 0; i < numRays; i++) {
		// where on the screen does ray go through?
		var rayScreenPos = (-numRays/2 + i) * stripWidth;

		// the distance from the viewer to the point on the screen, simply Pythagoras.
		var rayViewDist = Math.sqrt(rayScreenPos*rayScreenPos + viewDist*viewDist);

		// the angle of the ray, relative to the viewing direction.
		// right triangle: a = sin(A) * c
		var rayAngle = Math.asin(rayScreenPos / rayViewDist);

		castSingleRay(
			player.rot + rayAngle, 	// add the players viewing direction to get the angle in world space
			stripIdx++
		);
	}
}

function castSingleRay(rayAngle, stripIdx) {
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

	var textureX;	// the x-coord on the texture of the block, ie. what part of the texture are we going to render
	var wallX;	// the (x,y) map coords of the block
	var wallY;

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

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallX = Math.floor(x + (right ? 0 : -1));
		var wallY = Math.floor(y);

		// is this point inside a wall block?
		if (map[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			dist = distX*distX + distY*distY;	// the distance from the player to this point, squared.

			wallType = map[wallY][wallX]; // we'll remember the type of wall we hit for later
			textureX = y % 1;	// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.
			if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed

			xHit = x;	// save the coordinates of the hit. We only really use these to draw the rays on minimap.
			yHit = y;

			wallIsHorizontal = true;

			break;
		}
		x += dXVer;
		y += dYVer;
	}



	// now check against horizontal lines. It's basically the same, just "turned around".
	// the only difference here is that once we hit a map block,
	// we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.
	// If so, we only register this hit if this distance is smaller.

	var slope = angleCos / angleSin;
	var dYHor = up ? -1 : 1;
	var dXHor = dYHor * slope;
	var y = up ? Math.floor(player.y) : Math.ceil(player.y);
	var x = player.x + (y - player.y) * slope;

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallY = Math.floor(y + (up ? -1 : 0));
		var wallX = Math.floor(x);
		if (map[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			var blockDist = distX*distX + distY*distY;
			if (!dist || blockDist < dist) {
				dist = blockDist;
				xHit = x;
				yHit = y;

				wallType = map[wallY][wallX];
				textureX = x % 1;
				if (up) textureX = 1 - textureX;
			}
			break;
		}
		x += dXHor;
		y += dYHor;
	}

	if (dist) {
		//drawRay(xHit, yHit);

		var strip = screenStrips[stripIdx];

		dist = Math.sqrt(dist);

		// use perpendicular distance to adjust for fish eye
		// distorted_dist = correct_dist / cos(relative_angle_of_ray)
		dist = dist * Math.cos(player.rot - rayAngle);

		// now calc the position, height and width of the wall strip

		// "real" wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
		// thus the height on the screen is equal to wall_height_real * viewDist / dist

		var height = Math.round(viewDist / dist);

		// width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
		var width = height * stripWidth;

		// top placement is easy since everything is centered on the x-axis, so we simply move
		// it half way down the screen and then half the wall height back up.
		var top = Math.round((screenHeight - height) / 2);

		strip.style.height = height+"px";
		strip.style.top = top+"px";

		strip.img.style.height = Math.floor(height * numTextures) + "px";
		strip.img.style.width = Math.floor(width*2) +"px";
		strip.img.style.top = -Math.floor(height * (wallType-1)) + "px";

		var texX = Math.round(textureX*width);

		if (texX > width - stripWidth)
			texX = width - stripWidth;

		strip.img.style.left = -texX + "px";

	}

}

function drawRay(rayX, rayY) {
	var miniMapObjects = $("minimapobjects");
	var objectCtx = miniMapObjects.getContext("2d");

	objectCtx.strokeStyle = "rgba(0,100,0,0.3)";
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

function isBlocking(x,y) {
	// first make sure that we cannot move outside the boundaries of the level
	if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth)
		return true;

	// return true if the map block is not 0, ie. if there is a blocking wall.
	return (map[Math.floor(y)][Math.floor(x)] != 0);
}

function updateMiniMap() {
	var miniMapObjects = $("minimapobjects");

	var objectCtx = miniMapObjects.getContext("2d");
	miniMapObjects.width = miniMapObjects.width;

	objectCtx.fillStyle = "red";
	objectCtx.fillRect(		// draw a dot at the current player position
		player.x * miniMapScale - 2,
		player.y * miniMapScale - 2,
		4, 4
	);

	objectCtx.strokeStyle = "red";
	objectCtx.beginPath();
	objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
	objectCtx.lineTo(
		(player.x + Math.cos(player.rot) * 4) * miniMapScale,
		(player.y + Math.sin(player.rot) * 4) * miniMapScale
	);
	objectCtx.closePath();
	objectCtx.stroke();
}

function drawMiniMap() {
	// draw the topdown view minimap

	var miniMap = $("minimap");			// the actual map
	var miniMapCtr = $("minimapcontainer");		// the container div element
	var miniMapObjects = $("minimapobjects");	// the canvas used for drawing the objects on the map (player character, etc)

	miniMap.width = mapWidth * miniMapScale;	// resize the internal canvas dimensions
	miniMap.height = mapHeight * miniMapScale;	// of both the map canvas and the object canvas
	miniMapObjects.width = miniMap.width;
	miniMapObjects.height = miniMap.height;

	var w = (mapWidth * miniMapScale) + "px" 	// minimap CSS dimensions
	var h = (mapHeight * miniMapScale) + "px"
	miniMap.style.width = miniMapObjects.style.width = miniMapCtr.style.width = w;
	miniMap.style.height = miniMapObjects.style.height = miniMapCtr.style.height = h;

	var ctx = miniMap.getContext("2d");

	ctx.fillStyle = "white";
	ctx.fillRect(0,0,miniMap.width,miniMap.height);

	// loop through all blocks on the map
	for (var y=0;y<mapHeight;y++) {
		for (var x=0;x<mapWidth;x++) {

			var wall = map[y][x];

			if (wall > 0) { // if there is a wall block at this (x,y) ...

				ctx.fillStyle = "rgb(200,200,200)";
				ctx.fillRect(				// ... then draw a block on the minimap
					x * miniMapScale,
					y * miniMapScale,
					miniMapScale,miniMapScale
				);

			}
		}
	}

	updateMiniMap();
}

setTimeout(init, 1);
