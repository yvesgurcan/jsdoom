export default (state, weaponsInSlot) => {
    const {
        constants: {
            WEAPONS: { FIST, PISTOL }
        },
        player: { weapons = null }
    } = state;

    if (weaponsInSlot.some(weapon => weapon === FIST || weapon === PISTOL)) {
        return true;
    }

    if (!weapons) {
        return false;
    }

    const owned = weaponsInSlot.some(weapon => weapons.indexOf(weapon) > -1);
    return owned;
};
