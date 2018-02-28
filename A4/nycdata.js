var table;
var leadingCauses;
var deathRates;

function preload(){
  table = loadTable('2014_data_pivot.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1000, 1000);
  loadData();
  noLoop();
}

function loadData() {
  leadingCauses = table.getColumn("Leading Cause");
  deathRates = table.getColumn("Average");
  console.log(leadingCauses);
  console.log(deathRates);
}

function draw(){
  background(100, 100, 100, 200);
  fill(255, 255, 255);
  textSize(20);
  text("In 2014, these were the leading causes of death, compared by their age-adjusted rate...", 20,20);
  var lineheight = 25;
  var rectheight = 15;
  textSize(12);

  for (var i = 0; i < deathRates.length; i++) {
    fill(190, 30, 70);
    var rectwidth = map(deathRates[i], 0, 163.75, 0, 1000);
    rect(0, (i+2)*lineheight, rectwidth, -1*rectheight)

    fill(255, 255, 255);
    text(leadingCauses[i], 0, (i+2)*lineheight);
  }
}