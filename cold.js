const coldSketch = (p) => {
  let parent = document.getElementById('cold-container');
  let container = document.querySelector('.container');
  let stylesParent = window.getComputedStyle(parent);
  let padding = parseFloat(stylesParent.padding);
  let w = parent.clientWidth - padding*2;
  let h = parent.clientHeight - padding*2;
  let curColors = [];
  let GRIDCOLORS = [];
  let coldPalette = [];
  let coords = [];
  let angle = [];
  let size = [];
  let depth = [];
  let speed = [];
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
    curColors = [];

    container.addEventListener('scroll', p.onScroll);

    // to change palette style change "coldPalette" & "coldColor"
    coldPalette = generatePalette(4, coldColor, 25);
    // curColors = [...coldPalette];

    for (let i = 0; i < coldPalette.length; i++) {
      curColors.push(p.color(coldPalette[i].hue, coldPalette[i].saturation, coldPalette[i].lightness));
    };

    console.log(coldPalette);
    if (container.scrollLeft+1 > parent.offsetLeft && container.scrollLeft < parent.offsetLeft + window.innerWidth) {
      displayColorPalette(coldPalette);
    }

    for (let i = 0; i < 3; i++) {
      let curColorIndex = Math.round(p.random(0, curColors.length - 1));
      GRIDCOLORS[i] = curColors[curColorIndex];
      curColors.splice(curColorIndex, 1);

      coords[i] = [p.random(-RANGE, RANGE), p.random(-RANGE, RANGE), p.random(-RANGE, RANGE)];
      angle[i] = p.random(-RANGE, RANGE);
      size[i] = p.random(30, 50);
      depth[i] = p.map(size[i] * p.saturation(GRIDCOLORS[i]), 0, 500, 0, size[i]);

      let hueValue = p.hue(p.color(GRIDCOLORS[i]));
      // map rotation according to hue value -> warm moves fast and cold moves slow
      // % 360 cause 0 and 360 = same
      let distance = Math.abs((hueValue % 360) - 180);
      distance = Math.min(distance, 360 - distance);
      speed[i] = p.map(distance, 0, 180, 0, 0.01);
      displayColorInfo(GRIDCOLORS[i], i + 1);
    }
  }

  p.setup = function () {
    let canvas = p.createCanvas(w, h, p.WEBGL);
    canvas.id("cold");
    canvas.parent("cold-container");
    p.colorMode(p.HSL);
    p.noStroke();
    init();
  };

  p.draw = function () {
    p.background(curColors[curColors.length - 1]);
    p.orbitControl(0.2, 0.2, 0.2);

    for (let i = 0; i < 3; i++) {
      p.push();
      p.fill(GRIDCOLORS[i]);
      p.translate(coords[i][0], coords[i][1], coords[i][2]);
      if (rotationEnabled) {
        currentAngles[i] += speed[i];
      }

      p.rotateX(currentAngles[i]);
      p.rotateY(currentAngles[i]);
      //p.torus(80,15,80,80);
      p.ellipsoid(size[i] * 10, size[i] * 5, depth[i], 100, 100);
      p.pop();
    }
  };

  p.keyPressed = function () {
    let container = document.querySelector('.container');
    let paletteContainer = document.getElementById('cold-container');
    /* global pause */
    if (p.key === " ") {
      rotationEnabled = !rotationEnabled;
    }
    /* only restart when in focus */
    if (container.scrollLeft + window.innerWidth > paletteContainer.offsetLeft && container.scrollLeft < paletteContainer.offsetLeft + window.innerWidth) {
      if (p.key === "r" || p.key === "R") {
        init();
      }
    }
  };

  p.onScroll = function () {
    let paletteContainer = document.getElementById('cold-container');
    
    if (container.scrollLeft+1 > paletteContainer.offsetLeft && container.scrollLeft < paletteContainer.offsetLeft + window.innerWidth) {
      displayColorPalette(coldPalette);
    }
  }

  p.windowResized = function () {
    let parent = document.getElementById('cold-container');
    // assigns new values for width and height variables
    console.log(parent);
    w = parent.clientWidth - padding*2;
    h = parent.clientHeight - padding*2;
    p.resizeCanvas(w, h);
  };
};

new p5(coldSketch);