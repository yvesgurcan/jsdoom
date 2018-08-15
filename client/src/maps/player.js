export default {
	x: 27,
	y: 7,
	dir: 0,		// the direction that the player is turning, either -1 for left or 1 for right.
	rotDeg: 90,
	rot: 0,		// rotation in radians
	speed: 0,		// is the playing moving forward (speed = 1) or backwards (speed = -1).
	moveSpeed: 0.10,	// how far (in map units) does the player move each step/update
	rotSpeed: 3		// how much does the player rotate each step/update (in degrees)
};
