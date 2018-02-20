var headlines = [];
var topics = [];
var chosen_headlines = [];
var hitwords = [
  "AND",
  "OR",
  "THE",
  "ON",
  "A",
  "AN",
  "IN",
  "INTO",
  "OF",
  "FOR",
  "FROM",
  "WHAT",
  "AT",
  "HE",
  "SHE",
  "HOW",
  "I",
  "WE",
  "WHILE",
  "MANY",
  "BUT",
  "HERES",
  "ITS",
  "SO",
  "THERE",
  "HIS",
  "HER",
  "LIKE",
  "THIS",
  "THAT",
  "MORE",
  "IS",
  "YES",
  "NO",
  "THATS",
  "WHY",
  "IT",
  "ALL",
  "HERE",
  "AS",
  "JUST",
  "IF",
  "THEN",
  "NOW",
  "THEYRE",
  "THEY",
  "A",
  "WHEN",
  "THOSE",
  "YOUR",
  "YOU",
  "WITH",
  "TO",
];
var maxHeadLen, minHeadLen;

function preload() {
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "bdb6b971dd7a4faebde6170197f94ca9";
  url += "?api-key=" + apikey;
  nytResponse = loadJSON(url);
}

function setup() {
  createCanvas(1000, 1500);
  background(0);
  frameRate(30);
  textAlign(LEFT);

  extractHeadlines();
}

function draw() {
  background(0);

  var lineheight = 24;
  var margin = 40;
  var rowLevel = 2;

  translate(margin, margin);

  // Title text
  textSize(20);
  fill(255, 255, 255, 220);
  text("The Important Things: capitalized words from NYT's top story abstracts", 0, 0);

  // Content text
  textSize(14);
  fill(250, 70, 130, 220);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    var nextX = 0;
    hitWordFound = false;

    for (var j = 0; j < words.length; j++) {
      var firstChar = words[j].charAt(0);
      var upperWord = words[j].toUpperCase();
      var cleanWord = upperWord.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
      if (firstChar == firstChar.toUpperCase() && isNaN(cleanWord) && firstChar !== '$') {
        if (!hitwords.includes(cleanWord)) {
          text(cleanWord + ' / ', nextX, rowLevel*lineheight);
          nextX += textWidth(cleanWord + ' / ');
          hitWordFound = true;
        }
      }
      if (j === words.length - 1 && hitWordFound) {
        rowLevel++;
        append(chosen_headlines, [headlines[i], topics[i]]);
      }
    }
  }

  for (var i = 0; i < (rowLevel-2); i++) {
    if (mouseX > margin && mouseX < margin+600 && mouseY < margin+(i+2)*lineheight && mouseY > margin+(i+2)*lineheight+(-1*lineheight)) {
      fill(50, 50, 50, 250);
      rect(mouseX, mouseY, 400, 50);
      fill(255);
      textSize(10);
      text("HEADLINE: " + chosen_headlines[i][0] + " // RELEVANT TOPICS: " + chosen_headlines[i][1], mouseX+10, mouseY+10, 400-20, 200-20); // 10px label padding
    }
  }
}

function extractHeadlines() {
  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].abstract;
    var t = nytResponse.results[i].des_facet.join(', ');
    append(headlines, h);
    append(topics, t);
  }
}
