import getElementById from '../getElementById';
import drawSmallNumber from './drawSmallNumber';

const drawAmmoInterval = (state, ammoType) => {
    drawCurrentAmmo(state, ammoType);
    drawMaxAmmo(state, ammoType);
};

const drawCurrentAmmo = (state, ammoType) => {
    const {
        constants,
        player: { ammo },
    } = state;

    const ammoQty = ammo ? String(ammo[ammoType] || 0) : '0';
    return drawAmmo(state, ammoType, ammoQty, constants);
};

const drawMaxAmmo = (state, ammoType) => {
    const {
        constants,
        constants: { AMMO_MAX },
        player: { backpack },
    } = state;

    const ammoQty = String((AMMO_MAX[ammoType] || 0) * (!!backpack + 1));
    return drawAmmo(state, `max${ammoType}`, ammoQty, constants);
};

const drawAmmo = (state, ammoType, ammoQty, constants) => {
    const element1 = getElementById(`${ammoType}1`);
    const element2 = getElementById(`${ammoType}2`);
    const element3 = getElementById(`${ammoType}3`);

    return drawSmallNumber(ammoQty, { element1, element2, element3 }, constants);
};

export default (state) => {
    drawAmmoInterval(state, 'bullets');
    drawAmmoInterval(state, 'shells');
    drawAmmoInterval(state, 'rockets');
    drawAmmoInterval(state, 'cells');
    return true;
};
