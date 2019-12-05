import checkIfPlayerOwnsWeaponInSlot from './checkIfPlayerOwnsWeaponInSlot';

export default (state, slot) => {
    const {
        constants: {
            WEAPONS: { FIST },
            WEAPON_SLOTS
        },
        weapons: { lowerWeaponDelay, raiseWeaponDelay },
        player: { selectedWeapon, weapons, firing }
    } = state;

    if (firing || lowerWeaponDelay || raiseWeaponDelay) {
        return false;
    }

    if (slot === undefined || slot === null) {
        console.error(`getWeaponFromSlot(): Invalid slot number '${slot}'.`);
        return false;
    }

    const weaponsInSlot = WEAPON_SLOTS[slot];
    if (!weaponsInSlot) {
        console.error(
            `getWeaponFromSlot(): No weapon found for slot number ${slot}.`
        );
        return false;
    }

    const owned = checkIfPlayerOwnsWeaponInSlot(state, weaponsInSlot);
    if (!owned) {
        return false;
    }

    if (weaponsInSlot.length === 1) {
        if (weaponsInSlot[0] === selectedWeapon) {
            return false;
        }

        return weaponsInSlot[0];
    }

    if (weaponsInSlot.length === 2) {
        // switch to first weapon in the slot if owned
        if (weaponsInSlot[0] === selectedWeapon) {
            // fist is never owned
            if (slot === 1 || weapons.indexOf(WEAPON_SLOTS[slot][1]) > -1) {
                return WEAPON_SLOTS[slot][1];
            }
        }

        // switch to second weapon in the slot if owned
        if (weaponsInSlot[1] === selectedWeapon) {
            if (slot !== 1 && weapons.indexOf(WEAPON_SLOTS[slot][0]) > -1) {
                return WEAPON_SLOTS[slot][0];
            }
        }

        // switch to whichever weapon is owned
        if (weapons.indexOf(WEAPON_SLOTS[slot][0]) > -1) {
            if (selectedWeapon !== WEAPON_SLOTS[slot][0]) {
                return WEAPON_SLOTS[slot][0];
            }
        }

        if (weapons.indexOf(WEAPON_SLOTS[slot][1]) > -1) {
            if (selectedWeapon !== WEAPON_SLOTS[slot][1]) {
                return WEAPON_SLOTS[slot][1];
            }
        }

        // fist is never owned
        if (slot === 1 && selectedWeapon !== FIST) {
            return FIST;
        }

        return false;
    }

    console.error(
        `getWeaponFromSlot(): ${WEAPON_SLOTS.length} weapons found for slot ${slot}. Maximum weapon per slot authorized is 2.`
    );
    return false;
};
