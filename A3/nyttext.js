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
  fill(255);
  text("Topics of Interest", 0, 0);

  var lineheight = 24;
  var margin = 40;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    var nextX = 0;

    for (var j = 0; j < words.length; j++) {
      var firstChar = words[j].charAt(0);
      var lowerWord = words[j].toLowerCase();
      var cleanWord = lowerWord.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
      if (firstChar == firstChar.toUpperCase() && isNaN(lowerWord) && firstChar !== '$') {
        if (!hitwords.includes(cleanWord)) {
          text(cleanWord +' ', nextX, i*lineheight);
          nextX += textWidth(words[j]+' ');
        }
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
