'use strict';

// Set up display
var display = new ROT.Display({
	width: DISPLAY_WIDTH,
	height: DISPLAY_HEIGHT,
	fontSize: DISPLAY_FONT_SIZE
});
document.body.appendChild(display.getContainer());

// Create world
var world = new World();

// Initialize controller
var controller = new Controller();

// Place player
// TODO stub
var playerX;
var playerY;
do{
	playerX = Math.floor(WORLD_WIDTH * Math.random());
	playerY = Math.floor(WORLD_HEIGHT * Math.random());
}while(world.mapData[0][playerX][playerY]);
var player = new PC(playerX, playerY, controller);

// Initialize FOV
var fov = new ROT.FOV.PreciseShadowcasting(function(x, y){
	if(x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT){
		return true;
	}
	//TODO stub
	return world.mapData[0][x][y] === 0;
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
	world.draw();

	player.turn(function(){
		frame();
	});
}

frame();
