function displayColorInfo(color, i) {
    // console.log("La saturation de la couleur " + i + " est de " + color[0]);
    // console.log("La teinte de la couleur " + i + " est de " + color[1]);
    // console.log("La luminosité de la couleur " + i + " est de " + color[2]);
    console.log("La teinte de la couleur " + i + " est de " + color.hue);
}

function acidicColor() {
    let hue = Math.random() * 360;
    let saturation = randomIntFromInterval(90, 100);
    let lightness = randomIntFromInterval(45, 55);

    return { hue: hue, saturation: saturation, lightness: lightness };
}

function coldColor() {
    let hue = Math.random() * (270 - 90) + 90;
    let saturation = Math.random() * (100 - 50) + 50;
    let lightness = Math.random() * (70 - 30) + 30;

    return { hue: hue, saturation: saturation, lightness: lightness };;
}

function warmColor() {

    let hue = 0;
    if (Math.random() < 0.5) {
        hue = Math.random() * 50;
    }
    else {
        hue = Math.random() * (360 - 320) + 320;
    }
    let saturation = Math.random() * (100 - 50) + 50;
    let lightness = Math.random() * (70 - 40) + 40;

    return { hue: hue, saturation: saturation, lightness: lightness };
}

function wetColdColor() {
    let color1 = warmColor();
    let color2 = coldColor();
    let t = 0.3;

    let h = color1.hue + t * (color2.hue - color1.hue);
    let s = color1.saturation + t * (color2.saturation - color1.saturation);
    let l = color1.lightness + t * (color2.lightness - color1.lightness);

    return { hue: h, saturation: s, lightness: l };
}

function mildSugaryColor() {
    let hue = Math.random() * 360;
    let saturation = randomIntFromInterval(90, 100);
    let lightness = randomIntFromInterval(45, 55);

    return { hue: hue, saturation: saturation, lightness: lightness };
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePalette(numColors, colorFunction, minHueContrast) {
    let palette = [];
    let objectColor = [];
    let contrast = false;
    let count = 0;
    let callColorFunction;

    while (!contrast) {
        contrast = true;
        palette = [];

        for (let i = 0; i < numColors; i++) {

            callColorFunction = colorFunction();
            objectColor = callColorFunction;
            count = 0;

            for (let k = 0; k < i; k++) {
                count += 1;
                // console.log(palette[k]);
                // console.log(objectColor);
                // console.log("palette", minHueContrast)
                if (
                    (Math.abs(palette[k].hue - objectColor.hue) < minHueContrast) /*||
                    (Math.abs(palette[k][1] - objectColor[1]) < 45) ||
                    (Math.abs(palette[k][2] - objectColor[2]) < 30)*/) {
                    // console.log(Math.abs(palette[k][0] - objectColor[0]) < 20);
                    // console.log(Math.abs(palette[k][0] - objectColor[0]));
                    // console.log(Math.abs(palette[k][1] - objectColor[1]) < 45);
                    // console.log(Math.abs(palette[k][1] - objectColor[1]));
                    // console.log(Math.abs(palette[k][2] - objectColor[2]) < 30);
                    // console.log(Math.abs(palette[k][2] - objectColor[2]));
                    console.log("ah bah le contraste n'est pas bon !");

                    contrast = false;
                    break;
                } else {
                    // console.log("Le contraste est good");
                }
            }
            // console.log(palette);

            palette.push(objectColor);
        }
    }
    return palette;
}

function displayColorPalette(palette) {
    const colorsContainer = document.querySelector('.colors');
    const children = colorsContainer.children;

    // Loop through each child of .colors
    for (let i = 0; i < children.length; i++) {
        const color = palette[i];
        const child = children[i];
        child.style.backgroundColor = `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
    }
}

document.querySelectorAll('.fa-angle-left').forEach((faElement) => {
    faElement.addEventListener('click', () => {
        // Find the next section
        const currentSection = faElement.parentElement.parentElement;
        const nextSection = currentSection.previousElementSibling;

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('.fa-angle-right').forEach((faElement) => {
    faElement.addEventListener('click', () => {
        // Find the next section
        const currentSection = faElement.parentElement.parentElement;
        const nextSection = currentSection.nextElementSibling;

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
