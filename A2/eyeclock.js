function setup(){
  createCanvas(800,800);
  frameRate(1);
  noStroke();
}

function draw(){
  background(255);

  var s = second();
  var m = minute();
  var h = hour();

  fill(230);
  ellipse(300, 150, 360, 160);

  push();
  fill(100);
  arc(300, 150, 150, 150, 0, map(h, 0, 23, 0, 2 * PI), PIE);
  pop();

  push();
  fill(0);
  arc(300, 150, 80, 80, 0, map(m, 0, 59, 0, 2 * PI), PIE);
  pop();

  push();
  fill(0, 255, 255, 200);
  arc(300, 150, 40, 40, 0, map(s, 0, 59, 0, 2 * PI), PIE);
  pop();
}