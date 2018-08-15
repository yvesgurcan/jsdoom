export default {
	x: 10.5,		// current x, y position
	y: 6.5,
	dir: 0,		// the direction that the player is turning, either -1 for left or 1 for right.
	rotDeg: 0,		// the current angle of rotation 
	rot: 0,		// rotation in radians
	speed: 0,		// is the playing moving forward (speed = 1) or backwards (speed = -1).
	moveSpeed: 0.10,	// how far (in map units) does the player move each step/update
	rotSpeed: 3		// how much does the player rotate each step/update (in degrees)
};
