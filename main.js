const colors = ["#EE6B49","#FEDDCF", "#D7E5F4", "#77B5FE", "#0131B4", "#48392A"];
const gridColors = [[]];
let curColorIndex = 0;
let curColor = 0;
let coords = [0,0,0];
let angle = [];
let 

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSL);
  noStroke();
  for (let i = 1; i < 5; i++) {
    let curColorIndex = Math.round(random(0,colors.length-1));
    gridColors[i] = colors[curColorIndex];
    coords[i] = [random(-50,50),random(-50,50),random(-50,50)];
    angle[i] = random(-50,50);
  }
}

function draw() {
background(100);
  orbitControl();
  for (let i = 1; i < 5; i++) { 
      push();
      fill(gridColors[i]);
      //square(100*column, 100*line, 100);
      translate(coords[i][0], coords[i][1], coords[i][2]);
      translate(-0,0);
      //rotateX(frameCount * 0.01+column);
      //rotateY(frameCount * 0.01+line);
      rotateX(frameCount * 0.01+angle[i]);
      rotateY(frameCount * 0.01+angle[i]);
      //cone(30);
      box(40);
      
      pop() ;     
      //rotateY(frameCount * 0.01);
      //translate(-50,-50,0);
  } 
}