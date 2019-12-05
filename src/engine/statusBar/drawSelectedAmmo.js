import getElementById from '../util/getElementById';
import drawNumber from './drawNumber';

export default state => {
    const {
        constants,
        constants: { WEAPON_SETTINGS },
        player: { selectedWeapon, ammo }
    } = state;
    const ammoElement = getElementById('selectedammocontainer');

    if (selectedWeapon) {
        const weaponSetting = WEAPON_SETTINGS[selectedWeapon];

        // limited ammo
        if (weaponSetting && weaponSetting.ammoType) {
            if (ammoElement.className !== weaponSetting.ammoType) {
                ammoElement.className = weaponSetting.ammoType;
            }
            // infinite ammo
        } else if (ammoElement.className !== 'null') {
            ammoElement.className = 'null';
        }

        if (!ammoElement.className) {
            return false;
        }

        const element1 = getElementById('ammo1');
        const element2 = getElementById('ammo2');
        const element3 = getElementById('ammo3');

        let selectedAmmo = null;
        if (
            ammoElement.className !== 'null' &&
            ammo &&
            ammo[weaponSetting.ammoType] !== undefined
        ) {
            selectedAmmo = ammo[weaponSetting.ammoType];
        }

        const ammoQty = selectedAmmo === null ? null : String(selectedAmmo);
        drawNumber(ammoQty, { element1, element2, element3 }, constants, true);

        return false;
    }
};
