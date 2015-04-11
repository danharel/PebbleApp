/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
//https://cloudpebble.net/ide/project/172772#
var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var player = require('Player.js');
//var screen = require('Screen.js');

console.log("lol");

var x = 20;
setTimeout(function() {
	var main = new UI.Window({
		title:'Pebble Run',
		fullscreen: true
	});
	
	main.add(new UI.Rect({
		position: new Vector2(x,x),
		size: new Vector2(20, 40)
	}));

	main.show();
	
	x++;
}, 1000/60);

/*main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  ajax(
  {
    url: 'http://api.theysaidso.com/qod.json',
    type: 'json'
  },
  function(data, status, request) {
    console.log('Quote of the day is: ' + data.contents.quote);
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  }
);
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/

//check if you see this thanks - 4/11