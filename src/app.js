/**
 *Bitcamp 2015
 *By: Dan Harel, Marlena Lui, Angela Bair, Adam Liang
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Light = require('ui/light');
var Settings = require('settings');

Light.on();

var NUM_GROUNDS = 15;
var HIGH_SCORE_KEY = 'high_score';

var score;
var scoreBox;
var window;
var background;
var botSpikes;
var Lucas;
var grounds;
var lost;

init();

function init() {
  lost = false;
  
  score = 0;
  window = new UI.Window();
  
  scoreBox = new UI.Text({
    position: new Vector2(0,0),
    size: new Vector2(144,168),
    font: 'gothic-8-bold',
    text: score
  });
  window.add(scoreBox);
  
  background = new UI.Image({
    position: new Vector2(0,68),
    size: new Vector2(144, 168),
    image: 'images/bkg.png'
  });
  window.add(background);

  botSpikes = new UI.Image({
      position: new Vector2(200, 100),
      size: new Vector2(20,40),
      image: 'images/bot2.png'
  });
  window.add(botSpikes);

  Lucas = new UI.Image({
      position: new Vector2(30,100),
      size: new Vector2(20,40),
      image: 'images/Lucas.png'
  });
  window.add(Lucas);

  grounds = [];
  for (var i = 0; i < NUM_GROUNDS; i++) {
    addGround();
  }
  
  window.show();

  //jumping up
  window.on('click', 'up', function() {
    var pos = Lucas.position();
    pos.y -= 50;
  
    var pos2 = Lucas.position();
    pos2.y += 50; 
  
    //testRect.animate('position', pos, 1000);
  
    Lucas.animate('position', new Vector2(30,15), 500).queue(function(next){
      Lucas.animate('position', new Vector2 (30,100), 500);
      next();
    }); 
  });

  //ducking
  window.on('click', 'down', function() {
    var pos = new Vector2(55, 120);
    var size  = new Vector2(20, 20);

    Lucas.animate({'position': pos, 'size': size}, 100).queue(function(next){
      Lucas.animate({'position':new Vector2(30, 100), 'size':new Vector2(20, 40)}, 100);
      next();
    });
  });
}

//moving spike
var spikeInterval = setInterval(function() {
  if (botSpikes.position().x < -1* botSpikes.size().x)
    botSpikes.animate('position', new Vector2(botSpikes.position().x+200, botSpikes.position().y), 1);
  else
    botSpikes.animate('position', new Vector2(botSpikes.position().x-20, botSpikes.position().y), 1);
  if (collision() && !lost) {
    lose();
  }
}, 1000/3);

//moving ground
var groundInterval = setInterval(function() {
  for (var i = 0; i < grounds.length; i++) {
    var curr = grounds[i];
    var x = curr.position().x;
    var y = curr.position().y;
    curr.animate('position', new Vector2(x - 20, y), 1);
    if (curr.position().x < -1*curr.size().x) {
      removeFirstGround();
    }
    while (grounds.length < NUM_GROUNDS)
        addGround();
  }
}, 1000/3);

var scoreInterval = setInterval(function() {
  score+=1;
  scoreBox.text = score;
}, 10);

//helper function for moving ground
function removeFirstGround() {
  grounds[0].remove();
  grounds.splice(0,1);
}

//helper function for moving ground
function addGround() {
  var x = 0;
  if (grounds.length !== 0)
    x = grounds[grounds.length-1].position().x + grounds[0].size().x;
  var ground = new UI.Image({
    position: new Vector2(x, 140),
    size: new Vector2(28,28),
    image: 'images/ground.png'
  });
  window.add(ground);
  grounds.push(ground);
}

function deinit() {
  /*clearInterval(spikeInterval);
  clearInterval(groundInterval);
  clearInterval(scoreInteral);*/
  lost = true;
}

function lose() {
  deinit();
  console.log("LOST THE MEMES");
  
  var highScore = localStorage.getItem(HIGH_SCORE_KEY);
  console.log("High score: " + highScore);
  if (highScore === null || score > highScore) {
    highScore = score;
    console.log("New high score: " + highScore);
    localStorage.setItem(HIGH_SCORE_KEY, highScore);
  }
  
  var losingScreen = new UI.Card({
    title: "You lost!",
    body: "Your score:\n" + score + "\nHigh score:\n" + highScore
  });
  
  losingScreen.show();
  
  losingScreen.on('click', function() {
    console.log("Goober");
    init();
  });
}

function collision() {
    var lucasPos = Lucas.position();
    var obstPos = botSpikes.position();
  
    return isInside(obstPos.x, obstPos.y, lucasPos.x, lucasPos.y, lucasPos.x + Lucas.size().x, lucasPos.y + Lucas.size().y);
}

function isInside(x, y, z1, z2, z3, z4) {
    var x1 = Math.min(z1, z3);
    var x2 = Math.max(z1, z3);
    var y1 = Math.min(z2, z4);
    var y2 = Math.max(z2, z4);
    if ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2)) {
        //console.log(x1 + "," + x + "," + x2);
        //console.log(y1 + "," + y + "," + y2);
        return true;
    } else {
        return false;
    }
}