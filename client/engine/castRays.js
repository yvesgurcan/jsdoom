function castRays() {

    var stripIdx = 0;

    for (var i=0;i<numRays;i++) {
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