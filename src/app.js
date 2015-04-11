/**
 *Bitcamp 2015
 *By: Dan Harel, Marlena Lui, Angela Bair, Adam Liang
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Light = require('ui/light');

Light.on();

var window = new UI.Window();

  var testRect = new UI.Rect({
    position: new Vector2(55,100),
    size: new Vector2(20,40)
  });

//140 V

var grounds = [];
for (var i = 0; i < 5; i++) {
  var ground = new UI.Image({
    position: new Vector2(28*i, 140),
    size: new Vector2(28,28),
    image: 'images/ground.png'
  });
  window.add(ground);  
}
           
window.add(testRect);
window.show();

//jumping up
window.on('click', 'up', function() {
	var pos = testRect.position();
  pos.y -= 50;
  
  var pos2 = testRect.position();
  pos2.y += 50;
  
  //testRect.animate('position', pos, 1000);
  
  testRect.animate('position', new Vector2(55,20), 100).queue(function(next){
  testRect.animate('position', new Vector2 (55,100), 100);
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

  testRect.animate({'position': pos, 'size': size}, 100).queue(function(next){
  testRect.animate({'position':new Vector2(55, 100), 'size':new Vector2(20, 40)}, 100);
  next();
  });
} );

setInterval(function() {
  for (var i = 0; i < grounds.length; i++) {
    //grounds[i].animate('position', new Vector2(grounds[i].x - 10, grounds[i].y), 1);
  }
}, 1000);