/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/engine/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/engine/3dview.js":
/*!*************************************!*\
  !*** ./client/src/engine/3dview.js ***!
  \*************************************/
/*! exports provided: castRays, castSingleRay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"castRays\", function() { return castRays; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"castSingleRay\", function() { return castSingleRay; });\n/* harmony import */ var _map_walls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map/walls */ \"./client/src/map/walls.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./client/src/engine/constants.js\");\n/* harmony import */ var _minimap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minimap */ \"./client/src/engine/minimap.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\n\n\nconst { getState } = _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n\nfunction castRays() {\n\tlet stripIdx = 0;\n\n    const { screen } = getState();\n    const { numRays, viewDist } = screen;\n\n\tfor (let i = 0; i < numRays; i++) {\n\t\t// where on the screen does ray go through?\n\t\tconst rayScreenPos = ((-numRays / 2) + i) * _constants__WEBPACK_IMPORTED_MODULE_1__[\"stripWidth\"];\n\n\t\t// the distance from the viewer to the point on the screen, simply Pythagoras.\n\t\tconst rayViewDist = Math.sqrt((rayScreenPos * rayScreenPos) + (viewDist * viewDist));\n\n\t\t// the angle of the ray, relative to the viewing direction.\n\t\t// right triangle: a = sin(A) * c\n\t\tconst rayAngle = Math.asin(rayScreenPos / rayViewDist);\n\n        const { player } = getState();\n\n\t\tcastSingleRay(\n            // add the players viewing direction to get the angle in world space\n\t\t\tplayer.rot + rayAngle, \n\t\t\tstripIdx++\n\t\t);\n\t}\n}\n\nlet xWallHit = 0;\nlet yWallHit = 0;\nfunction castSingleRay(rayAngle, stripIdx) {\n    if (stripIdx % 10 === 0) {\n        // debugger\n    }\n\t// first make sure the angle is between 0 and 360 degrees\n\trayAngle %= _constants__WEBPACK_IMPORTED_MODULE_1__[\"twoPI\"];\n\tif (rayAngle < 0) rayAngle += _constants__WEBPACK_IMPORTED_MODULE_1__[\"twoPI\"];\n\n\t// moving right/left? up/down? Determined by which quadrant the angle is in.\n\tvar right = (rayAngle > _constants__WEBPACK_IMPORTED_MODULE_1__[\"twoPI\"] * 0.75 || rayAngle < _constants__WEBPACK_IMPORTED_MODULE_1__[\"twoPI\"] * 0.25);\n\tvar up = (rayAngle < 0 || rayAngle > Math.PI);\n\n\t// only do these once\n\tvar angleSin = Math.sin(rayAngle);\n\tvar angleCos = Math.cos(rayAngle);\n\n\tvar dist = 0;\t// the distance to the block we hit\n\tvar xHit = 0; \t// the x and y coord of where the ray hit the block\n\tvar yHit = 0;\n\n\tvar textureX;\t// the x-coord on the texture of the block, ie. what part of the texture are we going to render\n\tvar wallX;\t// the (x,y) map coords of the block\n\tvar wallY;\n\n    var wallIsShaded = false;\n    \n\tvar wallIsHorizontal = false;\n\n\t// first check against the vertical map/wall lines\n\t// we do this by moving to the right or left edge of the block we're standing in\n\t// and then moving in 1 map unit steps horizontally. The amount we have to move vertically\n\t// is determined by the slope of the ray, which is simply defined as sin(angle) / cos(angle).\n\n\tvar slope = angleSin / angleCos; \t// the slope of the straight line made by the ray\n\tvar dXVer = right ? 1 : -1; \t// we move either 1 map unit to the left or right\n\tvar dYVer = dXVer * slope; \t// how much to move up or down\n\n    const { player } = getState();\n\n\tvar x = right ? Math.ceil(player.x) : Math.floor(player.x);\t// starting horizontal position, at one of the edges of the current map block\n\tvar y = player.y + (x - player.x) * slope;\t\t\t// starting vertical position. We add the small horizontal step we just made, multiplied by the slope.\n\n    const { screen } = getState();\n    const { height: screenHeight } = screen;\n\n\n    const { spriteMap, sprites: { visibleSprites } } = getState();\n\n    let wallType = null;\n\twhile (x >= 0 && x < _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"mapWidth\"] && y >= 0 && y < _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"mapHeight\"]) {\n\t\tvar wallX = (x + (right ? 0 : -1))>>0;\n\t\tvar wallY = (y)>>0;\n\n\t\tif (spriteMap[wallY][wallX] && !spriteMap[wallY][wallX].visible) {\n\t\t\tspriteMap[wallY][wallX].visible = true;\n\t\t\tvisibleSprites.push(spriteMap[wallY][wallX]);\n\t\t}\n\n\t\t// is this point inside a wall block?\n\t\tif (_map_walls__WEBPACK_IMPORTED_MODULE_0__[\"map\"][wallY][wallX] > 0) {\n\t\t\tvar distX = x - player.x;\n\t\t\tvar distY = y - player.y;\n\t\t\tdist = (distX * distX) + (distY * distY);\t// the distance from the player to this point, squared.\n\n\t\t\twallType = _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"map\"][wallY][wallX]; // we'll remember the type of wall we hit for later\n\t\t\ttextureX = y % 1;\t// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.\n\t\t\tif (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed\n\n\t\t\txHit = x;\t// save the coordinates of the hit. We only really use these to draw the rays on minimap.\n\t\t\tyHit = y;\n\t\t\txWallHit = wallX;\n\t\t\tyWallHit = wallY;\n\n\t\t\t// make horizontal walls shaded\n\t\t\twallIsShaded = true;\n\n\t\t\twallIsHorizontal = true;\n\n\t\t\tbreak;\n\t\t}\n\t\tx = x + dXVer;\n\t\ty = y + dYVer;\n\t}\n\n\t// now check against horizontal lines. It's basically the same, just 'turned around'.\n\t// the only difference here is that once we hit a map block,\n\t// we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.\n\t// If so, we only register this hit if this distance is smaller.\n\n\tvar slope = angleCos / angleSin;\n\tvar dYHor = up ? -1 : 1;\n\tvar dXHor = dYHor * slope;\n\tvar y = up ? Math.floor(player.y) : Math.ceil(player.y);\n\tvar x = player.x + (y - player.y) * slope;\n\n\twhile (x >= 0 && x < _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"mapWidth\"] && y >= 0 && y < _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"mapHeight\"]) {\n\t\tvar wallY = (y + (up ? -1 : 0)) >> 0;\n        var wallX = (x) >> 0;\n        \n\t\tif (spriteMap[wallY][wallX] && !spriteMap[wallY][wallX].visible) {\n\t\t\tspriteMap[wallY][wallX].visible = true;\n\t\t\tvisibleSprites.push(spriteMap[wallY][wallX]);\n\t\t}\n\n\t\tif (_map_walls__WEBPACK_IMPORTED_MODULE_0__[\"map\"][wallY][wallX] > 0) {\n\t\t\tvar distX = x - player.x;\n\t\t\tvar distY = y - player.y;\n\t\t\tvar blockDist = (distX * distX) + (distY * distY);\n\t\t\tif (!dist || blockDist < dist) {\n\t\t\t\tdist = blockDist;\n\t\t\t\txHit = x;\n\t\t\t\tyHit = y;\n\t\t\t\txWallHit = wallX;\n\t\t\t\tyWallHit = wallY;\n\n\t\t\t\twallType = _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"map\"][wallY][wallX];\n\t\t\t\ttextureX = x % 1;\n\t\t\t\tif (up) textureX = 1 - textureX;\n\n\t\t\t\twallIsShaded = false;\n\t\t\t}\n\t\t\tbreak;\n\t\t}\n\t\tx = x + dXHor;\n\t\ty = y + dYHor;\n\t}\n\n\tif (dist > 0) {\n\t\tObject(_minimap__WEBPACK_IMPORTED_MODULE_2__[\"drawRay\"])(xHit, yHit);\n\n        const { screen: screenState } = getState();\n        const { strips, viewDist } = screenState;\n\n        if (stripIdx < strips.length) {\n            const strip = strips[stripIdx];\n\n            dist = Math.sqrt(dist);\n\n            // use perpendicular distance to adjust for fish eye\n            // distorted_dist = correct_dist / cos(relative_angle_of_ray)\n            dist *= Math.cos(player.rot - rayAngle);\n\n            // now calc the position, height and width of the wall strip\n\n            // 'real' wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,\n            // thus the height on the screen is equal to wall_height_real * viewDist / dist\n\n            const height = Math.round(viewDist / dist);\n\n            // width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly\n            const width = height * _constants__WEBPACK_IMPORTED_MODULE_1__[\"stripWidth\"];\n\n            // top placement is easy since everything is centered on the x-axis, so we simply move\n            // it half way down the screen and then half the wall height back up.\n            const top = Math.round(((screenHeight / 2) - height) / 2);\n\n            let imgTop = 0;\n\n            const style = strip.style;\n            const oldStyles = strip.oldStyles;\n\n            // then adjust the top placement according to which wall texture we need\n            imgTop = (height * (wallType - 1)) >> 0;\n\n            // FIXME: not a true value\n            const numTextures = 999;\n\n            const styleHeight = (height * numTextures) >> 0;\n\n            if (oldStyles.height !== styleHeight) {\n                style.height = `${styleHeight}px`;\n                oldStyles.height = styleHeight;\n            }\n\n            let texX = Math.round(textureX * width);\n            if (texX > width - _constants__WEBPACK_IMPORTED_MODULE_1__[\"stripWidth\"]) {\n                texX = width - _constants__WEBPACK_IMPORTED_MODULE_1__[\"stripWidth\"];\n            }\n            texX += (wallIsShaded ? width : 0);\n\n            const styleWidth = (width * 2) >> 0;\n            if (oldStyles.width !== styleWidth) {\n                style.width = `${styleWidth}px`;\n                oldStyles.width = styleWidth;\n            }\n\n            const styleTop = top - imgTop;\n            if (oldStyles.top !== styleTop) {\n                style.top = `${styleTop}px`;\n                oldStyles.top = styleTop;\n            }\n\n            const styleLeft = (stripIdx * _constants__WEBPACK_IMPORTED_MODULE_1__[\"stripWidth\"]) - texX;\n            if (oldStyles.left !== styleLeft) {\n                style.left = `${styleLeft}px`;\n                oldStyles.left = styleLeft;\n            }\n\n            const styleClip = `rect(${imgTop}, ${texX + _constants__WEBPACK_IMPORTED_MODULE_1__[\"stripWidth\"]}, ${imgTop + height}, ${texX})`;\n            if (oldStyles.clip !== styleClip) {\n                style.clip = styleClip;\n                oldStyles.clip = styleClip;\n            }\n\n            const dwx = xWallHit - player.x;\n            const dwy = yWallHit - player.y;\n            const wallDist = (dwx * dwx) + (dwy * dwy);\n            const styleZIndex = -(wallDist * 1000) >> 0;\n            if (styleZIndex !== oldStyles.zIndex) {\n                strip.style.zIndex = styleZIndex;\n                oldStyles.zIndex = styleZIndex;\n            }\n        }\n\t}\n}\n\n\n//# sourceURL=webpack:///./client/src/engine/3dview.js?");

