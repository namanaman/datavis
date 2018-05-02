// Data tables
var general_timeline_data;
var usa_timeline_data;
var israel_aid_data;
var palestine_aid_data;

// For general conflict timeline
var general_timeline_years;
var general_timeline_events;

// For USA involvement timeline
var usa_timeline_years;
var usa_timeline_events;

// For US aid given to Israel
var israel_aid_years;
var israel_aid_categories;
var israel_aid_amounts;

// For US aid given to Palestine
var palestine_aid_years;
var palestine_aid_categories;
var palestine_aid_amounts;

function preload(){
  general_timeline_data = loadTable('general_timeline.csv', 'csv', 'header');
  israel_aid_data = loadTable('israel_aid.csv', 'csv', 'header');
  palestine_aid_data = loadTable('palestine_aid.csv', 'csv', 'header');
  usa_timeline_data = loadTable('usa_timeline.csv', 'csv', 'header');
}

function setup() {
  createCanvas(2300, 1000);
  loadData();
}

function loadData() {
  general_timeline_years = general_timeline_data.getColumn("Date");
  general_timeline_events = general_timeline_data.getColumn("Description");

  israel_aid_years = israel_aid_data.getColumn("fiscal_year");
  israel_aid_categories = israel_aid_data.getColumn("category");
  israel_aid_amounts = israel_aid_data.getColumn("current_amount");

  palestine_aid_years = palestine_aid_data.getColumn("fiscal_year");
  palestine_aid_categories = palestine_aid_data.getColumn("category");
  palestine_aid_amounts = palestine_aid_data.getColumn("current_amount");

  usa_timeline_years = usa_timeline_data.getColumn("Date");
  usa_timeline_events = usa_timeline_data.getColumn("Description");
}

