export default {
    zombieman: {
        name: 'Zombieman',
        prefix: 'POSS',
        health: 20,
        moveSpeed: 0.03,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'D',
            count: 4,
            mirroredAngles: true,
            soundRandom: ['DSPOSACT'],
            soundBaseInterval: 3000
        }
    },
    shotgunGuy: {
        name: 'Shotgun Guy',
        prefix: 'SPOS',
        health: 30,
        moveSpeed: 0.03,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'D',
            count: 4,
            mirroredAngles: true,
            soundRandom: ['DSPOSACT'],
            soundBaseInterval: 3000
        }
    },
    chaingunner: {
        name: 'Heavy Weapon Dude',
        prefix: 'CPOS',
        health: 70,
        moveSpeed: 0.03,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'D',
            count: 4,
            soundRandom: ['DSPOSACT'],
            soundBaseInterval: 3000
        }
    },
    imp: {
        name: 'Imp',
        prefix: 'TROO',
        moveSpeed: 0.03,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'D',
            count: 4,
            mirroredAngles: true,
            soundRandom: ['DSBGACT'],
            soundBaseInterval: 5000
        }
    },
    demon: {
        name: 'Demon',
        prefix: 'SARG',
        moveSpeed: 0.04,
        rotSpeed: 3,
        walk: {
            cycle: 600,
            start: 'A',
            end: 'D',
            count: 4,
            mirroredAngles: true,
            soundRandom: ['DSDMACT'],
            soundBaseInterval: 4000
        }
    },
    lostSoul: {
        name: 'Lost Soul',
        prefix: 'SKUL',
        moveSpeed: 0.015,
        rotSpeed: 3,
        walk: {
            cycle: 500,
            start: 'A',
            end: 'B',
            count: 2,
            mirroredAngles: true,
            reversedAngles: true,
            soundRandom: ['DSDMACT'],
            soundBaseInterval: 5000
        }
    },
    cacodemon: {
        name: 'Cacodemon',
        prefix: 'HEAD',
        moveSpeed: 0.025,
        rotSpeed: 3,
        walk: {
            cycle: 500,
            start: 'A',
            end: 'A',
            count: 1,
            mirroredAngles: true,
            soundRandom: ['DSDMACT'],
            soundBaseInterval: 5000
        }
    },
    hellKnight: {
        name: 'Hell Knight',
        prefix: 'BOS2',
        moveSpeed: 0.06,
        rotSpeed: 3,
        walk: {
            cycle: 900,
            start: 'A',
            end: 'D',
            count: 4,
            mirroredFrames: true,
            soundRandom: ['DSDMACT'],
            soundBaseInterval: 5000
        }
    },
    baronOfHell: {
        name: 'Baron of Hell',
        prefix: 'BOSS',
        moveSpeed: 0.06,
        rotSpeed: 3,
        walk: {
            cycle: 900,
            start: 'A',
            end: 'D',
            count: 4,
            mirroredAngles: true,
            soundRandom: ['DSDMACT'],
            soundBaseInterval: 5000
        }
    },
    arachnotron: {
        name: 'Arachnotron',
        prefix: 'BSPI',
        moveSpeed: 0.03,
        rotSpeed: 3,
        walk: {
            cycle: 900,
            start: 'A',
            end: 'F',
            count: 6,
            mirroredFramesAnglesNotShared: true,
            soundFixed: ['DSBSPWLK'],
            soundRandom: ['DSBSPACT'],
            soundFixedInterval: 550,
            soundBaseInterval: 5000
        }
    },
    painElemental: {
        name: 'Pain Elemental',
        prefix: 'PAIN',
        moveSpeed: 0.03,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'C',
            count: 3,
            mirroredAngles: true
        }
    },
    revenant: {
        name: 'Revenant',
        prefix: 'SKEL',
        moveSpeed: 0.06,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'F',
            count: 6,
            mirroredFrames: true,
            soundRandom: ['DSSKEACT'],
            soundBaseInterval: 5000
        }
    },
    mancubus: {
        name: 'Mancubus',
        prefix: 'FATT',
        moveSpeed: 0.02,
        rotSpeed: 3,
        walk: {
            cycle: 1200,
            start: 'A',
            end: 'F',
            count: 6,
            mirroredAngles: true,
            soundRandom: ['DSPOSACT'],
            soundBaseInterval: 5000
        }
    },
    archVile: {
        name: 'Arch-Vile',
        prefix: 'VILE',
        moveSpeed: 0.08,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'F',
            count: 6,
            mirroredFrames: true,
            soundRandom: ['DSVILACT'],
            soundBaseInterval: 5000
        }
    },
    spiderMastermind: {
        name: 'The Spider Mastermind',
        prefix: 'SPID',
        moveSpeed: 0.02,
        rotSpeed: 3,
        walk: {
            cycle: 900,
            start: 'A',
            end: 'F',
            count: 6,
            mirroredFramesAnglesNotShared: true,
            soundFixed: ['DSMETAL'],
            soundFixedInterval: 425
        }
    },
    cyberdemon: {
        name: 'Cyberdemon',
        prefix: 'CYBR',
        moveSpeed: 0.04,
        rotSpeed: 3,
        walk: {
            cycle: 800,
            start: 'A',
            end: 'D',
            count: 4,
            soundFixed: ['DSHOOF'],
            soundFixedInterval: 900
        }
    },
    ss: {
        name: '',
        prefix: 'SSWV',
        moveSpeed: 0.03,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'D',
            count: 4
        }
    }
};
