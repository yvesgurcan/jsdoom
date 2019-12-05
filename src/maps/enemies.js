// see SPRITES.md for details
import { DIRECTIONS } from '../engine/constants';

const { NORTH, EAST, SOUTH, WEST } = DIRECTIONS;

export default [
    { type: 'imp', x: 20, y: 30, rotDeg: NORTH },
    { type: 'revenant', x: 34, y: 18.5, rotDeg: SOUTH },
    { type: 'zombieman', x: 12, y: 12, rotDeg: EAST },
    { type: 'shotunGuy', x: 30, y: 30, rotDeg: WEST }
];
