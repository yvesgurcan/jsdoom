import uuid4 from 'uuid4';
import createElement from './createElement';
import getElementById from './util/getElementById';

export default (sprites, spriteTypes, path, state, spriteCategory) => {
    const {
        constants: { IMG_EXT }
    } = state;

    const screen = getElementById('screen');

    let spriteList = [];
    for (let i = 0; i < sprites.length; i++) {
        const sprite = { ...sprites[i] };

        if (!sprite.type) {
            console.error(
                `initSprites(): Could not find sprite type '${sprite.type}' for sprite at {x: ${sprite.x}, y: ${sprite.y}}`
            );
            /* eslint-disable-next-line */
            continue;
        }

        if (isNaN(sprite.x) || isNaN(sprite.y)) {
            console.error(
                'initSprites(): x and/or y coordinates are undefined. Entity will not be placed on the map.',
                { entity: sprite }
            );
            /* eslint-disable-next-line */
            continue;
        }

        const spriteType = spriteTypes[sprite.type];

        if (!spriteType) {
            console.error(
                `initSprites(): Sprite type '${sprite.type}' is undefined. Entity will not be placed on the map.`,
                { entity: sprite, spriteType }
            );
            /* eslint-disable-next-line */
            continue;
        }

        if (spriteCategory === 'enemies') {
            if (!spriteType.prefix) {
                console.error(
                    'initSprites(): Sprite type is missing a prefix for image filenames. Entity will not be placed on the map.',
                    { entity: sprite, spriteType }
                );
                /* eslint-disable-next-line */
                continue;
            }

            if (!spriteType.moveSpeed || !spriteType.rotSpeed) {
                console.error(
                    'initSprites(): moveSpeed and/or rotSpeed of sprite type is undefined. Entity will not be placed on the map.',
                    { entity: sprite, spriteType }
                );
                /* eslint-disable-next-line */
                continue;
            }
        }

        const id = uuid4();

        const img = createElement('img');
        img.id = id;
        img.className = sprite.type;
        img.style.display = 'none';
        img.style.position = 'absolute';

        let element = {};
        if (spriteCategory === 'enemies') {
            img.src = `${path}/${spriteType.prefix}/${spriteType.prefix}A1${IMG_EXT}`;

            element = {
                awake: true,
                rotDeg: 0,
                rot: 0,
                ...sprite,
                id,
                dir: 0,
                speed: 0,
                moveSpeed: spriteType.moveSpeed,
                rotSpeed: spriteType.rotSpeed,
                radius: spriteType.radius,
                oldStyles: {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    clip: '',
                    display: 'none',
                    zIndex: 0
                },
                img
            };

            spriteList = [...spriteList, element];
        } else {
            img.src = `${path}/${spriteType.prefix}A0${IMG_EXT}`;

            let updatedSprite = {
                ...sprite,
                id
            };
            if (spriteCategory === 'decorations') {
                updatedSprite = {
                    ...updatedSprite,
                    block:
                        spriteType.block === true ||
                        spriteType.block === undefined,
                    radius: spriteType.radius
                };
            }

            spriteList = [...spriteList, { ...updatedSprite }];
        }

        screen.appendChild(img);
    }

    return spriteList;
};
