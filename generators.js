function displayColorInfo(color, i) {
    console.log("La saturation de la couleur " + i + " est de " + color[i].saturation);
    console.log("La teinte de la couleur " + i + " est de " + color[i].hue);
    console.log("La luminosité de la couleur " + i + " est de " + color[i].lightness);
}

function acidicColor() {
    let hue = Math.random() * 360;
    let saturation = randomFloatFromInterval(80, 100);
    let lightness = randomFloatFromInterval(35, 65);

    return { hue: hue, saturation: saturation, lightness: lightness };
}

function coldColor() {
    let hue = randomFloatFromInterval(180, 250);
    let saturation = randomFloatFromInterval(20, 90);
    let lightness = randomFloatFromInterval(20, 90);

    return { hue: hue, saturation: saturation, lightness: lightness };;
}

function warmColor() {
    let hue = 0;
    if (Math.random() < 0.5) {
        hue = randomFloatFromInterval(0, 50);
    }
    else {
        hue = randomFloatFromInterval(320, 360);
    }
    let saturation = randomFloatFromInterval(50, 100);
    let lightness = randomFloatFromInterval(20, 90);

    return { hue: hue, saturation: saturation, lightness: lightness };
}

function wetColdColor() {
    let color1 = coldColor();
    let color2 = { hue: 210, saturation: 89, lightness: 92 };
    let t = 0.3;

    let h = color1.hue + t * (color2.hue - color1.hue);
    let s = color1.saturation + t * (color2.saturation - color1.saturation);
    let l = color1.lightness + t * (color2.lightness - color1.lightness);

    return { hue: h, saturation: s, lightness: l };
}

function mildSugaryColor() {
    let hue = Math.random() * 360;
    let saturation = randomFloatFromInterval(60, 80);
    let lightness = randomFloatFromInterval(70, 90);

    return { hue: hue, saturation: saturation, lightness: lightness };
}

function coldSilentColor() {
    let hue = randomFloatFromInterval(170, 250);
    let saturation = randomFloatFromInterval(10, 40);
    let lightness = randomFloatFromInterval(20, 80);

    return { hue: hue, saturation: saturation, lightness: lightness };
}


function randomFloatFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min;
}

function resolveConflict(color1Parameter, color2Parameter, contrastParameter) {
    // If the colors are too close, we need to increase the contrast
    if (Math.abs(color1Parameter - color2Parameter) < contrastParameter) {
        if (color1Parameter > color2Parameter) {
            color1Parameter += contrastParameter / 2;
            color2Parameter -= contrastParameter / 2;
        } else {
            color2Parameter += contrastParameter / 2;
            color1Parameter -= contrastParameter / 2;
        }
    }
    return [color1Parameter, color2Parameter];
}

function generatePalette(numColors, colorFunction, contrast) {
    let palette = [colorFunction()];

    // Generate the colors of the palette
    for (let i = 1; i < numColors; i++) {
        let objectColor = colorFunction();
        palette.push(objectColor);
    }

    // Check for contrast
    // 1st thing should be to sort the palette by hue, saturation or lightness ok done
    // 2nd thing would be compare one color to the others

    // Look at the hue
    if (contrast.hue > 0) {
        palette.sort((a, b) => a.hue - b.hue);
        for (let i = 0; i < palette.length; i++) { // index of the color we are looking at
            for (let j = 0; j < palette.length; j++) { // index of the color we are comparing to
                if (i === j) { // we don't want to compare the color to itself
                    continue;
                }
                else if (Math.abs(palette[i].hue - palette[j].hue) < contrast.hue) { // if the hue is too close
                    [palette[j].hue, palette[i].hue] = resolveConflict(palette[j].hue, palette[i].hue, contrast.hue);
                }
            }
        }

    }

    // Look at the saturation
    if (contrast.saturation > 0) {
        palette.sort((a, b) => a.saturation - b.saturation);
        for (let i = 0; i < palette.length; i++) { // index of the color we are looking at
            for (let j = 0; j < palette.length; j++) { // index of the color we are comparing to
                console.log("palette[i], palette[j]", palette[i], palette[j])
                if (i === j) { // we don't want to compare the color to itself
                    continue;
                }
                else if (Math.abs(palette[i].saturation - palette[j].saturation) < contrast.saturation) { // if the hue is too close
                    [palette[j].saturation, palette[i].saturation] = resolveConflict(palette[j].saturation, palette[i].saturation, contrast.saturation);
                }
            }
        }
    }

    // Look at the lightness
    if (contrast.lightness > 0) {
        palette.sort((a, b) => a.lightness - b.lightness);
        for (let i = 0; i < palette.length; i++) { // index of the color we are looking at
            for (let j = 0; j < palette.length; j++) { // index of the color we are comparing to
                if (i === j) { // we don't want to compare the color to itself
                    continue;
                }
                else if (Math.abs(palette[i].lightness - palette[j].lightness) < contrast.lightness) { // if the hue is too close
                    [palette[j].lightness, palette[i].lightness] = resolveConflict(palette[j].lightness, palette[i].lightness, contrast.lightness);
                }
            }
        }
    }

    return palette;
}

function displayColorPalette(palette) {
    const colorsContainer = document.querySelector('.colors');
    const children = colorsContainer.children;

    for (let i = 0; i < children.length; i++) {
        const color = palette[i];
        const child = children[i];
        /* display color values */
        child.style.backgroundColor = `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;

        const span = child.querySelector('span');
        if (span) {
            span.textContent = `HSL(${Math.round(color.hue)}, ${Math.round(color.saturation)}%, ${Math.round(color.lightness)}%)`;
            /* hover effect */
            child.addEventListener('mouseover', () => {
                console.log(color.lightness);
                /* deal with contrast */
                if (color.lightness > 50) {
                    span.style.color = "black";
                } else {
                    span.style.color = "white";
                }
            });
            /* reset */
            child.addEventListener('mouseout', () => {
                span.style.color = "transparent";
            });
        }
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

// Function to play the audio
function playAudio() {
    const audio = new Audio('/music/Raindrop_Reverie.mp3');
    audio.play();
}

function handleUserInteraction() {
    playAudio();
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('keydown', handleUserInteraction);
}

// if interaction then play the audio
document.addEventListener('click', handleUserInteraction);
document.addEventListener('keydown', handleUserInteraction);

