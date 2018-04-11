var table;
var aid_amounts;
var years;

function preload(){
  table = loadTable('israel_aid_yearsums.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1750, 1000);
  loadData();
}

function loadData() {
  years = table.getColumn("fiscal_year");
  aid_amounts = table.getColumn("current_amount");
}

function draw(){
  background(251,233,231);
  fill(62,39,35);
  textSize(20);

  // Aid bar graph to Israel
  text("This shows how US aid to Israel changed between 1951 and 2017", 20,20);
  var linewidth = 25;
  var rectwidth = 15;
  textSize(12);

  for (var i = 0; i < aid_amounts.length; i++) {
    fill(13,71,161);
    var rectheight = map(aid_amounts[i], 0, 4790100000, 0, 500);
    rect(i*linewidth, 500, rectwidth, -1*rectheight)

    fill(62,39,35);
    text(years[i], i*linewidth, 510);
  }

  // Pie chart for aid breakdown
  textSize(20);
  text("This was the aid breakdown in 1979", 150,620);
  textSize(12);
  text("Military", 150, 690);
  text("Economic", 450, 850);

  push();
  var data = [790100000, 4000000000]; // 1979 year (economic, military)
  var lastAngle = 0;
  for (var i = 0; i < data.length; i++) {
    if (i === 1) {
      fill(245, 0, 87); // military color
    } else {
      fill(0, 230, 118); // economic color
    }
    var data_angle = map(data[i], 0, 4790100000, 0, 360);
    arc(300, 800, 300, 300, lastAngle, lastAngle+radians(data_angle));
    lastAngle += radians(data_angle);
  }
  pop();

  // Timeline sketch
  text("Arab-Israeli Conflict timeline (hover over event for more info)", 600,620);
  line(600, 800, 1300, 800); // horizontal line

  line(600, 795, 600, 805); // tick
  line(700, 795, 700, 805);
  line(800, 795, 800, 805);

  line(900, 790, 900, 810);
  text("1979", 887, 830); // year label
  fill(13,71,161);
  ellipse(900, 800, 10, 10); // event bubble
  if (mouseInBounds(890, 790, 910, 810)) {
    text("Begin and Sadat sign Egypt-Israel peace treaty at White House.", 800, 780);
  }

  line(1000, 795, 1000, 805);
  line(1100, 795, 1100, 805);
  line(1200, 795, 1200, 805);
  line(1300, 795, 1300, 805);
}

function mouseInBounds(x1, y1, x2, y2) {
  return (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2);
}