var headlines = [];
var hitwords = [
  "and",
  "or",
  "the",
  "on",
  "a",
  "an",
  "in",
  "into",
  "of",
  "for",
  "from",
  "what",
  "at",
  "he",
  "she",
  "how",
  "i",
  "we",
  "while",
  "many",
  "$",
  "but",
  "heres",
  "its",
  "so",
  "there",
  "his",
  "her",
  "like",
  "this",
  "that",
  "more",
  "is",
  "yes",
  "no",
  "thats",
  "why",
  "it",
  "all",
  "here",
  "as",
  "just",
];

function preload() {
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "bdb6b971dd7a4faebde6170197f94ca9";
  url += "?api-key=" + apikey;
  nytResponse = loadJSON(url);
}

function setup() {
  createCanvas(1000, 1500);
  background(0);

  textSize(14);
  textAlign(LEFT);

  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  extractHeadlines();
}

function draw() {
  background(0);
  translate(40, 40);
  var rowLevel = 1.5;

  fill(255, 255, 255, 220);
  textSize(20);
  text("The Important Things: capitalized words from NYT's top story abstracts", 0, 0);

  textSize(14);
  fill(250, 70, 130, 220);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    var nextX = 0;
    hitWordFound = false;

    for (var j = 0; j < words.length; j++) {
      var firstChar = words[j].charAt(0);
      var lowerWord = words[j].toLowerCase();
      var cleanWord = lowerWord.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
      if (firstChar == firstChar.toUpperCase() && isNaN(lowerWord) && firstChar !== '$') {
        if (!hitwords.includes(cleanWord)) {
          text(cleanWord + ' / ', nextX, rowLevel*24);
          nextX += textWidth(cleanWord + ' / ');
          hitWordFound = true;
        }
      }
      if (j === words.length - 1 && hitWordFound) {
        rowLevel++;
      }
    }
  }
}

function extractHeadlines() {
  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].abstract; // title, byline, section
    append(headlines, h);
  }
}
