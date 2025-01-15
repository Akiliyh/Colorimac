const acidicSketch = (p) => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  const COLORS = ["#808080", "#00ff11", "#ff0000", "#00f7ff", "#0131B4", "#48392A"];
  let curColors = COLORS;
  let GRIDCOLORS = [];
  let acidicPalette = [];
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
    curColors = [...COLORS];

    // to change palette style change "acidicPalette" & "acidicColor"
    acidicPalette = generatePalette(4, acidicColor);
    curColors = [...acidicPalette];
    console.log(acidicPalette);

    for (let i = 0; i < 3; i++) {
      let curColorIndex = Math.round(p.random(0, curColors.length - 1));
      GRIDCOLORS[i] = curColors[curColorIndex];
      curColors.splice(curColorIndex, 1);

      coords[i] = [p.random(-RANGE, RANGE), p.random(-RANGE, RANGE), p.random(-RANGE, RANGE)];
      angle[i] = p.random(-RANGE, RANGE);
      size[i] = p.random(20, 50);
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
    canvas.id("acid");
    canvas.parent("acid-container");
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
    if (p.key === " ") {
      rotationEnabled = !rotationEnabled;
      /* If user enters R then restart */
    } else if (p.key === "r" || p.key === "R") {
      init();
    }
  };

  p.windowResized = function () {
    // assigns new values for width and height variables
    w = window.innerWidth;
    h = window.innerHeight;
    p.resizeCanvas(w, h);
  };
};

new p5(acidicSketch);