/***/ }),

/***/ "./client/src/engine/ai.js":
/*!*********************************!*\
  !*** ./client/src/engine/ai.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./move */ \"./client/src/engine/move.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\nconst { getState } = _store__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((timeDelta) => {\n    const { player, enemies } = getState();\n\n\tfor (let i = 0; i < enemies.length; i++) {\n\t\tconst enemy = enemies[i];\n\n\t\tconst dx = player.x - enemy.x;\n\t\tconst dy = player.y - enemy.y;\n\n\t\tconst dist = Math.sqrt((dx * dx) + (dy * dy));\n\t\tif (dist > 4) {\n\t\t\tconst angle = Math.atan2(dy, dx);\n\n\t\t\tenemy.rotDeg = angle * (180 / Math.PI);\n\t\t\tenemy.rot = angle;\n\t\t\tenemy.speed = 1;\n\n\t\t\tconst walkCycleTime = 1000;\n\t\t\tconst numWalkSprites = 4;\n\n\t\t\tenemy.state = Math.floor((new Date() % walkCycleTime) / (walkCycleTime / numWalkSprites)) + 1;\n\t\t} else {\n\t\t\tenemy.state = 0;\n\t\t\tenemy.speed = 0;\n\t\t}\n\n\t\tObject(_move__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(enemies[i], timeDelta);\n\t}\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/ai.js?");

/***/ }),

/***/ "./client/src/engine/bindKeys.js":
/*!***************************************!*\
  !*** ./client/src/engine/bindKeys.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\nconst { dispatch } = _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n// bind keyboard events to game functions (movement, etc)\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n\tdocument.onkeydown = function (event) {\n        event.preventDefault();\n\t\tconst { keyCode } = event;\n\t\tswitch (keyCode) {\n            case 38:\n                dispatch({ type: 'PLAYER_MOVE_FORWARD' });\n\t\t\t\tbreak;\n\n\t\t\tcase 40:\n                dispatch({ type: 'PLAYER_MOVE_BACKWARD' });\n\t\t\t\tbreak;\n\n\t\t\tcase 37:\n                dispatch({ type: 'PLAYER_TURN_LEFT' });\n\t\t\t\tbreak;\n\n\t\t\tcase 39:\n                dispatch({ type: 'PLAYER_TURN_RIGHT' });\n                break;\n            default:\n                break;\n\t\t}\n\t};\n\n\tdocument.onkeyup = function (event) {\n        event.preventDefault();\n\t\tconst { keyCode } = event;\n\t\tswitch (keyCode) {\n\t\t\tcase 38:\n            case 40:\n                dispatch({ type: 'PLAYER_MOVE_STOP' });\n\t\t\t\tbreak;\n\t\t\tcase 37:\n\t\t\tcase 39:\n                dispatch({ type: 'PLAYER_TURN_STOP' });\n                break;\n            default:\n                break;\n\t\t}\n\t};\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/bindKeys.js?");

/***/ }),

/***/ "./client/src/engine/checkCollision.js":
/*!*********************************************!*\
  !*** ./client/src/engine/checkCollision.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _isBlocking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isBlocking */ \"./client/src/engine/isBlocking.js\");\n/* harmony import */ var _map_walls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../map/walls */ \"./client/src/map/walls.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((fromX, fromY, toX, toY, radius) => {\n\tconst pos = {\n\t\tx: fromX,\n\t\ty: fromY\n\t};\n\n\tif (toY < 0 || toY >= _map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapHeight\"] || toX < 0 || toX >= _map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapWidth\"]) {\n        return pos;\n    }\n\n\tconst blockX = Math.floor(toX);\n\tconst blockY = Math.floor(toY);\n\n\n\tif (Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX, blockY)) {\n\t\treturn pos;\n\t}\n\n\tpos.x = toX;\n\tpos.y = toY;\n\n\tconst blockTop = Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX, blockY - 1);\n\tconst blockBottom = Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX, blockY + 1);\n\tconst blockLeft = Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX - 1, blockY);\n\tconst blockRight = Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX + 1, blockY);\n\n\tif (blockTop !== 0 && toY - blockY < radius) {\n\t\ttoY = pos.y = blockY + radius;\n\t}\n\tif (blockBottom !== 0 && (blockY + 1) - toY < radius) {\n\t\ttoY = pos.y = (blockY + 1) - radius;\n\t}\n\tif (blockLeft !== 0 && toX - blockX < radius) {\n\t\ttoX = pos.x = blockX + radius;\n\t}\n\tif (blockRight !== 0 && (blockX + 1) - toX < radius) {\n\t\ttoX = pos.x = (blockX + 1) - radius;\n\t}\n\n\t// is tile to the top-left a wall\n\tif (Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX - 1, blockY - 1) !== 0 && !(blockTop !== 0 && blockLeft !== 0)) {\n\t\tconst dx = toX - blockX;\n\t\tconst dy = toY - blockY;\n\t\tif ((dx * dx) + (dy * dy) < radius * radius) {\n\t\t\tif (dx * dx > dy * dy) {\n\t\t\t\ttoX = pos.x = blockX + radius;\n            } else {\n                toY = pos.y = blockY + radius;\n            }\n\t\t}\n\t}\n\t// is tile to the top-right a wall\n\tif (Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX + 1, blockY - 1) !== 0 && !(blockTop !== 0 && blockRight !== 0)) {\n\t\tconst dx = toX - (blockX + 1);\n\t\tconst dy = toY - blockY;\n\t\tif ((dx * dx) + (dy * dy) < radius * radius) {\n\t\t\tif (dx * dx > dy * dy) {\n\t\t\t\ttoX = pos.x = (blockX + 1) - radius;\n            } else {\n                toY = pos.y = blockY + radius;\n            }\n\t\t}\n\t}\n\t// is tile to the bottom-left a wall\n\tif (Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX - 1, blockY + 1) !== 0 && !(blockBottom !== 0 && blockBottom !== 0)) {\n\t\tconst dx = toX - blockX;\n\t\tconst dy = toY - (blockY + 1);\n\t\tif ((dx * dx) + (dy * dy) < radius * radius) {\n\t\t\tif (dx * dx > dy * dy) {\n\t\t\t\ttoX = pos.x = blockX + radius;\n            } else {\n                toY = pos.y = (blockY + 1) - radius;\n            }\n\t\t}\n\t}\n\t// is tile to the bottom-right a wall\n\tif (Object(_isBlocking__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(blockX + 1, blockY + 1) !== 0 && !(blockBottom !== 0 && blockRight !== 0)) {\n\t\tconst dx = toX - (blockX + 1);\n\t\tconst dy = toY - (blockY + 1);\n\t\tif ((dx * dx) + (dy * dy) < radius * radius) {\n\t\t\tif (dx * dx > dy * dy) {\n\t\t\t\ttoX = pos.x = (blockX + 1) - radius;\n            } else {\n                toY = pos.y = (blockY + 1) - radius;\n            }\n\t\t}\n\t}\n\n\treturn pos;\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/checkCollision.js?");

/***/ }),

/***/ "./client/src/engine/clearSprites.js":
/*!*******************************************!*\
  !*** ./client/src/engine/clearSprites.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\nconst { dispatch, getState } = _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n\t// clear the visible sprites array but keep a copy in oldVisibleSprites for later.\n    // also mark all the sprites as not visible so they can be added to visibleSprites again during raycasting.\n    \n\n    const { sprites: { visibleSprites } } = getState();\n\n\tconst oldVisibleSprites = [];\n\tfor (let i = 0; i < visibleSprites.length; i++) {\n\t\tconst sprite = visibleSprites[i];\n\t\toldVisibleSprites[i] = sprite;\n\t\tsprite.visible = false;\n\t}\n    \n    dispatch({ type: 'SPRITES_SET', oldVisibleSprites, visibleSprites: [] });\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/clearSprites.js?");

/***/ }),

