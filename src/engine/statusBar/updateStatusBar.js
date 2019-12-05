import drawSelectedAmmo from './drawSelectedAmmo';
import drawHealth from './drawHealth';
import drawWeaponSlots from './drawWeaponSlots';
import drawMugShot from './drawMugShot';
import drawArmor from './drawArmor';
import drawKeys from './drawKeys';
import drawAmmo from './drawAmmo';

export default state => {
    const {
        hud: { hideStatusBar }
    } = state;
    if (hideStatusBar) {
        return false;
    }

    drawSelectedAmmo(state);
    drawHealth();
    drawWeaponSlots(state);
    drawMugShot();
    drawArmor();
    drawKeys(state);
    drawAmmo(state);
};
