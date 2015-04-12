/**
 *Bitcamp 2015
 *By: Dan Harel, Marlena Lui, Angela Bair, Adam Liang
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Light = require('ui/light');

Light.on();

var NUM_GROUNDS = 7

var window = new UI.Window();

var background = new UI.Image({
  position: new Vector2(0,68),
  size: new Vector2(144, 168),
  image: 'images/bkg.png'
});
window.add(background);

var botSpikes = new UI.Image({
    position: new Vector2(80, 100),
    size: new Vector2(20,40),
    image: 'images/bot2.png'
});
window.add(botSpikes);

var Lucas = new UI.Image({
    position: new Vector2(30,100),
    size: new Vector2(20,40),
    image: 'images/Lucas.png'
});

//Moving ground
var grounds = [];
for (var i = 0; i < NUM_GROUNDS; i++) {
  addGround();
}
           
window.add(Lucas);
window.show();

//jumping up
window.on('click', 'up', function() {
	var pos = Lucas.position();
  pos.y -= 50;
  
  var pos2 = Lucas.position();
  pos2.y += 50; 
  
  //testRect.animate('position', pos, 1000);
  
  Lucas.animate('position', new Vector2(30,35), 500).queue(function(next){
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
} );

setInterval(function() {
  console.log(botSpikes.position().x + "," + botSpikes.position().y);
  if (botSpikes.position().x < -1* botSpikes.size().x)
    botSpikes.animate('position', new Vector2(botSpikes.position().x+200, botSpikes.position().y), 1);
  else
    botSpikes.animate('position', new Vector2(botSpikes.position().x-20, botSpikes.position().y), 1);
}, 1000/3);

//moving ground
setInterval(function() {
  for (var i = 0; i < grounds.length; i++) {
    var curr = grounds[i];
    var x = curr.position().x;
    var y = curr.position().y;
    curr.animate('position', new Vector2(x - 20, y), 1);
    if (curr.position().x < -1*curr.size().x) {
      removeFirstGround();
      while (grounds.length < NUM_GROUNDS)
        addGround();
    }
  }
}, 1000/3);

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
  console.log(ground);
}