/***/ "./client/src/engine/constants.js":
/*!****************************************!*\
  !*** ./client/src/engine/constants.js ***!
  \****************************************/
/*! exports provided: miniMapScale, stripWidth, fov, fovHalf, twoPI, assetFolder, textureFolder, gameCycleDelay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"miniMapScale\", function() { return miniMapScale; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stripWidth\", function() { return stripWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fov\", function() { return fov; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fovHalf\", function() { return fovHalf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"twoPI\", function() { return twoPI; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assetFolder\", function() { return assetFolder; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"textureFolder\", function() { return textureFolder; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameCycleDelay\", function() { return gameCycleDelay; });\nconst miniMapScale = 8;\n\nconst stripWidth = 2;\nconst fov = 60 * (Math.PI / 180);\nconst fovHalf = fov / 2;\n\nconst twoPI = Math.PI * 2;\n\nconst assetFolder = '/client/assets';\nconst textureFolder = `${assetFolder}/textures`;\n\nconst gameCycleDelay = 1000 / 30;\n\n\n//# sourceURL=webpack:///./client/src/engine/constants.js?");

/***/ }),

/***/ "./client/src/engine/createElement.js":
/*!********************************************!*\
  !*** ./client/src/engine/createElement.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (tag) { return document.createElement(tag); });\n\n\n//# sourceURL=webpack:///./client/src/engine/createElement.js?");

/***/ }),

/***/ "./client/src/engine/getElementById.js":
/*!*********************************************!*\
  !*** ./client/src/engine/getElementById.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (id) { return document.getElementById(id); });\n\n\n//# sourceURL=webpack:///./client/src/engine/getElementById.js?");

/***/ }),

/***/ "./client/src/engine/index.js":
/*!************************************!*\
  !*** ./client/src/engine/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bindKeys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bindKeys */ \"./client/src/engine/bindKeys.js\");\n/* harmony import */ var _resizeView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resizeView */ \"./client/src/engine/resizeView.js\");\n/* harmony import */ var _initScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initScreen */ \"./client/src/engine/initScreen.js\");\n/* harmony import */ var _initSprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initSprites */ \"./client/src/engine/initSprites.js\");\n/* harmony import */ var _initEnemies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./initEnemies */ \"./client/src/engine/initEnemies.js\");\n/* harmony import */ var _minimap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./minimap */ \"./client/src/engine/minimap.js\");\n/* harmony import */ var _renderCycle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./renderCycle */ \"./client/src/engine/renderCycle.js\");\n/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./move */ \"./client/src/engine/move.js\");\n/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ai */ \"./client/src/engine/ai.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./constants */ \"./client/src/engine/constants.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nconst { dispatch, getState } = _store__WEBPACK_IMPORTED_MODULE_9__[\"default\"];\n\nfunction init() {\n    Object(_bindKeys__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    Object(_resizeView__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    Object(_initScreen__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    Object(_initSprites__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    Object(_initEnemies__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n\tObject(_minimap__WEBPACK_IMPORTED_MODULE_5__[\"drawMiniMap\"])();\n    gameLoop();\n    Object(_renderCycle__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\n}\n\nfunction gameLoop() {\n    const now = new Date().getTime();\n\n    // time since last game logic\n\n    const { lastGameCycleTime } = getState();\n    const timeDelta = now - lastGameCycleTime;\n    \n    console.log({ timeDelta });\n\n    const { player } = getState();\n    Object(_move__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(player, timeDelta);\n    \n    Object(_ai__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(timeDelta);\n\n    let cycleDelay = _constants__WEBPACK_IMPORTED_MODULE_10__[\"gameCycleDelay\"]; \n\n\tif (timeDelta > cycleDelay) {\n\t\tcycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));\n\t}\n    \n    // frames per second\n    setTimeout(gameLoop, cycleDelay); \n    dispatch({ type: 'LAST_GAME_CYCLE_TIME_SET', lastGameCycleTime: now });\n}\n\nsetTimeout(init, 75);\n\n\n//# sourceURL=webpack:///./client/src/engine/index.js?");

/***/ }),

/***/ "./client/src/engine/initEnemies.js":
/*!******************************************!*\
  !*** ./client/src/engine/initEnemies.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _getElementById__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getElementById */ \"./client/src/engine/getElementById.js\");\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createElement */ \"./client/src/engine/createElement.js\");\n/* harmony import */ var _resources_enemies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resources/enemies */ \"./client/src/resources/enemies.js\");\n/* harmony import */ var _map_enemies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../map/enemies */ \"./client/src/map/enemies.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\n\n\n\nconst { dispatch } = _store__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n\tconst screen = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('screen');\n\n    const enemies = [];\n\tfor (let i = 0; i < _map_enemies__WEBPACK_IMPORTED_MODULE_3__[\"default\"].length; i++) {\n\t\tconst enemy = _map_enemies__WEBPACK_IMPORTED_MODULE_3__[\"default\"][i];\n\t\tconst type = _resources_enemies__WEBPACK_IMPORTED_MODULE_2__[\"default\"][enemy.type];\n\t\tconst img = Object(_createElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('img');\n\t\timg.src = type.img;\n\t\timg.style.display = 'none';\n\t\timg.style.position = 'absolute';\n\n\t\tenemy.state = 0;\n\t\tenemy.rot = 0;\n\t\tenemy.rotDeg = 0;\n\t\tenemy.dir = 0;\n\t\tenemy.speed = 0;\n\t\tenemy.moveSpeed = type.moveSpeed;\n\t\tenemy.rotSpeed = type.rotSpeed;\n\t\tenemy.totalStates = type.totalStates;\n\n\t\tenemy.oldStyles = {\n\t\t\tleft: 0,\n\t\t\ttop: 0,\n\t\t\twidth: 0,\n\t\t\theight: 0,\n\t\t\tclip: '',\n\t\t\tdisplay: 'none',\n\t\t\tzIndex: 0,\n\t\t};\n\n\t\tenemy.img = img;\n\t\tenemies.push(enemy);\n\n\t\tscreen.appendChild(img);\n    }\n\n    dispatch({ type: 'ENEMIES_SET', enemies });\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/initEnemies.js?");

/***/ }),

/***/ "./client/src/engine/initScreen.js":
/*!*****************************************!*\
  !*** ./client/src/engine/initScreen.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _getElementById__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getElementById */ \"./client/src/engine/getElementById.js\");\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createElement */ \"./client/src/engine/createElement.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"./client/src/engine/constants.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\n\n\nconst { dispatch, getState } = _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const screen = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('scene');\n\n    const { screen: screenState } = getState();\n    const { width: screenWidth } = screenState;\n\n    const strips = [];\n\tfor (let i = 0; i < screenWidth; i += _constants__WEBPACK_IMPORTED_MODULE_2__[\"stripWidth\"]) {\n\t\tconst strip = Object(_createElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('img');\n\t\tstrip.style.position = 'absolute';\n\t\tstrip.style.height = '0px';\n\t\tstrip.style.left = strip.style.top = '0px';\n\n\t\tstrip.oldStyles = {\n\t\t\tleft: 0,\n\t\t\ttop: 0,\n\t\t\twidth: 0,\n\t\t\theight: 0,\n\t\t\tclip: '',\n\t\t\tsrc: '',\n\t\t};\n\n\t\tstrips.push(strip);\n        screen.appendChild(strip);\n    }\n    dispatch({ type: 'SCREEN_SET_STRIPS', strips });\n\n    // overlay div for adding text like fps count, etc.\n\tconst overlay = Object(_createElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('div');\n\toverlay.id = 'overlay';\n\toverlay.style.display = 'block';\n    screen.appendChild(overlay);\n\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/initScreen.js?");

/***/ }),

/***/ "./client/src/engine/initSprites.js":
/*!******************************************!*\
  !*** ./client/src/engine/initSprites.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _getElementById__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getElementById */ \"./client/src/engine/getElementById.js\");\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createElement */ \"./client/src/engine/createElement.js\");\n/* harmony import */ var _map_walls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../map/walls */ \"./client/src/map/walls.js\");\n/* harmony import */ var _resources_items__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/items */ \"./client/src/resources/items.js\");\n/* harmony import */ var _map_items__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../map/items */ \"./client/src/map/items.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\n\n\n\n\nconst { dispatch } = _store__WEBPACK_IMPORTED_MODULE_5__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const spriteMap = [];\n\tfor (let y = 0; y < _map_walls__WEBPACK_IMPORTED_MODULE_2__[\"map\"].length; y++) {\n\t\tspriteMap[y] = [];\n    }\n\n\tconst screen = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('screen');\n\n\tfor (let i = 0; i < _map_items__WEBPACK_IMPORTED_MODULE_4__[\"default\"].length; i++) {\n\t\tconst sprite = _map_items__WEBPACK_IMPORTED_MODULE_4__[\"default\"][i];\n\t\tconst itemType = _resources_items__WEBPACK_IMPORTED_MODULE_3__[\"default\"][sprite.type];\n\t\tconst img = Object(_createElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('img');\n\t\timg.src = itemType.img;\n\t\timg.style.display = 'none';\n\t\timg.style.position = 'absolute';\n\n\t\tsprite.visible = false;\n\t\tsprite.block = itemType.block;\n\t\tsprite.img = img;\n\n\t\tspriteMap[sprite.y][sprite.x] = sprite;\n\t\tscreen.appendChild(img);\n    }\n    \n    dispatch({ type: 'SPRITE_MAP_SET', spriteMap });\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/initSprites.js?");

/***/ }),

