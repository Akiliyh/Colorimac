const warmSketch = (p) => {
  let parent = document.getElementById('warm-container');
  let container = document.querySelector('.container');

  // we set the canvas size based on the parent's size
  let stylesParent = window.getComputedStyle(parent);

  let paddingLeft = parseFloat(stylesParent.paddingLeft);
  let paddingRight = parseFloat(stylesParent.paddingRight);
  let paddingTop = parseFloat(stylesParent.paddingTop);
  let paddingBottom = parseFloat(stylesParent.paddingBottom);

  // we set the size minus the paddings

  let w = parent.clientWidth - (paddingLeft + paddingRight);
  let h = parent.clientHeight - (paddingTop + paddingBottom) * 2;

  let curColors = [];
  let GRIDCOLORS = [];
  let warmPalette = [];
  let contrast = {};
  let coords = [];
  let angle = [];
  let size = [];
  let depth = [];
  let speed = [];
  const RANGE = 300;
  let rotationEnabled = true;
  let currentAngles = [0, 0, 0];

  function init() {
    // reinit values
    GRIDCOLORS = [];
    coords = [];
    angle = [];
    size = [];
    depth = [];
    speed = [];
    curColors = [];
    contrast = { hue: 25, saturation: 0, lightness: 0 }; // warm contrast values

    container.addEventListener('scroll', p.onScroll);

    // to change palette style change "warmPalette" & "warmColor"
    warmPalette = generatePalette(4, warmColor, contrast);
    for (let i = 0; i < warmPalette.length; i++) {
      curColors.push(p.color(warmPalette[i].hue, warmPalette[i].saturation, warmPalette[i].lightness));
    };

    // on page load we set the UI palette to this palette if it's in view
    if (container.scrollLeft + 1 > parent.offsetLeft && container.scrollLeft < parent.offsetLeft + window.innerWidth) {
      displayColorPalette(warmPalette);
    }

    // for each blob (4) we generate params  a color from the palette we generated

    for (let i = 0; i < 3; i++) {
      // setting color
      let curColorIndex = Math.round(p.random(0, curColors.length - 1));
      GRIDCOLORS[i] = curColors[curColorIndex];
      curColors.splice(curColorIndex, 1);
      //setting params
      coords[i] = [p.random(-RANGE, RANGE), p.random(-RANGE, RANGE), p.random(-RANGE, RANGE)];
      angle[i] = p.random(-RANGE, RANGE);
      size[i] = p.random(30, 50);
      depth[i] = p.map(size[i] * p.saturation(GRIDCOLORS[i]), 0, 500, 0, size[i]);

      let hueValue = p.hue(p.color(GRIDCOLORS[i]));
      // map rotation according to hue value -> warm moves fast and warm moves slow
      // % 360° cause 0° and 360° = same
      let distance = Math.abs((hueValue % 360) - 180);
      distance = Math.min(distance, 360 - distance);
      speed[i] = p.map(distance, 0, 180, 0, 0.01);
      displayColorInfo(warmPalette, i + 1);
    }
  }

  p.setup = function () {
    let canvas = p.createCanvas(w, h, p.WEBGL);
    canvas.id("warm");
    canvas.parent("warm-container");
    p.colorMode(p.HSL);
    p.noStroke();
    init();
  };

  p.draw = function () {
    p.background(curColors[curColors.length - 1]);
    p.orbitControl(0.2, 0.2, 0.2); // reduces the orbit control speed

    for (let i = 0; i < 3; i++) {
      p.push();
      // set params to each color blob
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

  // pause rotation on space enter

  p.keyPressed = function () {
    let container = document.querySelector('.container');
    let paletteContainer = document.getElementById('warm-container');
    /* global pause */
    if (p.key === " ") {
      rotationEnabled = !rotationEnabled;
    }

    // saves gif to render

    // if (p.key === 's' || p.key === 'S') {
    //   p.saveGif('warm', 5);
    // }

    /* only restart when the section is in view */
    if (container.scrollLeft + window.innerWidth > paletteContainer.offsetLeft && container.scrollLeft < paletteContainer.offsetLeft + window.innerWidth) {
      if (p.key === "r" || p.key === "R") {
        init();
      }
    }
  };

  // Detect on scroll if the palette is in view if so change the UI palette

  p.onScroll = function () {
    let paletteContainer = document.getElementById('warm-container');

    if (container.scrollLeft + window.innerWidth / 2 > paletteContainer.offsetLeft && container.scrollLeft < paletteContainer.offsetLeft + window.innerWidth) {
      displayColorPalette(warmPalette);
    }
  }

  // Change canvases size on window resize

  p.windowResized = function () {
    let parent = document.getElementById('warm-container');
    // assigns new values for width and height variables
    // we set the canvas size based on the parent's size
    let stylesParent = window.getComputedStyle(parent);

    let paddingLeft = parseFloat(stylesParent.paddingLeft);
    let paddingRight = parseFloat(stylesParent.paddingRight);
    let paddingTop = parseFloat(stylesParent.paddingTop);
    let paddingBottom = parseFloat(stylesParent.paddingBottom);

    let w = parent.clientWidth - (paddingLeft + paddingRight);
    let h = parent.clientHeight - (paddingTop + paddingBottom) * 2;
    p.resizeCanvas(w, h);
  };
};

// initialize instance

new p5(warmSketch);