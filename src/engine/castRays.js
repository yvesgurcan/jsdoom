import { stripWidth } from './constants';
import { getState } from './store';
import castSingleRay from './castSingleRay';

export default () => {
    let stripIdx = 0;

    const {
        player,
        view: { numRays, viewDist },
        automap: { showAutomap, showViewingCone }
    } = getState();

    if (showAutomap && !showViewingCone) {
        return false;
    }

    for (let i = 0; i < numRays; i++) {
        // where on the screen does ray go through?
        const rayScreenPos = (-numRays / 2 + i) * stripWidth;

        // the distance from the viewer to the point on the screen, simply Pythagoras.
        const rayViewDist = Math.sqrt(
            rayScreenPos * rayScreenPos + viewDist * viewDist
        );

        // the angle of the ray, relative to the viewing direction.
        // right triangle: a = sin(A) * c
        const rayAngle = Math.asin(rayScreenPos / rayViewDist);

        castSingleRay(
            player.rot + rayAngle, // add the players viewing direction to get the angle in world space
            stripIdx++
        );
    }
};