/***/ "./client/src/engine/isBlocking.js":
/*!*****************************************!*\
  !*** ./client/src/engine/isBlocking.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map_walls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map/walls */ \"./client/src/map/walls.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\nconst { getState } = _store__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((x, y) => {\n\t// first make sure that we cannot move outside the boundaries of the level\n\tif (y < 0 || y >= _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"mapHeight\"] || x < 0 || x >= _map_walls__WEBPACK_IMPORTED_MODULE_0__[\"mapWidth\"]) {\n        return true;\n    }\n\n\tconst ix = Math.floor(x);\n\tconst iy = Math.floor(y);\n\n    console.log({ ix, iy });\n    if (isNaN(iy) || isNaN(ix)) {\n        return true;\n    }\n\n\t// return true if the map block is not 0, ie. if there is a blocking wall.\n\tif (_map_walls__WEBPACK_IMPORTED_MODULE_0__[\"map\"][iy][ix] !== 0) {\n        return true;\n    }\n\n    const { spriteMap } = getState();\n\tif (spriteMap[iy][ix] && spriteMap[iy][ix].block) {\n        return true;\n    }\n\n\treturn false;\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/isBlocking.js?");

/***/ }),

/***/ "./client/src/engine/minimap.js":
/*!**************************************!*\
  !*** ./client/src/engine/minimap.js ***!
  \**************************************/
/*! exports provided: drawRay, updateMiniMap, drawMiniMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawRay\", function() { return drawRay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateMiniMap\", function() { return updateMiniMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawMiniMap\", function() { return drawMiniMap; });\n/* harmony import */ var _getElementById__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getElementById */ \"./client/src/engine/getElementById.js\");\n/* harmony import */ var _map_walls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../map/walls */ \"./client/src/map/walls.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"./client/src/engine/constants.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\n\n\nconst { getState } = _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n\nfunction drawRay(rayX, rayY) {\n    const { player } = getState();\n\n\tconst miniMapObjects = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('minimapobjects');\n\tconst objectCtx = miniMapObjects.getContext('2d');\n\n\tobjectCtx.strokeStyle = 'rgba(0,100,0,0.3)';\n\tobjectCtx.lineWidth = 0.5;\n\tobjectCtx.beginPath();\n\tobjectCtx.moveTo(player.x * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"], player.y * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]);\n\tobjectCtx.lineTo(\n\t\trayX * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n\t\trayY * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n\t);\n\tobjectCtx.closePath();\n\tobjectCtx.stroke();\n}\n\nfunction updateMiniMap() {\n\tconst miniMap = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('minimap');\n\tconst miniMapObjects = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('minimapobjects');\n\n\tconst objectCtx = miniMapObjects.getContext('2d');\n\tminiMapObjects.width = miniMapObjects.width;\n\n    const { player } = getState();\n\n    objectCtx.fillStyle = 'red';\n    // draw a dot at the current player position\n\tobjectCtx.fillRect(\t\t\n\t\t(player.x * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]) - 2,\n\t\t(player.y * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]) - 2,\n        4,\n        4,\n\t);\n\n\tobjectCtx.strokeStyle = 'red';\n\tobjectCtx.beginPath();\n\tobjectCtx.moveTo(player.x * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"], player.y * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]);\n\tobjectCtx.lineTo(\n\t\t(player.x + (Math.cos(player.rot) * 4)) * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n\t\t(player.y + (Math.sin(player.rot) * 4)) * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n\t);\n\tobjectCtx.closePath();\n    objectCtx.stroke();\n    \n    const { enemies } = getState();\n\n    for (let i = 0; i < enemies.length; i++) {\n\t\tconst enemy = enemies[i];\n\n        objectCtx.fillStyle = 'blue';\n        // draw a dot at the enemy position\n\t\tobjectCtx.fillRect(\t\t\n\t\t\t(enemy.x * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]) - 2, \n\t\t\t(enemy.y * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]) - 2,\n            4,\n            4,\n\t\t);\n\t}\n}\n\nfunction drawMiniMap() {\n\t// draw the topdown view minimap\n\n\tconst miniMap = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('minimap');\t\t\t// the actual map\n\tconst miniMapCtr = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('minimapcontainer');\t\t// the container div element\n\tconst miniMapObjects = Object(_getElementById__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('minimapobjects');\t// the canvas used for drawing the objects on the map (player character, etc)\n\n\tminiMap.width = _map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapWidth\"] * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"];\t// resize the internal canvas dimensions\n\tminiMap.height = _map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapHeight\"] * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"];\t// of both the map canvas and the object canvas\n\tminiMapObjects.width = miniMap.width;\n    miniMapObjects.height = miniMap.height;\n    \n\t// minimap CSS dimensions\n\tconst w = `${_map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapWidth\"] * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]}px`;\n\tconst h = `${_map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapHeight\"] * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]}px`;\n\tminiMap.style.width = miniMapObjects.style.width = miniMapCtr.style.width = w;\n\tminiMap.style.height = miniMapObjects.style.height = miniMapCtr.style.height = h;\n\n\tconst ctx = miniMap.getContext('2d');\n\n\tctx.fillStyle = 'white';\n\tctx.fillRect(\n        0,\n        0,\n        miniMap.width,\n        miniMap.height,\n    );\n\n    const { spriteMap } = getState();\n\n\t// loop through all blocks on the map\n\tfor (let y = 0; y < _map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapHeight\"]; y++) {\n\t\tfor (let x = 0; x < _map_walls__WEBPACK_IMPORTED_MODULE_1__[\"mapWidth\"]; x++) {\n\t\t\tconst wall = _map_walls__WEBPACK_IMPORTED_MODULE_1__[\"map\"][y][x];\n            \n            // if there is a wall block at this (x,y) ...\n\t\t\tif (wall !== 0) { \n                ctx.fillStyle = 'rgb(200,200,200)';\n                // ... then draw a block on the minimap\n\t\t\t\tctx.fillRect(\t\t\t\t\n\t\t\t\t\tx * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n\t\t\t\t\ty * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n                    _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n                    _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"],\n\t\t\t\t);\n            }\n\n            if (spriteMap && spriteMap[y] && spriteMap[y][x]) {\n\t\t\t\tctx.fillStyle = 'rgb(100,200,100)';\n\t\t\t\tctx.fillRect(\n\t\t\t\t\t(x * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]) + (_constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"] * 0.25),\n\t\t\t\t\t(y * _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"]) + (_constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"] * 0.25),\n                    _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"] * 0.5,\n                    _constants__WEBPACK_IMPORTED_MODULE_2__[\"miniMapScale\"] * 0.5,\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t}\n\n\tupdateMiniMap();\n}\n\n\n//# sourceURL=webpack:///./client/src/engine/minimap.js?");

/***/ }),

/***/ "./client/src/engine/move.js":
/*!***********************************!*\
  !*** ./client/src/engine/move.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _checkCollision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkCollision */ \"./client/src/engine/checkCollision.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./client/src/engine/constants.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((entity, timeDelta) => {\n\t// time timeDelta has passed since we moved last time. We should have moved after time gameCycleDelay, \n    // so calculate how much we should multiply our movement to ensure game speed is constant\n    \n    const mul = timeDelta / _constants__WEBPACK_IMPORTED_MODULE_1__[\"gameCycleDelay\"];\n    \n    // entity will move this far along the current direction vector\n\tconst moveStep = mul * entity.speed * entity.moveSpeed;\t\n\n    console.log({ a: entity.rotDeg })\n\n    // add rotation if entity is rotating (entity.dir != 0)\n    entity.rotDeg += mul * entity.dir * entity.rotSpeed; \n    \n\n    console.log({ rotDeg: entity.rotDeg })\n\n\tentity.rotDeg %= 360;\n\n\tif (entity.rotDeg < -180) entity.rotDeg += 360;\n\tif (entity.rotDeg >= 180) entity.rotDeg -= 360;\n\n\tconst snap = (entity.rotDeg + 360) % 90;\n\tif (snap < 2 || snap > 88) {\n\t\tentity.rotDeg = Math.round(entity.rotDeg / 90) * 90;\n\t}\n\n    entity.rot = entity.rotDeg * (Math.PI / 180);\n    \n    console.log({ entity });\n\n\tconst newX = entity.x + (Math.cos(entity.rot) * moveStep);\t// calculate new entity position with simple trigonometry\n\tconst newY = entity.y + (Math.sin(entity.rot) * moveStep);\n\n\tconst pos = Object(_checkCollision__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(entity.x, entity.y, newX, newY, 0.35);\n\n\tentity.x = pos.x; // set new position\n\tentity.y = pos.y;\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/move.js?");

/***/ }),

/***/ "./client/src/engine/reducers/enemies.js":
/*!***********************************************!*\
  !*** ./client/src/engine/reducers/enemies.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst initState = [];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        enemies,\n    } = action;\n    const nextState = { ...prevState };\n\n    switch (type) {\n        case 'ENEMIES_SET': {\n            return {\n                ...prevState,\n                ...enemies,\n            };\n        }\n        default: {\n            return nextState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/enemies.js?");

/***/ }),

/***/ "./client/src/engine/reducers/fps.js":
/*!*******************************************!*\
  !*** ./client/src/engine/reducers/fps.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst initState = 0;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        fps,\n    } = action;\n\n    switch (type) {\n        case 'FPS_SET': {\n            return fps;\n        }\n        default: {\n            return prevState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/fps.js?");

/***/ }),

