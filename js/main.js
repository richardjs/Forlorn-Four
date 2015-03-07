'use strict';

var DISPLAY_WIDTH = 85;
var DISPLAY_HEIGHT = 30;
var DISPLAY_FONT_SIZE = 18;

var WORLD_LEVELS = 10;

// Set up display
var display = new ROT.Display({
	width: DISPLAY_WIDTH,
	height: DISPLAY_HEIGHT,
	fontSize: DISPLAY_FONT_SIZE
});
document.body.appendChild(display.getContainer());

// Create world
var mapData = []
for(var level = 0; level < WORLD_LEVELS; level++){
	mapData[level] = [];
	
	var map = new ROT.Map.Digger(DISPLAY_WIDTH - 20, DISPLAY_HEIGHT, {
		dugPercentage: .65,
		roomWidth: [3, 12],
		roomHeight: [3, 7],
		corridorLength: [1, 5]
	});
	map.create(function(x, y, wall){
		if(!mapData[level][x]){
			mapData[level][x] = [];
		}
		mapData[level][x][y] = wall;
	});
}

// Draw
for(var x = 0; x < DISPLAY_WIDTH; x++){
	for(var y = 0; y < DISPLAY_HEIGHT; y++){
		if(mapData[0][x][y]){
			display.draw(x, y, '', '', '#333');
		}else{
			display.draw(x, y, '', '', '#111');
		}
	}
}
