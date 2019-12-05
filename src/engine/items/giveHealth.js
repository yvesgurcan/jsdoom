import { dispatch } from '../store';

export default (state, item) => {
    const {
        constants: { PLAYER_MAX_NORMAL_HEALTH, PLAYER_MAX_IMPROVED_HEALTH },
        player,
        itemTypes
    } = state;
    const itemType = itemTypes[item.type];
    if (!itemType.pickup) {
        return false;
    }

    const { setHealth, extraHealth, addHealth } = itemType.pickup;
    if (setHealth) {
        if (player.health < setHealth) {
            const health = Math.min(PLAYER_MAX_IMPROVED_HEALTH, setHealth);
            dispatch({ type: 'SET_PLAYER_HEALTH', payload: { health } });
            return true;
        }
    }

    if (addHealth) {
        if (player.health + addHealth < PLAYER_MAX_NORMAL_HEALTH) {
            const health = Math.min(
                PLAYER_MAX_NORMAL_HEALTH,
                player.health + addHealth
            );
            dispatch({ type: 'SET_PLAYER_HEALTH', payload: { health } });
            return true;
        }
    }

    if (extraHealth) {
        if (player.health + extraHealth < PLAYER_MAX_IMPROVED_HEALTH) {
            const health = Math.min(
                PLAYER_MAX_IMPROVED_HEALTH,
                player.health + extraHealth
            );
            dispatch({ type: 'SET_PLAYER_HEALTH', payload: { health } });
            return true;
        }
    }

    return false;
};
