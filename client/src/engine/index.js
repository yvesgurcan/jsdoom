import bindKeys from './bindKeys';

console.log('yo!!!')

function init() {

    mapWidth = map[0].length;
    mapHeight = map.length;


    bindKeys();

    initScreen();

    drawMiniMap();

    gameCycle();
}
