var headlines = [];

function preload() {
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "bdb6b971dd7a4faebde6170197f94ca9";
  url += "?api-key=" + apikey;
  nytResponse = loadJSON(url);
}

function setup() {
  createCanvas(1500, 1500);
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
      if (words[j].toLowerCase().indexOf('trump') === -1) {
        fill(255);
      } else {
        fill("yellow");
      }
      text(words[j] +' ', nextX, i*lineheight);
      nextX += textWidth(words[j]+' ');
    }
  }
}

function extractHeadlines() {
  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].abstract; // title, byline, section
    append(headlines, h);
  }
}
