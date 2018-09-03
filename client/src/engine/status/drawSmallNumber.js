import drawSmallDigit from './drawSmallDigit';

export default (number, { element1, element2, element3 }, constants) => {
    if (number === null) {
        drawSmallDigit(element1, undefined, 'yellow', constants);
        drawSmallDigit(element2, undefined, 'yellow', constants);
        drawSmallDigit(element3, undefined, 'yellow', constants);
        return true;
    }

    const [digit1, digit2, digit3] = number;

    if (digit3 === undefined && digit2 === undefined) {
        drawSmallDigit(element1, undefined, 'yellow', constants);
        drawSmallDigit(element2, undefined, 'yellow', constants);
        drawSmallDigit(element3, digit1, 'yellow', constants);
        return true;
    } else if (digit3 === undefined) {
        drawSmallDigit(element1, undefined, 'yellow', constants);
        drawSmallDigit(element2, digit1, 'yellow', constants);
        drawSmallDigit(element3, digit2, 'yellow', constants);
        return true;
    }

    drawSmallDigit(element1, digit1, 'yellow', constants);
    drawSmallDigit(element2, digit2, 'yellow', constants);
    drawSmallDigit(element3, digit3, 'yellow', constants);
    return true;
};