/***/ "./client/src/engine/reducers/index.js":
/*!*********************************************!*\
  !*** ./client/src/engine/reducers/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _enemies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemies */ \"./client/src/engine/reducers/enemies.js\");\n/* harmony import */ var _fps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fps */ \"./client/src/engine/reducers/fps.js\");\n/* harmony import */ var _lastGameCycleTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lastGameCycleTime */ \"./client/src/engine/reducers/lastGameCycleTime.js\");\n/* harmony import */ var _lastRenderCycleTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lastRenderCycleTime */ \"./client/src/engine/reducers/lastRenderCycleTime.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player */ \"./client/src/engine/reducers/player.js\");\n/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./screen */ \"./client/src/engine/reducers/screen.js\");\n/* harmony import */ var _spriteMap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./spriteMap */ \"./client/src/engine/reducers/spriteMap.js\");\n/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sprites */ \"./client/src/engine/reducers/sprites.js\");\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n    enemies: _enemies__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    fps: _fps__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    lastGameCycleTime: _lastGameCycleTime__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    lastRenderCycleTime: _lastRenderCycleTime__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    player: _player__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    screen: _screen__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n    spriteMap: _spriteMap__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n    sprites: _sprites__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n}));\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/index.js?");

/***/ }),

/***/ "./client/src/engine/reducers/lastGameCycleTime.js":
/*!*********************************************************!*\
  !*** ./client/src/engine/reducers/lastGameCycleTime.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst initState = 0;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        lastGameCycleTime,\n    } = action;\n\n    switch (type) {\n        case 'LAST_GAME_CYCLE_TIME_SET': {\n            return lastGameCycleTime;\n        }\n        default: {\n            return prevState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/lastGameCycleTime.js?");

/***/ }),

/***/ "./client/src/engine/reducers/lastRenderCycleTime.js":
/*!***********************************************************!*\
  !*** ./client/src/engine/reducers/lastRenderCycleTime.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst initState = 0;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        lastRenderCycleTime,\n    } = action;\n\n    switch (type) {\n        case 'LAST_RENDER_CYCLE_TIME_SET': {\n            return lastRenderCycleTime;\n        }\n        default: {\n            return prevState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/lastRenderCycleTime.js?");

/***/ }),

/***/ "./client/src/engine/reducers/player.js":
/*!**********************************************!*\
  !*** ./client/src/engine/reducers/player.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst initState = {\n    x: 16,\n    y: 10,\n    // the direction that the player is turning, either -1 for left or 1 for right.\n    dir: 0,\n    // the current angle of rotation\t\n    rot: 0,\n    // is the playing moving forward (speed = 1) or backwards (speed = -1).\t\n    speed: 0,\n    // how far (in map units) does the player move each step/update\n    moveSpeed: 0.18,\n    rotDeg: 0,\n    // how much does the player rotate each step/update (in radians)\n    rotSpeed: 6 * (Math.PI / 180),\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        x,\n        y,\n        rotation,\n        width,\n    } = action;\n    const nextState = { ...prevState };\n\n    switch (type) {\n        case 'SCREEN_RESIZE': {\n            // if this goes out of control, 0.18 is a trustable value for small screens\n            const moveSpeed = Math.max(0.10, Math.min(1.1, 0.000001 * width * (width / 1.4)));\n            return {\n                ...prevState,\n                moveSpeed,\n            };\n        }\n        case 'PLAYER_MOVE_FORWARD': {\n            return {\n                ...prevState,\n                speed: 1,\n            };\n        }\n        case 'PLAYER_MOVE_BACKWARD': {\n            return {\n                ...prevState,\n                speed: -1,\n            };\n        }\n        case 'PLAYER_MOVE_STOP': {\n            return {\n                ...prevState,\n                speed: 0,\n            };\n        }\n        case 'PLAYER_TURN_LEFT': {\n            return {\n                ...prevState,\n                dir: -1,\n            };\n        }\n        case 'PLAYER_TURN_RIGHT': {\n            return {\n                ...prevState,\n                dir: 1,\n            };\n        }\n        case 'PLAYER_TURN_STOP': {\n            return {\n                ...prevState,\n                dir: 0,\n            };\n        }\n        case 'PLAYER_SET_POSITION': {\n            return {\n                ...prevState,\n                x,\n                y,\n                rot: rotation,\n            };\n        }\n        default: {\n            return nextState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/player.js?");

/***/ }),

/***/ "./client/src/engine/reducers/screen.js":
/*!**********************************************!*\
  !*** ./client/src/engine/reducers/screen.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./client/src/engine/constants.js\");\n\n\nconst initState = {\n    strips: [],\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        strips,\n        width,\n        height,\n    } = action;\n    const nextState = { ...prevState };\n\n    switch (type) {\n        case 'SCREEN_SET_STRIPS': {\n            return {\n                ...prevState,\n                strips,\n            };\n        }\n        case 'SCREEN_RESIZE': {\n            const numRays = Math.ceil(width / _constants__WEBPACK_IMPORTED_MODULE_0__[\"stripWidth\"]);\n            const viewDist = (width / 2) / Math.tan((_constants__WEBPACK_IMPORTED_MODULE_0__[\"fov\"] / 2));\n            return {\n                ...prevState,\n                width,\n                height,\n                numRays,\n                viewDist,\n            };\n        }\n        default: {\n            return nextState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/screen.js?");

/***/ }),

/***/ "./client/src/engine/reducers/spriteMap.js":
/*!*************************************************!*\
  !*** ./client/src/engine/reducers/spriteMap.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst initState = [];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        spriteMap,\n    } = action;\n    const nextState = { ...prevState };\n\n    switch (type) {\n        case 'SPRITE_MAP_SET': {\n            return {\n                ...prevState,\n                ...spriteMap,\n            };\n        }\n        default: {\n            return nextState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/spriteMap.js?");

/***/ }),

/***/ "./client/src/engine/reducers/sprites.js":
/*!***********************************************!*\
  !*** ./client/src/engine/reducers/sprites.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst initState = {\n    visibleSprites: [],\n    oldVisibleSprites: [],\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((prevState = initState, action) => {\n    const {\n        type,\n        visibleSprites,\n        oldVisibleSprites,\n    } = action;\n    const nextState = { ...prevState };\n\n    switch (type) {\n        case 'SPRITES_SET': {\n            return {\n                ...prevState,\n                visibleSprites,\n                oldVisibleSprites,\n            };\n        }\n        default: {\n            return nextState;\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/reducers/sprites.js?");

/***/ }),

/***/ "./client/src/engine/renderCycle.js":
/*!******************************************!*\
  !*** ./client/src/engine/renderCycle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _minimap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minimap */ \"./client/src/engine/minimap.js\");\n/* harmony import */ var _clearSprites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearSprites */ \"./client/src/engine/clearSprites.js\");\n/* harmony import */ var _3dview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./3dview */ \"./client/src/engine/3dview.js\");\n/* harmony import */ var _renderSprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderSprites */ \"./client/src/engine/renderSprites.js\");\n/* harmony import */ var _renderEnemies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderEnemies */ \"./client/src/engine/renderEnemies.js\");\n/* harmony import */ var _updateOverlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./updateOverlay */ \"./client/src/engine/updateOverlay.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\n\n\n\n\n\nconst { dispatch, getState } = _store__WEBPACK_IMPORTED_MODULE_6__[\"default\"];\n\nconst renderCycle = () => {\n\tObject(_minimap__WEBPACK_IMPORTED_MODULE_0__[\"updateMiniMap\"])();\n\tObject(_clearSprites__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\tObject(_3dview__WEBPACK_IMPORTED_MODULE_2__[\"castRays\"])();\n\tObject(_renderSprites__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n\tObject(_renderEnemies__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n\n\t// time since last rendering\n    const now = new Date().getTime();\n    \n    const { lastRenderCycleTime } = getState();\n\tconst timeDelta = now - lastRenderCycleTime;\n\tlet cycleDelay = 1000 / 30;\n\tif (timeDelta > cycleDelay) {\n\t\tcycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));\n\t}\n    dispatch({ type: 'LAST_RENDER_CYCLE_TIME_SET', lastRenderCycleTime: now });\n\tsetTimeout(renderCycle, cycleDelay);\n\n    const fps = 1000 / timeDelta;\n    dispatch({ type: 'FPS_SET', fps });\n    \n    Object(_updateOverlay__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderCycle);\n\n\n//# sourceURL=webpack:///./client/src/engine/renderCycle.js?");

/***/ }),

