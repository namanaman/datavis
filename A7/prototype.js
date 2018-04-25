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
}

function setup() {
  createCanvas(2150, 1000);
  loadData();
}

function loadData() {
  general_timeline_years = general_timeline_data.getColumn("Date");
  general_timeline_events = general_timeline_data.getColumn("Description");

  israel_aid_years = israel_aid_data.getColumn("fiscal_year");
  israel_aid_categories = israel_aid_data.getColumn("category");
  israel_aid_amounts = israel_aid_data.getColumn("current_amount");
}

function draw(){
  background(255, 255, 255);

  // adds israel aid points
  fill(68,138,255);
  var prev_x = 0;
  var prev_y = 0;
  for (var i = 0; i < israel_aid_years.length; i++) {
    if (israel_aid_categories[i] === "Total") {
      var current_x = map(israel_aid_years[i], 1915, 2015, 75, 2075);
      var current_y = 500 - map(israel_aid_amounts[i], 0, 4790100000, 0, 300);
      push();
      noStroke();
      ellipse(current_x, current_y, 5, 5);
      if (prev_x > 0 && prev_y > 0) {
        noStroke();
        line(prev_x, prev_y, current_x, current_y);
        quad(prev_x, 500, prev_x, prev_y, current_x, current_y, current_x, 500);
      }
      pop();
      prev_x = current_x;
      prev_y = current_y;
    }
    // if (israel_aid_categories[i] === "Economic") {
    //   var current_x = map(israel_aid_years[i], 1915, 2015, 75, 2075);
    //   var current_y = 500 - map(israel_aid_amounts[i], 0, 4790100000, 0, 300); // change max
    //   ellipse(current_x, current_y, 5, 5);
    //   if (prev_x > 0 && prev_y > 0) {
    //     line(prev_x, prev_y, current_x, current_y);
    //   }
    //   prev_x = current_x;
    //   prev_y = current_y;
    // }
    // if (israel_aid_categories[i] === "Military") {
    //   var current_x = map(israel_aid_years[i], 1915, 2015, 75, 2075);
    //   var current_y = 500 - map(israel_aid_amounts[i], 0, 4790100000, 0, 300); // change max
    //   ellipse(current_x, current_y, 5, 5);
    //   if (prev_x > 0 && prev_y > 0) {
    //     line(prev_x, prev_y, current_x, current_y);
    //   }
    //   prev_x = current_x;
    //   prev_y = current_y;
    // }   
  }
  
  fill(0, 102, 153);
  textSize(25);
  text("A history of U.S. involvement in the Arab-Israeli conflict", 20,20);

  line(75, 500, 2075, 500); // horizontal line for timeline axis
  line(75, 200, 75, 800); // vertical line for aid axis

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
  fill(233,30,99);
  for (var i = 0; i < general_timeline_years.length; i++) {
    var x_loc = map(general_timeline_years[i], 1915, 2015, 75, 2075);
    ellipse(x_loc, 500, 17, 17);

    if (mouseInBounds(x_loc-12, 492, x_loc+10, 508)) {
      textSize(15);
      textStyle(BOLD);
      text("What happened in " + Math.round(general_timeline_years[i]) + ":", 20, 60); 

      textStyle(NORMAL);
      textSize(12);
      text(general_timeline_events[i], 20, 65, 400, 160);
    }
  }
}

function mouseInBounds(x1, y1, x2, y2) {
  return (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2);
}