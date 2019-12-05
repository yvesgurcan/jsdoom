export default (listener, source) => {
    const dx = listener.x - source.x;
    const dy = listener.y - source.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const adjustedVolume = (1 / dist) * 5;
    return adjustedVolume;
};
