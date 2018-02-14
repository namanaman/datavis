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
  translate(40, 40);

  textSize(20);
  fill(255);
  text("Political Colors: highlighting U.S. politics keywords in NYT's top story abstracts", 0, 0);

  textSize(14);
  text("(Trump administration in yellow, Republicans in red, Democrats in blue)", 0, 24);

  fill(230, 230, 230, 240);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    var nextX = 0;

    for (var j = 0; j < words.length; j++) {
      if (words[j].toLowerCase().indexOf('trump') !== -1 ||
        (words[j].toLowerCase().indexOf('house') !== -1 && words[j-1].toLowerCase() === 'white')) {
        fill(255, 235, 39, 240);
      } else if (words[j].toLowerCase().indexOf('g.o.p.') !== -1 ||
        words[j].toLowerCase().indexOf('republican') !== -1) {
        fill(255, 82, 82, 240);
      } else if (words[j].toLowerCase().indexOf('democrat') !== -1) {
        fill(130, 177, 255, 240);
      } else {
        fill(230, 230, 230, 240);
      }
      text(words[j] +' ', nextX, (i+2.5)*24);
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
