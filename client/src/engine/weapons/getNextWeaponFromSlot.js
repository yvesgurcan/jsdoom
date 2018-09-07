export default (state, slot) => {
    const {
        constants: { WEAPON_SLOTS },
        player: { selectedWeapon },
    } = state;
    if (slot === undefined || slot === null) {
        console.error(`getWeaponFromSlot(): Invalid slot number '${slot}'.`);
        return false;
    }

    const weaponsInSlot = WEAPON_SLOTS[slot];
    if (!weaponsInSlot) {
        console.error(`getWeaponFromSlot(): No weapon found for slot number ${slot}.`);
        return false;
    }

    if (weaponsInSlot.length === 1) {
        if (weaponsInSlot[0] === selectedWeapon) {
            return false;
        }

        return weaponsInSlot[0];
    }

    if (weaponsInSlot.length === 2) {
        if (weaponsInSlot[0] === selectedWeapon) {
            return WEAPON_SLOTS[slot][1];
        }

        return WEAPON_SLOTS[slot][0];
    }

    console.error(`getWeaponFromSlot(): ${WEAPON_SLOTS.length} weapons found for slot ${slot}. Maximum weapon per slot authorized is 2.`);
    return false;
};
