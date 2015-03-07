'use strict';

var DISPLAY_WIDTH = 85;
var DISPLAY_HEIGHT = 30;
var DISPLAY_FONT_SIZE = 18;

var WORLD_WIDTH = DISPLAY_WIDTH - 20;
var WORLD_HEIGHT = DISPLAY_HEIGHT;
var WORLD_LEVELS = 10;

var VIEW_DISTANCE = 91;

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
	for(var x = 0; x < WORLD_WIDTH; x++){
		mapData[level][x] = [];
	}
	
	var map = new ROT.Map.Digger(WORLD_WIDTH, WORLD_HEIGHT, {
		dugPercentage: .65,
		roomWidth: [3, 12],
		roomHeight: [3, 7],
		corridorLength: [1, 5]
	});
	map.create(function(x, y, wall){
		mapData[level][x][y] = wall;
	});
}

// Initialize controller
var controller = new Controller();

// Place player
// TODO stub
var playerX;
var playerY;
do{
	playerX = Math.floor(WORLD_WIDTH * Math.random());
	playerY = Math.floor(WORLD_HEIGHT * Math.random());
}while(mapData[0][playerX][playerY]);
var player = new PC(playerX, playerY, controller);

// Initialize FOV
var fov = new ROT.FOV.PreciseShadowcasting(function(x, y){
	if(x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT){
		return true;
	}
	//TODO stub
	return mapData[0][x][y] === 0;
});
//TODO doesn't support multiple levels
var fovData = [];

// Keep track of the map we've seen
var seenData = []
for(var x = 0; x < WORLD_WIDTH; x++){
	seenData[x] = [];
}

function frame(){
	// Compute FOV
	//TODO tie this to PC movement
	// Zero out...
	for(var x = 0; x < WORLD_WIDTH; x++){
		fovData[x] = [];
	}
	// ...and compute
	fov.compute(player.x, player.y, VIEW_DISTANCE, function(x, y, distance, visibility){
		fovData[x][y] = true;
		seenData[x][y] = true;
	});

	// Draw
	// TODO stub
	for(var x = 0; x < WORLD_WIDTH; x++){
		for(var y = 0; y < WORLD_HEIGHT; y++){
			if(!fovData[x][y]){
				if(!seenData[x][y]){
					display.draw(x, y, '', '', '#333');
				}else{
					if(mapData[0][x][y]){
						display.draw(x, y, '', '', '#222');
					}else{
						display.draw(x, y, '', '', '#17171c');
					}
				}
				continue;
			}
			if(mapData[0][x][y]){
				display.draw(x, y, '', '', '#222');
			}else{
				display.draw(x, y, '', '', '#111');
			}
		}
	}

	display.draw(player.x, player.y, '@', '#fff', '#111');

	player.turn(function(){
		frame();
	});
}

frame();
