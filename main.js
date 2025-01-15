var w = window.innerWidth;
var h = window.innerHeight;
const COLORS = ["#EE6B49", "#FEDDCF", "#D7E5F4", "#77B5FE", "#0131B4", "#48392A"];
const GRIDCOLORS = [[]];
let acidicParameters = [];
let acidicPalette = [];
let curColorIndex = 0;
let curColor = 0;
let coords = [0, 0, 0];
let angle = [];
let size = [];
let speed = [];
let canvas = 0;
const RANGE = 200;
window.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });

function setup() {
  canvas = createCanvas(w, h, WEBGL);

  colorMode(HSL);
  noStroke();

  for (let i = 0; i < 3; i++) {
    // let curColorIndex = Math.round(random(0, COLORS.length - 1));
    acidicParameters = [random(360), 100, 50];
    acidicPalette = generatePalette(4, acidicParameters);

    let curColorIndex = Math.round(random(0, acidicPalette.length - 1));
    GRIDCOLORS[i] = acidicPalette[curColorIndex]
    // GRIDCOLORS[i] = COLORS[curColorIndex];
    // COLORS.splice(curColorIndex, 1);
    acidicPalette.splice(curColorIndex, 1);

    coords[i] = [random(-RANGE, RANGE), random(-RANGE, RANGE), random(-RANGE, RANGE)];
    angle[i] = random(-RANGE, RANGE);
    size[i] = random(20, 50);
    speed[i] = random(0, 0.01);
    displayColorInfo(GRIDCOLORS[i], i + 1);
  }
}

function generatePalette(numIterations, parameters) {
  let palette = [];
  let hue = parameters[0];
  let saturation = parameters[1];
  let lightness = parameters[2];

  for (let i = 0; i < numIterations; i++) {
    palette.push(color(hue, saturation, lightness));
  }

  return palette;
}

function displayColorInfo(color, i) {
  console.log(" La saturation de la couleur " + i + " est de " + saturation(color));
  console.log(" La teinte de la couleur " + i + " est de " + hue(color));
  console.log(" La luminosité de la couleur " + i + " est de " + lightness(color));
}

function draw() {
  // background(COLORS[COLORS.length - 1]);
  background(acidicPalette[acidicPalette.length - 1]);
  orbitControl(.2, .2, .2);
  for (let i = 0; i < 3; i++) {
    push();
    fill(GRIDCOLORS[i]);
    // fill(acidicPalette[i]);
    translate(coords[i][0], coords[i][1], coords[i][2]);
    rotateX(frameCount * speed[i] + angle[i]);
    rotateY(frameCount * speed[i] + angle[i]);
    //torus(80,15,80,80);
    ellipsoid(size[i] * 10, size[i] * 5, 60, 100, 100);
    pop();
  }
}

window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
}