function draw(){
  background(255, 255, 255);

  // adds israel aid points
  var prev_x_econ = 0;
  var prev_y_econ = 0;
  var prev_x_milit = 0;
  var prev_y_milit = 0;
  var prev_prev_y_econ = 0;
  for (var i = 0; i < israel_aid_years.length; i++) {
    if (israel_aid_categories[i] === "Economic") {
      var current_x = map(israel_aid_years[i], 1915, 2015, 75, 2075);
      var current_y = 500 - map(israel_aid_amounts[i], 0, 4790100000, 0, 300);
      push();
      noStroke();
      fill(205,220,57); // economic color - green
      if (prev_x_econ > 0 && prev_y_econ > 0) {
        noStroke();
        line(prev_x_econ, prev_y_econ, current_x, current_y);
        quad(prev_x_econ, 500, prev_x_econ, prev_y_econ, current_x, current_y, current_x, 500);
      }
      pop();
      prev_x_econ = current_x;
      prev_prev_y_econ = prev_y_econ;
      prev_y_econ = current_y;
    }
    if (israel_aid_categories[i] === "Total") { // Not stacking when military is 0
      var current_x = map(israel_aid_years[i], 1915, 2015, 75, 2075);
      var current_y = 500 - map(israel_aid_amounts[i], 0, 4790100000, 0, 300);
      push();
      noStroke();
      fill(244,67,54); // military color - red
      if (prev_x_milit > 0 && prev_y_milit > 0) {
        noStroke();
        line(prev_x_milit, prev_y_milit, current_x, current_y);
        quad(prev_x_milit, prev_y_milit, current_x, current_y, current_x, prev_y_econ, prev_x_milit, prev_prev_y_econ);
      }
      fill(49,27,146);
      ellipse(current_x, current_y, 7, 7);
      if (mouseInBounds(current_x-4, current_y-4, current_x+4, current_y+4)) {
        stroke(49,27,146);
        line(current_x, current_y, current_x-80, 588);
        noStroke();
        rect(current_x-82, 583, 7, 7);
        text("Total aid given in " + israel_aid_years[i] + ": $" + israel_aid_amounts[i], current_x-70, 590);
      }
      pop();
      prev_x_milit = current_x;
      prev_y_milit = current_y;
    }
  }

  // adds palestine aid points
  prev_x_econ = 0;
  prev_y_econ = 0;
  prev_x_milit = 0;
  prev_y_milit = 0;
  prev_prev_y_econ = 0;
  for (var i = 0; i < palestine_aid_years.length; i++) {
    if (palestine_aid_categories[i] === "Economic") {
      fill(205,220,57); // economic color - green
      var current_x = map(palestine_aid_years[i], 1915, 2015, 75, 2075);
      var current_y = 500 + map(palestine_aid_amounts[i], 0, 4790100000, 0, 300);
      push();
      noStroke();
      if (prev_x_econ > 0 && prev_y_econ > 0) {
        noStroke();
        line(prev_x_econ, prev_y_econ, current_x, current_y);
        quad(prev_x_econ, 500, prev_x_econ, prev_y_econ, current_x, current_y, current_x, 500);
      }
      fill(49,27,146);
      ellipse(current_x, current_y, 7, 7);
      pop();
      prev_x_econ = current_x;
      prev_prev_y_econ = prev_y_econ;
      prev_y_econ = current_y;
    }
    if (palestine_aid_categories[i] === "Total" && i > 69) { // Not stacking when military is 0
      fill(244,67,54); // military color - red
      var current_x = map(palestine_aid_years[i], 1915, 2015, 75, 2075);
      var current_y = 500 + map(palestine_aid_amounts[i], 0, 4790100000, 0, 300);
      push();
      noStroke();
      if (prev_x_milit > 0 && prev_y_milit > 0) {
        noStroke();
        line(prev_x_milit, prev_y_milit, current_x, current_y);
        quad(prev_x_milit, prev_y_milit, current_x, current_y, current_x, prev_y_econ, prev_x_milit, prev_prev_y_econ);
      }
      fill(49,27,146);
      ellipse(current_x, current_y, 7, 7);
      pop();
      prev_x_milit = current_x;
      prev_y_milit = current_y;
    }
  }
  
  fill(49,27,146);
  textSize(25);
  text("A history of U.S. involvement in the Arab-Israeli conflict", 20, 30);

  push();
  noStroke();

  ellipse(700, 11, 20, 20);
  textSize(13);
  text("Historical event", 660, 36);

  fill(33,150,243);
  ellipse(810, 11, 13, 13);
  text("U.S. involvement", 760, 36);

  fill(205,220,57);
  rect(895, 0, 20, 20);
  text("Economic aid", 870, 36);

  fill(244,67,54);
  rect(980, 0, 20, 20);
  text("Military aid", 960, 36);

  pop();

  line(75, 500, 2075, 500); // horizontal line for timeline axis
  line(75, 200, 75, 800); // vertical line for aid axis

  // extra lines
  push();
  stroke(189,189,189);
  line(2075, 200, 2075, 800);
  line(75, 200, 2075, 200);
  line(75, 800, 2075, 800);
  pop();

  // adds ticks, year labels to timeline
  textSize(12);
  var year = 1920;
  var x_pos = 175;
  for (var i = 0; i < 20; i++) {
    line(x_pos, 495, x_pos, 505);
    text(year, x_pos-13, 530);
    year = year + 5;
    x_pos = x_pos + 100;
  }

  // adds event bubbles, descriptions on hover
  for (var i = 0; i < general_timeline_years.length; i++) {
    var x_loc = map(general_timeline_years[i], 1915, 2015, 75, 2075);
    ellipse(x_loc, 500, 20, 20);

    if (mouseInBounds(x_loc-11, 489, x_loc+11, 511)) {
      textSize(15);
      textStyle(BOLD);
      text("What happened in " + Math.round(general_timeline_years[i]) + ":", x_loc-80, 60); 

      textStyle(NORMAL);
      textSize(12);
      text(general_timeline_events[i], x_loc-80, 65, 350, 100);
    }
  }

  // adds event bubbles, descriptions on hover
  fill(33,150,243);
  for (var i = 0; i < usa_timeline_years.length; i++) {
    var x_loc = map(usa_timeline_years[i], 1915, 2015, 75, 2075);
    ellipse(x_loc, 500, 13, 13);

    if (mouseInBounds(x_loc-8, 492, x_loc+8, 508)) {
      textSize(15);
      textStyle(BOLD);
      text("U.S. involvement in " + Math.round(usa_timeline_years[i]) + ":", x_loc-80, 170); 

      textStyle(NORMAL);
      textSize(12);
      text(usa_timeline_events[i], x_loc-80, 176, 350, 100);
    }
  }

  fill(49,27,146);
  textStyle(BOLD);
  text("Sources", 20, 900);
  textStyle(NORMAL);
  text("The general timeline events taken from the following article by The Guardian: https://www.theguardian.com/world/gallery/2009/aug/17/israel-middleeast", 20, 920);
  text("The U.S. involvement timeline events taken from the following article by Reuters: https://www.reuters.com/article/us-palestinians-israel-usa-timeline/timeline-u-s-israeli-relations-since-1948-idUSTRE62E45Z20100315", 20, 940);
  text("Aid data on Palestine and Israel taken from the Foreign Aid Explorer powered by USAID Economic Analysis and Data Services.", 20, 960);

  text("$0", 50, 505);
  text("$4.8b", 40, 200);
  text("$4.8b", 40, 805);
  push();
  textSize(17);
  rotate(HALF_PI);
  text("U.S. aid to Israel", 250, -45);
  text("U.S. aid to Palestine", 520, -45);
  pop();
}

function mouseInBounds(x1, y1, x2, y2) {
  return (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2);
}