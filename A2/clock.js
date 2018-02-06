function setup(){
  createCanvas(400,800);
  frameRate(1);
  noStroke();
}

function draw(){
  background(255);

  var s = second();
  var m = minute();
  var h = hour();

  var boxColor = '#3F51B5';
  if (h > 11) {
    boxColor = '#FF9800';
  }

  if (h === 0 || h === 12) {
    fill(boxColor);
    rect(30, 10, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 10, 55, 55);
  }

  if (h === 1 || h === 13) {
    fill(boxColor);
    rect(30, 70, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 70, 55, 55);
  }

  if (h === 2 || h === 14) {
    fill(boxColor);
    rect(30, 130, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 130, 55, 55);
  }

  if (h === 3 || h === 15) {
    fill(boxColor);
    rect(30, 190, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 190, 55, 55);
  }

  if (h === 4 || h === 16) {
    fill(boxColor);
    rect(30, 250, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 250, 55, 55);
  }

  if (h === 5 || h === 17) {
    fill(boxColor);
    rect(30, 310, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 310, 55, 55);
  }

  if (h === 6 || h === 18) {
    fill(boxColor);
    rect(30, 370, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 370, 55, 55);
  }

  if (h === 7 || h === 19) {
    fill(boxColor);
    rect(30, 430, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 430, 55, 55);
  }

  if (h === 8 || h === 20) {
    fill(boxColor);
    rect(30, 490, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 490, 55, 55);
  }

  if (h === 9 || h === 21) {
    fill(boxColor);
    rect(30, 550, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 550, 55, 55);
  }

  if (h === 10 || h === 22) {
    fill(boxColor);
    rect(30, 610, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 610, 55, 55);
  }

  if (h === 11 || h === 23) {
    fill(boxColor);
    rect(30, 670, map(s, 0, 60, 1, 55), map(m, 0, 60, 1, 55));
  } else {
    fill(200);
    rect(30, 670, 55, 55);
  }
}