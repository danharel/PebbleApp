/**
 *Bitcamp 2015
 *By: Dan Harel, Marlena Lui, Angela Bair, Adam Liang
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Light = require('ui/light');

Light.on();

var window = new UI.Window();

var background = new UI.Image({
  position: new Vector2(0,68),
  size: new Vector2(144, 168),
  image: 'images/bkg.png'
});
window.add(background);

  var Lucas = new UI.Image({
    position: new Vector2(30,100),
    size: new Vector2(20,40),
    image: 'images/Lucas.png'
  });

//140 V

//Moving ground
var grounds = [];
for (var i = 0; i < 7; i++) {
  addGround();
}

//Bottom spikes, try a loop to generate them?
var botSpike = new UI.Image({
  position: new Vector2(80,100),
  size: new Vector2(20,40),
  image: 'images/bot2.png'
});
window.add(botSpike);
           
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
  //size.y += 20;
  //pos.y -= 50;

  //var size2 = testRect.size;
  //size2.y -= 50;

  Lucas.animate({'position': pos, 'size': size}, 100).queue(function(next){
  Lucas.animate({'position':new Vector2(30, 100), 'size':new Vector2(20, 40)}, 100);
  next();
  });
} );

setInterval(function() {
  for (var i = 0; i < grounds.length; i++) {
    var curr = grounds[i];
    var x = curr.position().x;
    var y = curr.position().y;
    curr.animate('position', new Vector2(x - 10, y), 1);
    if (curr.position().x < -1*curr.size().x) {
      removeFirstGround();
      addGround();
    }
  }
}, 1000);

function removeFirstGround() {
  grounds[0].remove();
  grounds.splice(0,1);
}

function addGround() {
  var x = 0;
  if (grounds.length != 0)
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