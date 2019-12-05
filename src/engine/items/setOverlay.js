import getElementById from '../util/getElementById';

const getOpacity = (colorString, OPACITY_BASE) => {
    if (colorString) {
        const bgColors = colorString.match(
            /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3}), ?(\d\.{0,1}\d{0,1})\)?/
        );
        if (bgColors) {
            if (bgColors.length !== 5) {
                console.error(
                    `setOverlay: The background color of the overlay element is not an expected value. Found ${colorString}. Expected format: rgba(255, 255, 255, 1)`
                );
            }

            const opacity = Number(bgColors[4]);
            return opacity;
        }

        return 1;
    }

    return 0;
};

export default (state, duration, overlayName) => {
    const {
        constants: { OPACITY_INCREMENT, OPACITY_DURATION, PICK_UP_OVERLAY }
    } = state;
    switch (overlayName) {
        default: {
            const overlay = getElementById('overlay');
            const opacity = getOpacity(overlay.style.background);
            const decreasedOpacity = Math.min(5, opacity + OPACITY_INCREMENT);
            console.log(decreasedOpacity);
            overlay.style.background = `rgb(${PICK_UP_OVERLAY}, ${decreasedOpacity})`;

            const opacityDuration = OPACITY_DURATION + decreasedOpacity * 1500;

            const clearOverlay = setInterval(() => {
                const currentOverlay = getElementById('overlay');
                const currentOpacity = getOpacity(
                    currentOverlay.style.background
                );
                if (currentOpacity <= 0) {
                    currentOverlay.style.background = '';
                    clearInterval(clearOverlay);
                } else {
                    const increasedOpacity = Math.max(
                        0,
                        currentOpacity - OPACITY_INCREMENT
                    );
                    currentOverlay.style.background = `rgb(${PICK_UP_OVERLAY}, ${increasedOpacity})`;
                    console.log(increasedOpacity);
                }
            }, duration || opacityDuration);
            break;
        }
    }
};
