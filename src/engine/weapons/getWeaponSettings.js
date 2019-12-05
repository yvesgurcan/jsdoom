export default state => {
    const {
        constants: { WEAPON_SETTINGS },
        player: { selectedWeapon }
    } = state;

    const weaponSettings = WEAPON_SETTINGS[selectedWeapon];
    if (!weaponSettings) {
        console.error(
            `getWeaponSettings(): Unknown selected weapon '${selectedWeapon}'. Could not get weapon settings.`
        );
        return false;
    }

    return weaponSettings;
};
