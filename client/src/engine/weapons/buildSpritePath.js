import getWeaponSettings from './getWeaponSettings';

export default (state, frame) => {
    const {
        constants: {
            IMG_EXT,
            WEAPON_PATH,
        },
    } = state;

    const weaponSettings = getWeaponSettings(state);
    if (!weaponSettings) {
        return false;
    }

    const {
        prefix,
        noFlashSpritePrefix,
    } = weaponSettings;

    const spriteInitial = noFlashSpritePrefix ? '' : 'G';
    const spriteUrl = `${WEAPON_PATH}/${prefix}${spriteInitial}${frame}0${IMG_EXT}`;
    return spriteUrl;
};
