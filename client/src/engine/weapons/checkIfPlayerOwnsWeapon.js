export default (state, slotNumber, weaponSlot) => {
    const { player: { weapons = null } } = state;

    if (!weapons) {
        return false;
    }

    let weaponsSlot = [weaponSlot];
    if (Array.isArray(weaponSlot)) {
        weaponsSlot = weaponSlot;
    }

    const owned = weaponsSlot.some(weapon => weapons.indexOf(weapon) > -1);
    return owned;
};
