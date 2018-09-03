import drawMugShot from './drawMugShot';
import drawHealth from './drawHealth';
import drawArmor from './drawArmor';
import drawKeys from './drawKeys';
import drawWeapons from './drawWeapons';
import drawSelectedAmmo from './drawSelectedAmmo';
import drawAmmo from './drawAmmo';

export default (state) => {
    drawSelectedAmmo(state);
    drawHealth();
    drawWeapons(state);
    drawMugShot();
    drawArmor();
    drawKeys(state);
    drawAmmo(state);
};
