function initScreen() {

    var screen = $("screen");

    for (var i=0;i<screenWidth;i+=stripWidth) {
        var strip = dc("div");
        strip.style.position = "absolute";
        strip.style.left = i + "px";
        strip.style.width = stripWidth+"px";
        strip.style.height = "0px";
        strip.style.overflow = "hidden";

        strip.style.backgroundColor = "magenta";

        var img = new Image();
        img.src = (window.opera ? "walls-19-colors.png" : "walls.png");
        img.style.position = "absolute";
        img.style.left = "0px";

        strip.appendChild(img);
        strip.img = img;	// assign the image to a property on the strip element so we have easy access to the image later

        screenStrips.push(strip);
        screen.appendChild(strip);
    }

}
