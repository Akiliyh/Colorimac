var w = window.innerWidth;
var h = window.innerHeight;
const COLORS = ["#808080", "#00ff11", "#ff0000", "#00f7ff", "#0131B4", "#48392A"];
let curColors = COLORS;
let GRIDCOLORS = [];
let acidicPalette = [];
let coldPalette = [];
let curColorIndex = 0;
let curColor = 0;
let coords = [0, 0, 0];
let angle = [];
let size = [];
let depth = [];
let speed = [];
let canvas = 0;
const RANGE = 300;
let rotationEnabled = true;
let currentAngles = [0, 0, 0];

function init() {
  GRIDCOLORS = [];
  coords = [];
  angle = [];
  size = [];
  depth = [];
  speed = [];
  curColors = [...COLORS];

  // to change palette style change "acidicPalette" & "acidicColor"
  acidicPalette = generatePalette(4, acidicColor);
  curColors = [...acidicPalette];
  console.log(acidicPalette);

  for (let i = 0; i < 3; i++) {
    let curColorIndex = Math.round(random(0, curColors.length - 1));
    GRIDCOLORS[i] = curColors[curColorIndex];
    curColors.splice(curColorIndex, 1);

    coords[i] = [random(-RANGE, RANGE), random(-RANGE, RANGE), random(-RANGE, RANGE)];
    angle[i] = random(-RANGE, RANGE);
    size[i] = random(20, 50);

    let hueValue = hue(color(GRIDCOLORS[i]));
    // map rotation according to hue value -> warm moves fast and cold moves slow
    // % 360 cause 0 and 360 = same
    console.log(hueValue);
    let distance = Math.abs((hueValue % 360) - 180);
    distance = Math.min(distance, 360 - distance);
    speed[i] = map(distance, 0, 180, 0, 0.01);
    displayColorInfo(GRIDCOLORS[i], i + 1);
  }
}

function setup() {
  canvas = createCanvas(w, h, WEBGL);
  curColors = COLORS;
  colorMode(HSL);
  noStroke();
  init();
}

function acidicColor() {
  let hue = random(360);
  let saturation = 100;
  let lightness = 50;

  return color(hue, saturation, lightness);
}

function generatePalette(numColors, colorFunction) {
  let palette = [];

  for (let i = 0; i < numColors; i++) {
    palette.push(colorFunction());
  }

  return palette;
}

function displayColorInfo(color, i) {
  console.log(" La saturation de la couleur " + i + " est de " + saturation(color));
  console.log(" La teinte de la couleur " + i + " est de " + hue(color));
  console.log(" La luminosité de la couleur " + i + " est de " + lightness(color));
}

function draw() {
  background(curColors[curColors.length - 1]);
  orbitControl(.2, .2, .2);
  for (let i = 0; i < 3; i++) {
    push();
    fill(GRIDCOLORS[i]);
    translate(coords[i][0], coords[i][1], coords[i][2]);
    if (rotationEnabled) {
      currentAngles[i] += speed[i];
    }

    rotateX(currentAngles[i]);
    rotateY(currentAngles[i]);
    //torus(80,15,80,80);
    ellipsoid(size[i] * 10, size[i] * 5, depth[i], 100, 100);
    pop();
  }
}

window.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.code === 'Space') {
    rotationEnabled = !rotationEnabled;
  } /* If user enters R then restart */
  if (e.key === 'r' || e.key === 'R') {
    init();
  }
});

window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
}