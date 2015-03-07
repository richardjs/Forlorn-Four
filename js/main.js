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
var player = new PC(playerX, playerY);

world.pcs.push(player);

function frame(){
	// Draw
	world.draw(player.z);

	player.turn(function(){
		frame();
	});
}

frame();
