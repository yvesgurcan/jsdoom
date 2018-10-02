import getWeaponSettings from './getWeaponSettings';

const getSpriteInitial = (state, options, weaponSettings) => {
    const {
        noFlashOverlay = false,
        flashSprite,
    } = options;

    const { noFlashSpritePrefix } = weaponSettings;

    if (flashSprite) {
        return 'F';
    }

    if (noFlashSpritePrefix || noFlashOverlay) {
        return '';
    }
    
    return 'G';
};

export default (state, frame, options = {}) => {
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

    const { prefix } = weaponSettings;

    const spriteInitial = getSpriteInitial(state, options, weaponSettings);
    const spriteUrl = `${WEAPON_PATH}/${prefix}${spriteInitial}${frame}0${IMG_EXT}`;
    return spriteUrl;
};