/***/ "./client/src/engine/renderEnemies.js":
/*!********************************************!*\
  !*** ./client/src/engine/renderEnemies.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./client/src/engine/constants.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\nconst { getState } = _store__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const { enemies, player, screen } = getState();\n    const { width: screenWidth } = screen;\n\n\tfor (let i = 0; i < enemies.length; i++) {\n\t\tconst enemy = enemies[i];\n\t\tconst img = enemy.img;\n\n\t\tconst dx = enemy.x - player.x;\n\t\tconst dy = enemy.y - player.y;\n\n\t\tlet angle = Math.atan2(dy, dx) - player.rot;\n\n\t\tif (angle < -Math.PI) angle += 2 * Math.PI;\n\t\tif (angle >= Math.PI) angle -= 2 * Math.PI;\n\n\t\t// is enemy in front of player? Maybe use the FOV value instead.\n\t\tif (angle > -Math.PI * 0.5 && angle < Math.PI * 0.5) {\n\t\t\tconst distSquared = (dx * dx) + (dy * dy);\n\t\t\tconst dist = Math.sqrt(distSquared);\n\t\t\tconst size = _constants__WEBPACK_IMPORTED_MODULE_0__[\"viewDist\"] / (Math.cos(angle) * dist);\n\n\t\t\tif (size <= 0) continue;\n\n\t\t\tconst x = Math.tan(angle) * _constants__WEBPACK_IMPORTED_MODULE_0__[\"viewDist\"];\n\n\t\t\tconst style = img.style;\n\t\t\tconst oldStyles = enemy.oldStyles;\n\n\t\t\t// height is equal to the sprite size\n\t\t\tif (size !== oldStyles.height) {\n\t\t\t\tstyle.height = `${size}px`;\n\t\t\t\toldStyles.height = size;\n\t\t\t}\n\n\t\t\t// width is equal to the sprite size times the total number of states\n\t\t\tconst styleWidth = size * enemy.totalStates;\n\t\t\tif (styleWidth !== oldStyles.width) {\n\t\t\t\tstyle.width = `${styleWidth}px`;\n\t\t\t\toldStyles.width = styleWidth;\n\t\t\t}\n\n            const { screen: { height: screenHeight } } = getState();\n\t\t\t// top position is halfway down the screen, minus half the sprite height\n\t\t\tconst styleTop = ((screenHeight - size) / 2);\n\t\t\tif (styleTop !== oldStyles.top) {\n\t\t\t\tstyle.top = `${styleTop}px`;\n\t\t\t\toldStyles.top = styleTop;\n\t\t\t}\n\n\t\t\t// place at x position, adjusted for sprite size and the current sprite state\n\t\t\tconst styleLeft = ((screenWidth / 2) + x) - (size / 2) - (size * enemy.state);\n\t\t\tif (styleLeft !== oldStyles.left) {\n\t\t\t\tstyle.left = `${styleLeft}px`;\n\t\t\t\toldStyles.left = styleLeft;\n\t\t\t}\n\n\t\t\tconst styleZIndex = -(distSquared * 1000) >> 0;\n\t\t\tif (styleZIndex !== oldStyles.zIndex) {\n\t\t\t\tstyle.zIndex = styleZIndex;\n\t\t\t\toldStyles.zIndex = styleZIndex;\n\t\t\t}\n\n\t\t\tconst styleDisplay = 'block';\n\t\t\tif (styleDisplay !== oldStyles.display) {\n\t\t\t\tstyle.display = styleDisplay;\n\t\t\t\toldStyles.display = styleDisplay;\n\t\t\t}\n\n\t\t\tconst styleClip = `rect(0, ${(size * (enemy.state + 1))}, ${size}, ${size * (enemy.state)})`;\n\t\t\tif (styleClip !== oldStyles.clip) {\n\t\t\t\tstyle.clip = styleClip;\n\t\t\t\toldStyles.clip = styleClip;\n\t\t\t}\n\t\t} else {\n\t\t\tconst styleDisplay = 'none';\n\t\t\tif (styleDisplay !== enemy.oldStyles.display) {\n\t\t\t\timg.style.display = styleDisplay;\n\t\t\t\tenemy.oldStyles.display = styleDisplay;\n\t\t\t}\n\t\t}\n\t}\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/renderEnemies.js?");

/***/ }),

/***/ "./client/src/engine/renderSprites.js":
/*!********************************************!*\
  !*** ./client/src/engine/renderSprites.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./client/src/engine/constants.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\nconst { getState } = _store__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const {\n        player,\n        screen: screenState,\n        sprites: { visibleSprites, oldVisibleSprites },\n    } = getState();\n    const {\n        width: screenWidth,\n        height: screenHeight,\n    } = screenState;\n\n\tfor (let i = 0; i < visibleSprites.length; i++) {\n\t\tconst sprite = visibleSprites[i];\n\t\tconst img = sprite.img;\n\t\timg.style.display = 'block';\n\n\t\t// translate position to viewer space\n\t\tconst dx = (sprite.x + 0.5) - player.x;\n\t\tconst dy = (sprite.y + 0.5) - player.y;\n\n\t\t// distance to sprite\n\t\tconst dist = Math.sqrt((dx * dx) + (dy * dy));\n\n\t\t// sprite angle relative to viewing angle\n\t\tconst spriteAngle = Math.atan2(dy, dx) - player.rot;\n\n\t\t// size of the sprite\n\t\tconst size = _constants__WEBPACK_IMPORTED_MODULE_0__[\"viewDist\"] / (Math.cos(spriteAngle) * dist);\n\n\t\tif (size <= 0) continue;\n\n\t\t// x-position on screen\n\t\tconst x = Math.tan(spriteAngle) * _constants__WEBPACK_IMPORTED_MODULE_0__[\"viewDist\"];\n\n\t\timg.style.left = `${((screenWidth / 2) + x) - (size / 2)}px`;\n\n\t\t// y is constant since we keep all sprites at the same height and vertical position\n\t\timg.style.top = `${(screenHeight - size) / 2}px`;\n\n\t\timg.style.width = `${size}px`;\n\t\timg.style.height = `${size}px`;\n\n\t\tconst dbx = sprite.x - player.x;\n\t\tconst dby = sprite.y - player.y;\n\t\tconst blockDist = (dbx * dbx) + (dby * dby);\n\t\timg.style.zIndex = -Math.floor(blockDist * 1000);\n\t}\n\n\t// hide the sprites that are no longer visible\n\tfor (let i = 0; i < oldVisibleSprites.length; i++) {\n\t\tconst sprite = oldVisibleSprites[i];\n\t\tif (visibleSprites.indexOf(sprite) < 0) {\n\t\t\tsprite.visible = false;\n\t\t\tsprite.img.style.display = 'none';\n\t\t}\n\t}\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/renderSprites.js?");

/***/ }),

/***/ "./client/src/engine/resizeView.js":
/*!*****************************************!*\
  !*** ./client/src/engine/resizeView.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _initScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initScreen */ \"./client/src/engine/initScreen.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n\n\n\nconst { dispatch } = _store__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\nfunction resizeView() {\n    const width = document.body.clientWidth;\n    const height = document.body.clientHeight;\n    dispatch({ type: 'SCREEN_RESIZE', width, height });\n    Object(_initScreen__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    resizeView();\n\n\twindow.onresize = function () {\n        resizeView();\n\t};\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/resizeView.js?");

/***/ }),

/***/ "./client/src/engine/store.js":
/*!************************************!*\
  !*** ./client/src/engine/store.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ \"./client/src/engine/reducers/index.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(\n    _reducers__WEBPACK_IMPORTED_MODULE_1__[\"default\"], /* preloadedState, */\n    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()\n));\n\n\n//# sourceURL=webpack:///./client/src/engine/store.js?");

/***/ }),

/***/ "./client/src/engine/updateOverlay.js":
/*!********************************************!*\
  !*** ./client/src/engine/updateOverlay.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./client/src/engine/store.js\");\n/* harmony import */ var _getElementById__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getElementById */ \"./client/src/engine/getElementById.js\");\n\n\n\nconst { getState } = _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const { fps } = getState();\n    const overlay = Object(_getElementById__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('overlay');\n\toverlay.innerHTML = `FPS: ${fps.toFixed(1)}<br/>`;\n});\n\n\n//# sourceURL=webpack:///./client/src/engine/updateOverlay.js?");

/***/ }),

/***/ "./client/src/map/enemies.js":
/*!***********************************!*\
  !*** ./client/src/map/enemies.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n\t{ type: 0, x: 17.5, y: 4.5 },\n\t{ type: 0, x: 25.5, y: 16.5 },\n]);\n\n\n//# sourceURL=webpack:///./client/src/map/enemies.js?");

/***/ }),

/***/ "./client/src/map/items.js":
/*!*********************************!*\
  !*** ./client/src/map/items.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([]);\n\nconst items = [\n\t// lamps in center area\n\t{ type: 3, x: 10, y: 7 },\n\t{ type: 3, x: 15, y: 7 },\n\n\t// lamps in bottom corridor\n\t{ type: 3, x: 5, y: 22 },\n\t{ type: 3, x: 12, y: 22 },\n\t{ type: 3, x: 19, y: 22 },\n\n\t// tables in long bottom room\n\t{ type: 0, x: 10, y: 18 },\n\t{ type: 0, x: 15, y: 18 },\n\t// lamps in long bottom room\n\t{ type: 3, x: 8, y: 18 },\n\t{ type: 3, x: 17, y: 18 }\n];\n\n\n//# sourceURL=webpack:///./client/src/map/items.js?");

/***/ }),

/***/ "./client/src/map/walls.js":
/*!*********************************!*\
  !*** ./client/src/map/walls.js ***!
  \*********************************/
/*! exports provided: map, mapWidth, mapHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"map\", function() { return map; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapWidth\", function() { return mapWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapHeight\", function() { return mapHeight; });\nconst map = [\n\t[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 3, 0, 3, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], \n\t[1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], \n\t[1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'ASHWALL2', 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'ASHWALL2', 1, 1, 1, 1, 1], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 4, 3, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], \n\t[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]\n];\n\nconst mapWidth = map[0].length;\nconst mapHeight = map.length;\n\n\n//# sourceURL=webpack:///./client/src/map/walls.js?");

/***/ }),

/***/ "./client/src/resources/enemies.js":
/*!*****************************************!*\
  !*** ./client/src/resources/enemies.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n\t{\n        img: 'guard.png',\n        moveSpeed: 0.05,\n        rotSpeed: 3,\n        totalStates: 13,\n    }\n]);\n\n\n//# sourceURL=webpack:///./client/src/resources/enemies.js?");

/***/ }),

