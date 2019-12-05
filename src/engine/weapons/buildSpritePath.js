import getWeaponSettings from './getWeaponSettings';

const getSpriteInitial = (state, doNotPrefix, weaponSettings) => {
    const { noFlashSpritePrefix } = weaponSettings;
    if (noFlashSpritePrefix || doNotPrefix) {
        return '';
    }

    return 'G';
};

export default (state, frame, doNotPrefix) => {
    const {
        constants: { IMG_EXT, WEAPON_PATH }
    } = state;

    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const { prefix } = weaponSettings;

    // noFlashSpritePrefix || doNotPrefix ? '' : 'G';
    const spriteInitial = getSpriteInitial(state, doNotPrefix, weaponSettings);
    const spriteUrl = `${WEAPON_PATH}/${prefix}${spriteInitial}${frame}0${IMG_EXT}`;
    return spriteUrl;
};
