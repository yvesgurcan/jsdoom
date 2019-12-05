import drawBigDigit from './drawBigDigit';

export default (
    number,
    { element1, element2, element3 },
    constants,
    alternativeWidth = false
) => {
    if (number === null) {
        drawBigDigit(element1, undefined, constants, alternativeWidth);
        drawBigDigit(element2, undefined, constants, alternativeWidth);
        drawBigDigit(element3, undefined, constants, alternativeWidth);
        return true;
    }

    const [digit1, digit2, digit3] = number;

    if (digit3 === undefined && digit2 === undefined) {
        drawBigDigit(element1, undefined, constants, alternativeWidth);
        drawBigDigit(element2, undefined, constants, alternativeWidth);
        drawBigDigit(element3, digit1, constants, alternativeWidth);
        return true;
    } else if (digit3 === undefined) {
        drawBigDigit(element1, undefined, constants, alternativeWidth);
        drawBigDigit(element2, digit1, constants, alternativeWidth);
        drawBigDigit(element3, digit2, constants, alternativeWidth);
        return true;
    }

    drawBigDigit(element1, digit1, constants, alternativeWidth);
    drawBigDigit(element2, digit2, constants, alternativeWidth);
    drawBigDigit(element3, digit3, constants, alternativeWidth);
    return true;
};
