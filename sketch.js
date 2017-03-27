// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var capture;
var tracker
var w = 640, h = 480;

var shuffleRandom;

function setup() {
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
  
  colorMode(HSB);
  
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);

  shuffleRandom = select('#goForIt');
  //when this button is pressed, i want to generate a pair of cards, meaning their name and interpretation
  shuffleRandom.mousePressed(randomSet);
}

function draw() {
  image(capture, 0, 0, w, h);
}

function randomSet() {
  loadJSON('tarot.json', gotTarot);   
}

function gotTarot(data) {
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(255);

  noStroke();
  for (var i=0; i<positions.length; i++) {
    fill(map(i, 0, positions.length, 0, 360), 50, 100);
  }

//determines facial expression / smile value
if(positions.length > 0) {
  var mouthLeft = createVector(positions[44][0], positions[44][1]);
  var mouthRight = createVector(positions[50][0], positions[50][1]);
  var smile = mouthLeft.dist(mouthRight);
  rect(20, 20, smile * 3, 20);
  console.log(smile);

  for (var i = 0; i <1; i++) {

    var interpretations = data.tarot_interpretations[i].fortune_telling;
    var index = floor(random(data.tarot_interpretations.length));
    var names = data.tarot_interpretations[index].name;
    var all = data.tarot_interpretations[index].fortune_telling;
    var face = data.tarot_interpretations[index].image;

//Controls the Tarot cards that are returned based on expression
    if (smile > 20) {
      for (var j = 0; j <= 3; j++) {
        index = floor(random(j));
        var names = data.tarot_interpretations[index].name;
      }

    }
    reading = createP(names);
    reading.parent('card1');

  }
}
}
