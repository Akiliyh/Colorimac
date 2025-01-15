function displayColorInfo(color, i) {
    console.log("La saturation de la couleur " + i + " est de " + color[0]);
    console.log("La teinte de la couleur " + i + " est de " + color[1]);
    console.log("La luminosité de la couleur " + i + " est de " + color[2]);
}

function acidicColor() {
    let hue = Math.random() * 360;
    let saturation = 100;
    let lightness = 50;

    return [hue, saturation, lightness];
}

function coldColor() {
    let hue = Math.random() * 360;
    let saturation = 100;
    let lightness = 50;

    return [hue, saturation, lightness];
}

function generatePalette(numColors, colorFunction) {
    let palette = [];
    for (let i = 0; i < numColors; i++) {
        palette.push(colorFunction());
    }
    return palette;
}