/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
//https://cloudpebble.net/ide/project/172772#
var UI = require('ui');
var Vector2 = require('vector2');
//var ajax = require('ajax');

//var player = require('Player.js');
//var screen = require('Screen.js');

console.log("lol");

var main = new UI.Window({
	title: 'Pebble Run',
	fullscreen: true
});

main.on('click', 'select', function() {
	console.log('Adam is a goober');
});

//var x = 0;
/*setInterval(function() {
	var main = new UI.Window({
		title:'Pebble Run',
		fullscreen: true
	});
	
	main.add(new UI.Rect({
		position: new Vector2(x,x),
		size: new Vector2(20, 40)
	}));

	main.show();
	
	x+=10;
}, 1000);*/