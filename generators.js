function displayColorInfo(color, i) {
    // console.log("La saturation de la couleur " + i + " est de " + color[0]);
    // console.log("La teinte de la couleur " + i + " est de " + color[1]);
    // console.log("La luminosité de la couleur " + i + " est de " + color[2]);
}

function acidicColor() {
    let hue = Math.random() * 360;
    let saturation = randomIntFromInterval(90, 100);
    let lightness = randomIntFromInterval(45, 55);

    return [hue, saturation, lightness];
}

function coldColor() {
    let hue = Math.random() * 360;
    let saturation = randomIntFromInterval(90, 100);
    let lightness = randomIntFromInterval(45, 55);

    return [hue, saturation, lightness];
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePalette(numColors, colorFunction) {
    let palette = [];
    let objectColor = [];
    let contrast = false;
    let count = 0; 
    
    while (!contrast) {
    contrast = true;
    palette = [];

    for (let i = 0; i < numColors; i++) {

            callColorFunction = colorFunction();
            objectColor = callColorFunction;
            count = 0;

            for (let k = 0; k < i; k++) {
                count += 1;
                console.log(palette[k]);
                console.log(objectColor);
                if (
                    (Math.abs(palette[k][0] - objectColor[0]) < 50) /*||
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
                    console.log("Le contraste est good");
                }
            }
            console.log(palette);
        
        palette.push(objectColor);
    }
}
    return palette;
}