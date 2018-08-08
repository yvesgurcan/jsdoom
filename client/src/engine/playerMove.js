import isBlocking from './isBlocking';
import store from './store';
const { getState, dispatch } = store;

export default () => {
    const { player } = getState();
    
    // player will move this far along the current direction vector
	const moveStep = player.speed * player.moveSpeed;	

    // add rotation if player is rotating (player.dir != 0)
	const rotation = player.rot + (player.dir * player.rotSpeed); 

	// make sure the angle is between 0 and 360 degrees
	//while (player.rot < 0) player.rot += twoPI;
	//while (player.rot >= twoPI) player.rot -= twoPI;

    // calculate new player position with simple trigonometry
	const x = player.x + Math.cos(rotation) * moveStep;	
    const y = player.y + Math.sin(rotation) * moveStep;
    
    // are we allowed to move to the new position?
	if (isBlocking(x, y)) {
        return;
    }
    
    // set new position
    if (moveStep || rotation !== player.rot) {
        dispatch({ type: 'PLAYER_SET_POSITION', x, y, rotation })
    }
}