/***/ "./client/src/resources/items.js":
/*!***************************************!*\
  !*** ./client/src/resources/items.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n\t{ img: 'sprites/tablechairs.png', block: true },\t// 0\n\t{ img: 'sprites/armor.png', block: true },\t\t// 1\n\t{ img: 'sprites/plantgreen.png', block: true },\t// 2\n\t{ img: 'sprites/lamp.png', block: false }\t\t// 3\n]);\n\n\n//# sourceURL=webpack:///./client/src/resources/items.js?");

/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createStore\", function() { return createStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"combineReducers\", function() { return combineReducers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bindActionCreators\", function() { return bindActionCreators; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"applyMiddleware\", function() { return applyMiddleware; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compose\", function() { return compose; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__DO_NOT_USE__ActionTypes\", function() { return ActionTypes; });\n/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ \"./node_modules/symbol-observable/es/index.js\");\n\n\n/**\n * These are private action types reserved by Redux.\n * For any unknown actions, you must return the current state.\n * If the current state is undefined, you must return the initial state.\n * Do not reference these action types directly in your code.\n */\nvar ActionTypes = {\n  INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),\n  REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')\n};\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) {\n  return typeof obj;\n} : function (obj) {\n  return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n};\n\nvar _extends = Object.assign || function (target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i];\n\n    for (var key in source) {\n      if (Object.prototype.hasOwnProperty.call(source, key)) {\n        target[key] = source[key];\n      }\n    }\n  }\n\n  return target;\n};\n\n/**\n * @param {any} obj The object to inspect.\n * @returns {boolean} True if the argument appears to be a plain object.\n */\nfunction isPlainObject(obj) {\n  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) return false;\n\n  var proto = obj;\n  while (Object.getPrototypeOf(proto) !== null) {\n    proto = Object.getPrototypeOf(proto);\n  }\n\n  return Object.getPrototypeOf(obj) === proto;\n}\n\n/**\n * Creates a Redux store that holds the state tree.\n * The only way to change the data in the store is to call `dispatch()` on it.\n *\n * There should only be a single store in your app. To specify how different\n * parts of the state tree respond to actions, you may combine several reducers\n * into a single reducer function by using `combineReducers`.\n *\n * @param {Function} reducer A function that returns the next state tree, given\n * the current state tree and the action to handle.\n *\n * @param {any} [preloadedState] The initial state. You may optionally specify it\n * to hydrate the state from the server in universal apps, or to restore a\n * previously serialized user session.\n * If you use `combineReducers` to produce the root reducer function, this must be\n * an object with the same shape as `combineReducers` keys.\n *\n * @param {Function} [enhancer] The store enhancer. You may optionally specify it\n * to enhance the store with third-party capabilities such as middleware,\n * time travel, persistence, etc. The only store enhancer that ships with Redux\n * is `applyMiddleware()`.\n *\n * @returns {Store} A Redux store that lets you read the state, dispatch actions\n * and subscribe to changes.\n */\nfunction createStore(reducer, preloadedState, enhancer) {\n  var _ref2;\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {\n    enhancer = preloadedState;\n    preloadedState = undefined;\n  }\n\n  if (typeof enhancer !== 'undefined') {\n    if (typeof enhancer !== 'function') {\n      throw new Error('Expected the enhancer to be a function.');\n    }\n\n    return enhancer(createStore)(reducer, preloadedState);\n  }\n\n  if (typeof reducer !== 'function') {\n    throw new Error('Expected the reducer to be a function.');\n  }\n\n  var currentReducer = reducer;\n  var currentState = preloadedState;\n  var currentListeners = [];\n  var nextListeners = currentListeners;\n  var isDispatching = false;\n\n  function ensureCanMutateNextListeners() {\n    if (nextListeners === currentListeners) {\n      nextListeners = currentListeners.slice();\n    }\n  }\n\n  /**\n   * Reads the state tree managed by the store.\n   *\n   * @returns {any} The current state tree of your application.\n   */\n  function getState() {\n    if (isDispatching) {\n      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');\n    }\n\n    return currentState;\n  }\n\n  /**\n   * Adds a change listener. It will be called any time an action is dispatched,\n   * and some part of the state tree may potentially have changed. You may then\n   * call `getState()` to read the current state tree inside the callback.\n   *\n   * You may call `dispatch()` from a change listener, with the following\n   * caveats:\n   *\n   * 1. The subscriptions are snapshotted just before every `dispatch()` call.\n   * If you subscribe or unsubscribe while the listeners are being invoked, this\n   * will not have any effect on the `dispatch()` that is currently in progress.\n   * However, the next `dispatch()` call, whether nested or not, will use a more\n   * recent snapshot of the subscription list.\n   *\n   * 2. The listener should not expect to see all state changes, as the state\n   * might have been updated multiple times during a nested `dispatch()` before\n   * the listener is called. It is, however, guaranteed that all subscribers\n   * registered before the `dispatch()` started will be called with the latest\n   * state by the time it exits.\n   *\n   * @param {Function} listener A callback to be invoked on every dispatch.\n   * @returns {Function} A function to remove this change listener.\n   */\n  function subscribe(listener) {\n    if (typeof listener !== 'function') {\n      throw new Error('Expected the listener to be a function.');\n    }\n\n    if (isDispatching) {\n      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');\n    }\n\n    var isSubscribed = true;\n\n    ensureCanMutateNextListeners();\n    nextListeners.push(listener);\n\n    return function unsubscribe() {\n      if (!isSubscribed) {\n        return;\n      }\n\n      if (isDispatching) {\n        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');\n      }\n\n      isSubscribed = false;\n\n      ensureCanMutateNextListeners();\n      var index = nextListeners.indexOf(listener);\n      nextListeners.splice(index, 1);\n    };\n  }\n\n  /**\n   * Dispatches an action. It is the only way to trigger a state change.\n   *\n   * The `reducer` function, used to create the store, will be called with the\n   * current state tree and the given `action`. Its return value will\n   * be considered the **next** state of the tree, and the change listeners\n   * will be notified.\n   *\n   * The base implementation only supports plain object actions. If you want to\n   * dispatch a Promise, an Observable, a thunk, or something else, you need to\n   * wrap your store creating function into the corresponding middleware. For\n   * example, see the documentation for the `redux-thunk` package. Even the\n   * middleware will eventually dispatch plain object actions using this method.\n   *\n   * @param {Object} action A plain object representing “what changed”. It is\n   * a good idea to keep actions serializable so you can record and replay user\n   * sessions, or use the time travelling `redux-devtools`. An action must have\n   * a `type` property which may not be `undefined`. It is a good idea to use\n   * string constants for action types.\n   *\n   * @returns {Object} For convenience, the same action object you dispatched.\n   *\n   * Note that, if you use a custom middleware, it may wrap `dispatch()` to\n   * return something else (for example, a Promise you can await).\n   */\n  function dispatch(action) {\n    if (!isPlainObject(action)) {\n      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');\n    }\n\n    if (typeof action.type === 'undefined') {\n      throw new Error('Actions may not have an undefined \"type\" property. ' + 'Have you misspelled a constant?');\n    }\n\n    if (isDispatching) {\n      throw new Error('Reducers may not dispatch actions.');\n    }\n\n    try {\n      isDispatching = true;\n      currentState = currentReducer(currentState, action);\n    } finally {\n      isDispatching = false;\n    }\n\n    var listeners = currentListeners = nextListeners;\n    for (var i = 0; i < listeners.length; i++) {\n      var listener = listeners[i];\n      listener();\n    }\n\n    return action;\n  }\n\n  /**\n   * Replaces the reducer currently used by the store to calculate the state.\n   *\n   * You might need this if your app implements code splitting and you want to\n   * load some of the reducers dynamically. You might also need this if you\n   * implement a hot reloading mechanism for Redux.\n   *\n   * @param {Function} nextReducer The reducer for the store to use instead.\n   * @returns {void}\n   */\n  function replaceReducer(nextReducer) {\n    if (typeof nextReducer !== 'function') {\n      throw new Error('Expected the nextReducer to be a function.');\n    }\n\n    currentReducer = nextReducer;\n    dispatch({ type: ActionTypes.REPLACE });\n  }\n\n  /**\n   * Interoperability point for observable/reactive libraries.\n   * @returns {observable} A minimal observable of state changes.\n   * For more information, see the observable proposal:\n   * https://github.com/tc39/proposal-observable\n   */\n  function observable() {\n    var _ref;\n\n    var outerSubscribe = subscribe;\n    return _ref = {\n      /**\n       * The minimal observable subscription method.\n       * @param {Object} observer Any object that can be used as an observer.\n       * The observer object should have a `next` method.\n       * @returns {subscription} An object with an `unsubscribe` method that can\n       * be used to unsubscribe the observable from the store, and prevent further\n       * emission of values from the observable.\n       */\n      subscribe: function subscribe(observer) {\n        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object' || observer === null) {\n          throw new TypeError('Expected the observer to be an object.');\n        }\n\n        function observeState() {\n          if (observer.next) {\n            observer.next(getState());\n          }\n        }\n\n        observeState();\n        var unsubscribe = outerSubscribe(observeState);\n        return { unsubscribe: unsubscribe };\n      }\n    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__[\"default\"]] = function () {\n      return this;\n    }, _ref;\n  }\n\n  // When a store is created, an \"INIT\" action is dispatched so that every\n  // reducer returns their initial state. This effectively populates\n  // the initial state tree.\n  dispatch({ type: ActionTypes.INIT });\n\n  return _ref2 = {\n    dispatch: dispatch,\n    subscribe: subscribe,\n    getState: getState,\n    replaceReducer: replaceReducer\n  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__[\"default\"]] = observable, _ref2;\n}\n\n/**\n * Prints a warning in the console if it exists.\n *\n * @param {String} message The warning message.\n * @returns {void}\n */\nfunction warning(message) {\n  /* eslint-disable no-console */\n  if (typeof console !== 'undefined' && typeof console.error === 'function') {\n    console.error(message);\n  }\n  /* eslint-enable no-console */\n  try {\n    // This error was thrown as a convenience so that if you enable\n    // \"break on all exceptions\" in your console,\n    // it would pause the execution at this line.\n    throw new Error(message);\n  } catch (e) {} // eslint-disable-line no-empty\n}\n\nfunction getUndefinedStateErrorMessage(key, action) {\n  var actionType = action && action.type;\n  var actionDescription = actionType && 'action \"' + String(actionType) + '\"' || 'an action';\n\n  return 'Given ' + actionDescription + ', reducer \"' + key + '\" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';\n}\n\nfunction getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {\n  var reducerKeys = Object.keys(reducers);\n  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';\n\n  if (reducerKeys.length === 0) {\n    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';\n  }\n\n  if (!isPlainObject(inputState)) {\n    return 'The ' + argumentName + ' has unexpected type of \"' + {}.toString.call(inputState).match(/\\s([a-z|A-Z]+)/)[1] + '\". Expected argument to be an object with the following ' + ('keys: \"' + reducerKeys.join('\", \"') + '\"');\n  }\n\n  var unexpectedKeys = Object.keys(inputState).filter(function (key) {\n    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];\n  });\n\n  unexpectedKeys.forEach(function (key) {\n    unexpectedKeyCache[key] = true;\n  });\n\n  if (action && action.type === ActionTypes.REPLACE) return;\n\n  if (unexpectedKeys.length > 0) {\n    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('\"' + unexpectedKeys.join('\", \"') + '\" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('\"' + reducerKeys.join('\", \"') + '\". Unexpected keys will be ignored.');\n  }\n}\n\nfunction assertReducerShape(reducers) {\n  Object.keys(reducers).forEach(function (key) {\n    var reducer = reducers[key];\n    var initialState = reducer(undefined, { type: ActionTypes.INIT });\n\n    if (typeof initialState === 'undefined') {\n      throw new Error('Reducer \"' + key + '\" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');\n    }\n\n    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');\n    if (typeof reducer(undefined, { type: type }) === 'undefined') {\n      throw new Error('Reducer \"' + key + '\" returned undefined when probed with a random type. ' + ('Don\\'t try to handle ' + ActionTypes.INIT + ' or other actions in \"redux/*\" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');\n    }\n  });\n}\n\n/**\n * Turns an object whose values are different reducer functions, into a single\n * reducer function. It will call every child reducer, and gather their results\n * into a single state object, whose keys correspond to the keys of the passed\n * reducer functions.\n *\n * @param {Object} reducers An object whose values correspond to different\n * reducer functions that need to be combined into one. One handy way to obtain\n * it is to use ES6 `import * as reducers` syntax. The reducers may never return\n * undefined for any action. Instead, they should return their initial state\n * if the state passed to them was undefined, and the current state for any\n * unrecognized action.\n *\n * @returns {Function} A reducer function that invokes every reducer inside the\n * passed object, and builds a state object with the same shape.\n */\nfunction combineReducers(reducers) {\n  var reducerKeys = Object.keys(reducers);\n  var finalReducers = {};\n  for (var i = 0; i < reducerKeys.length; i++) {\n    var key = reducerKeys[i];\n\n    if (true) {\n      if (typeof reducers[key] === 'undefined') {\n        warning('No reducer provided for key \"' + key + '\"');\n      }\n    }\n\n    if (typeof reducers[key] === 'function') {\n      finalReducers[key] = reducers[key];\n    }\n  }\n  var finalReducerKeys = Object.keys(finalReducers);\n\n  var unexpectedKeyCache = void 0;\n  if (true) {\n    unexpectedKeyCache = {};\n  }\n\n  var shapeAssertionError = void 0;\n  try {\n    assertReducerShape(finalReducers);\n  } catch (e) {\n    shapeAssertionError = e;\n  }\n\n  return function combination() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    var action = arguments[1];\n\n    if (shapeAssertionError) {\n      throw shapeAssertionError;\n    }\n\n    if (true) {\n      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);\n      if (warningMessage) {\n        warning(warningMessage);\n      }\n    }\n\n    var hasChanged = false;\n    var nextState = {};\n    for (var _i = 0; _i < finalReducerKeys.length; _i++) {\n      var _key = finalReducerKeys[_i];\n      var reducer = finalReducers[_key];\n      var previousStateForKey = state[_key];\n      var nextStateForKey = reducer(previousStateForKey, action);\n      if (typeof nextStateForKey === 'undefined') {\n        var errorMessage = getUndefinedStateErrorMessage(_key, action);\n        throw new Error(errorMessage);\n      }\n      nextState[_key] = nextStateForKey;\n      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;\n    }\n    return hasChanged ? nextState : state;\n  };\n}\n\nfunction bindActionCreator(actionCreator, dispatch) {\n  return function () {\n    return dispatch(actionCreator.apply(this, arguments));\n  };\n}\n\n/**\n * Turns an object whose values are action creators, into an object with the\n * same keys, but with every function wrapped into a `dispatch` call so they\n * may be invoked directly. This is just a convenience method, as you can call\n * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.\n *\n * For convenience, you can also pass a single function as the first argument,\n * and get a function in return.\n *\n * @param {Function|Object} actionCreators An object whose values are action\n * creator functions. One handy way to obtain it is to use ES6 `import * as`\n * syntax. You may also pass a single function.\n *\n * @param {Function} dispatch The `dispatch` function available on your Redux\n * store.\n *\n * @returns {Function|Object} The object mimicking the original object, but with\n * every action creator wrapped into the `dispatch` call. If you passed a\n * function as `actionCreators`, the return value will also be a single\n * function.\n */\nfunction bindActionCreators(actionCreators, dispatch) {\n  if (typeof actionCreators === 'function') {\n    return bindActionCreator(actionCreators, dispatch);\n  }\n\n  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {\n    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?');\n  }\n\n  var keys = Object.keys(actionCreators);\n  var boundActionCreators = {};\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    var actionCreator = actionCreators[key];\n    if (typeof actionCreator === 'function') {\n      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);\n    }\n  }\n  return boundActionCreators;\n}\n\n/**\n * Composes single-argument functions from right to left. The rightmost\n * function can take multiple arguments as it provides the signature for\n * the resulting composite function.\n *\n * @param {...Function} funcs The functions to compose.\n * @returns {Function} A function obtained by composing the argument functions\n * from right to left. For example, compose(f, g, h) is identical to doing\n * (...args) => f(g(h(...args))).\n */\n\nfunction compose() {\n  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {\n    funcs[_key] = arguments[_key];\n  }\n\n  if (funcs.length === 0) {\n    return function (arg) {\n      return arg;\n    };\n  }\n\n  if (funcs.length === 1) {\n    return funcs[0];\n  }\n\n  return funcs.reduce(function (a, b) {\n    return function () {\n      return a(b.apply(undefined, arguments));\n    };\n  });\n}\n\n/**\n * Creates a store enhancer that applies middleware to the dispatch method\n * of the Redux store. This is handy for a variety of tasks, such as expressing\n * asynchronous actions in a concise manner, or logging every action payload.\n *\n * See `redux-thunk` package as an example of the Redux middleware.\n *\n * Because middleware is potentially asynchronous, this should be the first\n * store enhancer in the composition chain.\n *\n * Note that each middleware will be given the `dispatch` and `getState` functions\n * as named arguments.\n *\n * @param {...Function} middlewares The middleware chain to be applied.\n * @returns {Function} A store enhancer applying the middleware.\n */\nfunction applyMiddleware() {\n  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {\n    middlewares[_key] = arguments[_key];\n  }\n\n  return function (createStore) {\n    return function () {\n      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      var store = createStore.apply(undefined, args);\n      var _dispatch = function dispatch() {\n        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');\n      };\n\n      var middlewareAPI = {\n        getState: store.getState,\n        dispatch: function dispatch() {\n          return _dispatch.apply(undefined, arguments);\n        }\n      };\n      var chain = middlewares.map(function (middleware) {\n        return middleware(middlewareAPI);\n      });\n      _dispatch = compose.apply(undefined, chain)(store.dispatch);\n\n      return _extends({}, store, {\n        dispatch: _dispatch\n      });\n    };\n  };\n}\n\n/*\n * This is a dummy function to check if the function name has been altered by minification.\n * If the function has been minified and NODE_ENV !== 'production', warn the user.\n */\nfunction isCrushed() {}\n\nif (\"development\" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {\n  warning(\"You are currently using minified code outside of NODE_ENV === 'production'. \" + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/redux/es/redux.js?");

/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ \"./node_modules/symbol-observable/es/ponyfill.js\");\n/* global window */\n\n\nvar root;\n\nif (typeof self !== 'undefined') {\n  root = self;\n} else if (typeof window !== 'undefined') {\n  root = window;\n} else if (typeof global !== 'undefined') {\n  root = global;\n} else if (true) {\n  root = module;\n} else {}\n\nvar result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(root);\n/* harmony default export */ __webpack_exports__[\"default\"] = (result);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/symbol-observable/es/index.js?");

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return symbolObservablePonyfill; });\nfunction symbolObservablePonyfill(root) {\n\tvar result;\n\tvar Symbol = root.Symbol;\n\n\tif (typeof Symbol === 'function') {\n\t\tif (Symbol.observable) {\n\t\t\tresult = Symbol.observable;\n\t\t} else {\n\t\t\tresult = Symbol('observable');\n\t\t\tSymbol.observable = result;\n\t\t}\n\t} else {\n\t\tresult = '@@observable';\n\t}\n\n\treturn result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/symbol-observable/es/ponyfill.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

/******/ });