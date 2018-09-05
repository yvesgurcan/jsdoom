import getElementById from '../getElementById';

export default (state) => {
    const {
        constants: {
            IMG_EXT,
            WEAPON_PATH,
            WEAPON_SETTINGS,
        },
        player: { selectedWeapon },
    } = state;

    if (!selectedWeapon) {
        console.error('No weapon selected.');
        return false;
    }

    const weaponSettings = WEAPON_SETTINGS[selectedWeapon];

    if (!weaponSettings) {
        console.error(`Unknown selected weapon '${selectedWeapon}'. Could not get weapon settings.`);
    }

    const {
        prefix,
    } = weaponSettings;

    const weapon = getElementById('weapon');
    weapon.src = `${WEAPON_PATH}/${prefix}GA0${IMG_EXT}`;
};
