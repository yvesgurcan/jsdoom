import drawBigDigit from './drawBigDigit';

export default (number, { element1, element2, element3 }, constants) => {
    const [digit1, digit2, digit3] = number;

    if (digit3 === undefined && digit2 === undefined) {
        drawBigDigit(element1, undefined);
        drawBigDigit(element2, undefined);
        drawBigDigit(element3, digit1, constants);
        return true;
    } else if (digit3 === undefined) {
        drawBigDigit(element1, undefined);
        drawBigDigit(element2, digit1, constants);
        drawBigDigit(element3, digit2, constants);
        return true;
    }

    drawBigDigit(element1, digit1, constants);
    drawBigDigit(element2, digit2, constants);
    drawBigDigit(element3, digit3, constants);
    return true;
};
