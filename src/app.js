/**
 *Bitcamp 2015
 *By: Dan Harel, Marlena Lui, Angela Bair, Adam Liang
 */

var UI = require('ui');
var Vector2 = require('vector2');
var window = new UI.Window();

  var testRect = new UI.Rect({
    position: new Vector2(55,100),
    size: new Vector2(20,40)
  });

window.add(testRect);
window.show();

window.on('click', 'select', function() {
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


