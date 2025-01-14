const colors = ["#EE6B49","#FEDDCF", "#D7E5F4", "#77B5FE", "#0131B4", "#48392A"];
const gridColors = [[]];
let curColorIndex = 0;
let curColor = 0;
let coords = [0,0,0];
let angle = [];
let size = [];
let speed = [];

function setup() {
  let cnv = createCanvas(800, 800, WEBGL);
  colorMode(HSL);
  noStroke();
  for (let i = 1; i < 5; i++) {
    let curColorIndex = Math.round(random(0,colors.length-1));
    gridColors[i] = colors[curColorIndex];
    coords[i] = [random(-50,50),random(-50,50),random(-50,50)];
    angle[i] = random(-50,50);
    size[i] = random(20,50);
    speed[i] = random(0, 0.01);
  }
    setTimeout(() => {
    save(cnv, 'myCanvas.png');
    }, 1000);
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
      rotateX(frameCount * speed[i]+angle[i]);
      rotateY(frameCount * speed[i]+angle[i]);
      //cone(30);
      plane(size[i]);
      pop();     
      //rotateY(frameCount * 0.01);
      //translate(-50,-50,0);
  } 
}