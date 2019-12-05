import {
    CHAINSAW,
    SHOTGUN,
    SUPER_SHOTGUN,
    CHAINGUN,
    ROCKET_LAUNCHER,
    BULLETS,
    SHELLS,
    ROCKETS,
    CELLS,
    GREEN_ARMOR,
    BLUE_ARMOR,
    PLASMA_GUN,
    BFG9000
} from '../engine/constants';

export default {
    // weapons
    chainsaw: {
        message: 'A chainsaw!  Find some meat!',
        prefix: 'CSAW',
        pickup: {
            weapon: CHAINSAW
        }
    },
    shotgun: {
        message: 'You got the shotgun!',
        prefix: 'SHOT',
        pickup: {
            weapon: SHOTGUN,
            [SHELLS]: 8
        }
    },
    superShotgun: {
        message: 'You got the super shotgun!',
        prefix: 'SGN2',
        pickup: {
            weapon: SUPER_SHOTGUN,
            [SHELLS]: 8
        }
    },
    chaingun: {
        message: 'You got the chaingun!',
        prefix: 'MGUN',
        pickup: {
            weapon: CHAINGUN,
            [BULLETS]: 20
        }
    },
    rocketLauncher: {
        message: 'You got the rocket launcher!',
        prefix: 'LAUN',
        pickup: {
            weapon: ROCKET_LAUNCHER,
            [ROCKETS]: 2
        }
    },
    plasmaGun: {
        message: 'You got the plasma gun!',
        prefix: 'PLAS',
        pickup: {
            weapon: PLASMA_GUN,
            [CELLS]: 40
        }
    },
    bfg9000: {
        message: 'You got the BFG9000!  Oh, yes.',
        prefix: 'BFUG',
        pickup: {
            weapon: BFG9000,
            [CELLS]: 40
        }
    },
    // ammo
    clip: {
        message: 'Picked up a clip.',
        prefix: 'CLIP',
        pickup: {
            [BULLETS]: 5
        }
    },
    boxOfBullets: {
        message: 'Picked up a box of bullets.',
        prefix: 'AMMO',
        pickup: {
            [BULLETS]: 50
        }
    },
    shells: {
        message: 'Picked up 4 shotgun shells.',
        prefix: 'SHEL',
        pickup: {
            [SHELLS]: 4
        }
    },
    boxOfShells: {
        message: 'Picked up a box of shotgun shells.',
        prefix: 'SBOX',
        pickup: {
            [SHELLS]: 20
        }
    },
    rocket: {
        message: 'Picked up a rocket.',
        prefix: 'ROCK',
        pickup: {
            [ROCKETS]: 1
        }
    },
    boxOfRockets: {
        message: 'Picked up a box of rockets.',
        prefix: 'BROK',
        pickup: {
            [ROCKETS]: 5
        }
    },
    cell: {
        message: 'Picked up an energy cell.',
        prefix: 'CELL',
        pickup: {
            [CELLS]: 20
        }
    },
    cellPack: {
        message: 'Picked up an energy cell pack.',
        prefix: 'CELP',
        pickup: {
            [CELLS]: 100
        }
    },
    backpack: {
        message: 'Picked up a backpack full of ammo!',
        prefix: 'BPAK',
        pickup: {
            doubleMaxAmmo: true,
            [BULLETS]: 10,
            [SHELLS]: 4,
            [ROCKETS]: 1,
            [CELLS]: 20
        }
    },
    // health
    vial: {
        message: 'Picked up a health bonus.',
        prefix: 'BON1',
        endFrame: 'D',
        pickup: {
            extraHealth: 1
        }
    },
    stimpack: {
        message: 'Picked up a stimpack.',
        prefix: 'STIM',
        pickup: {
            addHealth: 10
        }
    },
    medikit: {
        message: 'Picked up a medikit.',
        prefix: 'MEDI',
        pickup: {
            addHealth: 25
        }
    },
    // armor
    helmet: {
        message: 'Picked up an armor bonus.',
        prefix: 'BON2',
        endFrame: 'D',
        pickup: {
            extraArmor: 1,
            doNotOverrideArmorType: true
        }
    },
    greenArmor: {
        message: 'Picked up the armor.',
        prefix: 'ARM1',
        endFrame: 'B',
        pickup: {
            setArmor: 100,
            armorType: GREEN_ARMOR
        }
    },
    blueArmor: {
        message: 'Picked up the MegaArmor!',
        prefix: 'ARM2',
        endFrame: 'B',
        pickup: {
            setArmor: 200,
            armorType: BLUE_ARMOR
        }
    },
    // power-ups
    berserk: {
        message: 'Berserk!',
        prefix: 'PSTR',
        pickup: {
            setHealth: 100,
            berserk: true
        }
    },
    soulSphere: {
        message: 'Supercharge!',
        prefix: 'SOUL',
        endFrame: 'D',
        pickup: {
            extraHealth: 100
        }
    },
    megasphere: {
        message: 'MegaSphere!',
        prefix: 'MEGA',
        endFrame: 'D',
        pickup: {
            setHealth: 200,
            setArmor: 200,
            armorType: BLUE_ARMOR
        }
    },
    invulnerability: {
        message: 'Invulnerability!',
        prefix: 'PINV',
        endFrame: 'D',
        pickup: {
            invulnerable: 30
        }
    },
    invisibility: {
        message: 'Partial Invisibility',
        prefix: 'PINS',
        endFrame: 'D',
        pickup: {
            invisible: 60
        }
    },
    computerMap: {
        message: 'Computer Area Map',
        prefix: 'PMAP',
        endFrame: 'D',
        pickup: {
            revealMapUnexplored: true
        }
    },
    visor: {
        message: 'Light Amplification Visor',
        prefix: 'PVIS',
        endFrame: 'B',
        pickup: {
            lightAmplification: 120
        }
    },
    radSuit: {
        message: 'Radiation Shielding Suit',
        prefix: 'SUIT',
        pickup: {
            radiationShield: 120
        }
    }
};
