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
        constants: {
            WEAPONS: {
                SHOTGUN,
                SUPER_SHOTGUN,
                CHAINGUN,
                ROCKET_LAUNCHER,
                PLASMAGUN,
                BFG9000,
            },
        },
        game: { singlePlayer },
    } = state;
    if (singlePlayer) {
        checkIfPlayerOwnsWeapon(state, 3, [SHOTGUN, SUPER_SHOTGUN]);
        checkIfPlayerOwnsWeapon(state, 4, CHAINGUN);
        checkIfPlayerOwnsWeapon(state, 5, ROCKET_LAUNCHER);
        checkIfPlayerOwnsWeapon(state, 6, PLASMAGUN);
        checkIfPlayerOwnsWeapon(state, 7, BFG9000);
    } else {
        // TODO
    }
};
