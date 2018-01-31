function setup() {
  createCanvas(640, 400);
}

function draw() {
  background('black');
  // rect(10, 0, 60, map(hour(), 0, 23, 0, 400));

  fill(255, 255, 0);
  rect(80, 0, 60, map(minute(), 0, 59, 0, 400));

  fill(255, 255, 255);
  rect(150, 0, 60, map(second(), 0, 59, 0, 400));

  fill(0, 255, 255);
  translate(0, map(hour(), 0, 23, 0, 400));
  ellipse(40, 0, 50, 50);
}