var table;
var tableEthnicity;
var leadingCauses;
var deathRates;
var ethnicityTable;

var state = 0; 
var button;
var buttonText = "Explore by ethnicity";

function preload(){
  table = loadTable('2014_data_pivot.csv', 'csv', 'header');
  tableEthnicity = loadTable('2014_data_ethnicity.csv', 'csv', 'header');
}

function setup() {
  button = createButton(buttonText);
  button.mousePressed(toggleState);
  button.position(820, 15);

  createCanvas(1000, 700);
  loadData();

  textSize(18);
  noStroke();
}

function loadData() {
  leadingCauses = table.getColumn("Leading Cause");
  deathRates = table.getColumn("Average");
  ethnicityTable = tableEthnicity.getArray();
}

function draw(){
  background(160, 160, 160, 200);
  if (state === 0) {
    fill(255, 255, 255);
    textSize(20);
    text("In 2014, these were the leading causes of death, compared by average death rate...", 20,20);
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
  else {
    fill(255, 255, 255);
    textSize(20);
    text("In 2014, these were the leading causes of death, compared by ethnicity...", 20,20);
    var startX = 90;
    var startY = 50;
    var yCounter = 0;
    var xCounter = 0;

    for (var i = 0; i < ethnicityTable.length; i++) {
      if (ethnicityTable[i][2] === "none") {
        fill(255, 255, 255);
      }
      else if (ethnicityTable[i][2] === "top10") {
        fill(210, 80, 150);
      }
      else if (ethnicityTable[i][2] === "top3") {
        fill(190, 30, 70);
      }
      if (i % 16 === 0) {
        yCounter++;
        xCounter = 0;
      }
      rect(startX+45*xCounter, startY+45*yCounter, 40, 40);
      xCounter++;
    }
    fill(255, 255, 255);
    text("Asian",25,120);
    text("Black",25,165);
    text("White",25,210);
    text("Hispanic",5,255);

    rotate(PI / 2.0);
    for (var i = 0; i < leadingCauses.length; i++) {
      text(leadingCauses[i], 280, -100-(i*45));
    }
  }
}

function toggleState() {
  state = (state == 0) ? 1 : 0;
  button.elt.textContent = (state == 0) ? "Explore by ethnicity" : "Explore by death rate";
}