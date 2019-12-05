import { dispatch } from '../store';

export default (state, item) => {
    const {
        constants: { PLAYER_MAX_IMPROVED_ARMOR },
        player,
        itemTypes
    } = state;
    const itemType = itemTypes[item.type];
    if (!itemType.pickup) {
        return false;
    }

    const {
        setArmor,
        extraArmor,
        armorType,
        doNotOverrideArmorType
    } = itemType.pickup;
    if (setArmor) {
        if (player.armor < setArmor) {
            const armor = Math.min(PLAYER_MAX_IMPROVED_ARMOR, setArmor);
            dispatch({
                type: 'SET_PLAYER_ARMOR',
                payload: { armor, armorType }
            });
            return true;
        }
    }

    if (extraArmor) {
        const newArmor = player.armor + extraArmor;
        if (newArmor < PLAYER_MAX_IMPROVED_ARMOR) {
            const armor = Math.min(PLAYER_MAX_IMPROVED_ARMOR, newArmor);
            dispatch({
                type: 'SET_PLAYER_ARMOR',
                payload: { armor, armorType, doNotOverrideArmorType }
            });
            return true;
        }
    }

    return false;
};
