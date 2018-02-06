function setup(){
  createCanvas(400,800);
  frameRate(1);
  noStroke();
}

function draw(){
  background(255);
  stroke(0);

  var s = second();
  var m = minute();
  var h = hour();

  push();
  fill(0, 255, 255);
  line(30, 20, 300, 20);
  translate(map(s, 0, 59, 0, 270), 0);
  ellipse(30, 20, 10, 10);
  pop();

  push();
  fill(255, 0, 255);
  line(30, 60, 300, 60);
  translate(map(m, 0, 59, 0, 270), 0);
  ellipse(30, 60, 10, 10);
  pop();

  push();
  fill(255, 255, 0);
  line(30, 100, 300, 100);
  translate(map(h, 0, 23, 0, 270), 0);
  ellipse(30, 100, 10, 10);
  pop();
}