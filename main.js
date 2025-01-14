var w = window.innerWidth;
var h = window.innerHeight;  
const COLORS = ["#EE6B49","#FEDDCF", "#D7E5F4", "#77B5FE", "#0131B4", "#48392A"];
const GRIDCOLORS = [[]];
let curColorIndex = 0;
let curColor = 0;
let coords = [0,0,0];
let angle = [];
let size = [];
let speed = [];
let canvas = 0;
const RANGE = 200;

function setup() {
  canvas = createCanvas(w, h, WEBGL);
  colorMode(HSL);
  noStroke();
  for (let i = 1; i < 4; i++) {
    let curColorIndex = Math.round(random(0,COLORS.length-1));
    GRIDCOLORS[i] = COLORS[curColorIndex];
    COLORS.splice(curColorIndex, 1);
    coords[i] = [random(-RANGE,RANGE),random(-RANGE,RANGE),random(-RANGE,RANGE)];
    angle[i] = random(-RANGE,RANGE);
    size[i] = random(20,50);
    speed[i] = random(0, 0.01);
  }
}

function draw() {
background(COLORS[COLORS.length-1]);
  orbitControl(.2,.2,.2);
  for (let i = 1; i < 4; i++) { 
      push();
      fill(GRIDCOLORS[i]);
      //square(100*column, 100*line, 100);
      translate(coords[i][0], coords[i][1], coords[i][2]);
      translate(-0,0);
      //rotateX(frameCount * 0.01+column);
      //rotateY(frameCount * 0.01+line);
      rotateX(frameCount * speed[i]+angle[i]);
      rotateY(frameCount * speed[i]+angle[i]);
      //torus(80,15,80,80);
      ellipsoid(size[i]*5, 200, 60, 100, 100);
      pop();     
      //rotateY(frameCount * 0.01);
      //translate(-50,-50,0);
  } 
}

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;  
  canvas.size(w,h);
}