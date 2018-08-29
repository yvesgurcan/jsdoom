import drawDigit from './drawDigit';

export default (number, { element1, element2, element3 }, constants) => {
    const [digit1, digit2, digit3] = number;

    if (digit3 === undefined && digit2 === undefined) {
        drawDigit(element1, undefined);
        drawDigit(element2, undefined);
        drawDigit(element3, digit1, constants);
        return true;
    } else if (digit3 === undefined) {
        drawDigit(element1, undefined);
        drawDigit(element2, digit1, constants);
        drawDigit(element3, digit2, constants);
        return true;
    }

    drawDigit(element1, digit1, constants);
    drawDigit(element2, digit2, constants);
    drawDigit(element3, digit3, constants);
    return true;
};
