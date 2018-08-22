export default {
	chaingunner: {
        prefix: 'CPOS',
        moveSpeed: 0.06,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'D',
            count: 4,
            sounds: ['DSPOSACT'],
            soundBaseInterval: 3000,
        },
    },
    ss: {
        prefix: 'SSWV',
        moveSpeed: 0.05,
        rotSpeed: 3,
        walk: {
            cycle: 700,
            start: 'A',
            end: 'D',
            count: 4,
        },       
    },
    cyberdemon: {
        prefix: 'CYBR',
        moveSpeed: 0.04,
        rotSpeed: 5,
        walk: {
            cycle: 800,
            start: 'A',
            end: 'D',
            count: 4,
            sounds: ['DSHOOF'],
            soundFixedInterval: 800,
        },       
    }
};
