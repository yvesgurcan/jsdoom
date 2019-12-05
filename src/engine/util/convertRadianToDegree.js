export default radians => {
    if (radians >= 0) {
        return (radians / Math.PI) * 180;
    }
    // this might not be the right way to do it... I don't think we get 360 degrees that way
    return ((radians + Math.PI) / Math.PI) * 180 + 180;
};
