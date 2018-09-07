import getElementById from '../getElementById';
import drawSmallDigit from './drawSmallDigit';

const updateWeaponStatus = (state, slotNumber, owned) => {
    const element = getElementById(`weapon${slotNumber}`);
    const color = owned ? 'yellow' : 'grey';

    if (element.className !== color) {
        const { constants } = state;
        drawSmallDigit(element, slotNumber, color, constants);
    }
};

const checkIfPlayerOwnsWeapon = (state, slotNumber, weaponSlot) => {
    const { player: { weapons = null } } = state;

    if (!weapons) {
        return false;
    }

    let weaponsSlot = [weaponSlot];
    if (Array.isArray(weaponSlot)) {
        weaponsSlot = weaponSlot;
    }

    const owned = weaponsSlot.some(weapon => weapons.indexOf(weapon) > -1);

    updateWeaponStatus(state, slotNumber, owned);
    return true;
};


export default (state) => {
    const {
        constants: { WEAPON_SLOTS },
        game: { singlePlayer },
    } = state;
    if (singlePlayer) {
        checkIfPlayerOwnsWeapon(state, 3, WEAPON_SLOTS[3]);
        checkIfPlayerOwnsWeapon(state, 4, WEAPON_SLOTS[4]);
        checkIfPlayerOwnsWeapon(state, 5, WEAPON_SLOTS[5]);
        checkIfPlayerOwnsWeapon(state, 6, WEAPON_SLOTS[6]);
        checkIfPlayerOwnsWeapon(state, 7, WEAPON_SLOTS[7]);
    }
};
