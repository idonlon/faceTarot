//var c;
var capture;
var tracker
var w = 320, h = 240;
var smile;
reading = [];

var shuffleRandom;
var clearAll;

function setup() {
  c = createCanvas(w,h);
  background(0);
  c.position(0,0);
  c.style("margin-left", "60%");


  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.parent('video');
  // capture.position(250,0);
  capture.style("margin-left", "20%");
  //capture.hide();
  
  colorMode(HSB);
  
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);

  shuffleRandom = select('#goForIt');
  //when this button is pressed, i want to generate a pair of cards, meaning their name and interpretation
  shuffleRandom.mousePressed(randomSet);

  clearAll = select('#clear');
  clearAll.mousePressed(refresh);
}

function randomSet() {
  loadJSON('tarot.json', gotTarot);
  image(capture, 0, 0, w, h);

  // capture.parent('video');
}

function gotTarot(data) {
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(255);

  // noStroke();
  // for (var i=0; i<positions.length; i++) {
    //fill(map(i, 0, positions.length, 0, 360), 50, 100);
  // }

//determines facial expression / smile value
if(positions.length > 0) {
  var mouthLeft = createVector(positions[44][0], positions[44][1]);
  var mouthRight = createVector(positions[50][0], positions[50][1]);
  smile = mouthLeft.dist(mouthRight);
  console.log(smile);

  noFill();
  stroke(255);
  beginShape();
  
  for (var i=0; i<positions.length; i++) {
    stroke(map(i, 0, positions.length, 0, 360), 50, 100);
    vertex(positions[i][0], positions[i][1]);
  }

  endShape();

  for (var i = 0; i <1; i++) {

    var interpretations = data.tarot_interpretations[i].fortune_telling;
    var index = floor(random(data.tarot_interpretations.length));
    var names = data.tarot_interpretations[index].name;
    var all = data.tarot_interpretations[index].fortune_telling;
    var face = data.tarot_interpretations[index].image;

    for (var re = 0; re < reading.length; re++) {
      reading[re].remove();
    }


        //Controls the Tarot cards that are returned based on expression
        if (smile > 20 && smile < 40) {
          for (var j = 0; j <= 3; j++) {
            index = floor(random(j));
            var names = data.tarot_interpretations[index].name;
            var interpretations = data.tarot_interpretations[index].fortune_telling;

          }
        }

        if (smile > 60) {
          for (var c = 0; c <= 10; c++) {
            index = floor(random(c));
            var names = data.tarot_interpretations[index].name;
            var interpretations = data.tarot_interpretations[index].fortune_telling;

          }
        }
        reading = createP(names);
        meaning = createP(interpretations);

        reading.parent('#card1');
        reading.style("padding", "10px");
        reading.style("margin-left", "50%");

        meaning.parent('#card1');        
        meaning.style("margin-right", "20%");
        meaning.style("margin-left", "20%");



      }

    }

  }

  function refresh() {
    reading.remove();
    meaning.remove();
  }
