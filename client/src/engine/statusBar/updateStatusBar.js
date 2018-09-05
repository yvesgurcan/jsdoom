import drawMugShot from './drawMugShot';
import drawHealth from './drawHealth';
import drawArmor from './drawArmor';
import drawKeys from './drawKeys';
import drawWeaponSlots from './drawWeaponSlots';
import drawSelectedAmmo from './drawSelectedAmmo';
import drawAmmo from './drawAmmo';

export default (state) => {
    drawSelectedAmmo(state);
    drawHealth();
    drawWeaponSlots(state);
    drawMugShot();
    drawArmor();
    drawKeys(state);
    drawAmmo(state);
};
