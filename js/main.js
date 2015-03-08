'use strict';

// Game components
window.display = undefined;
window.world = undefined;
window.controller = undefined;
window.scheduler = undefined;

// Display
display = new ROT.Display({
	width: DISPLAY_WIDTH,
	height: DISPLAY_HEIGHT,
	fontSize: DISPLAY_FONT_SIZE
});
document.body.appendChild(display.getContainer());

// World
world = new World();

// Controller
controller = new Controller();

// Scheduler
scheduler = new ROT.Scheduler.Simple();

// Place player
// TODO stub
var playerX;
var playerY;
do{
	playerX = Math.floor(WORLD_WIDTH * Math.random());
	playerY = Math.floor(WORLD_HEIGHT * Math.random());
}while(world.mapData[0][playerX][playerY]);
var player = new PC(playerX, playerY);

world.entities.push(player);
world.pcs.push(player);

scheduler.add(player, true);

function frame(){
	var entity = scheduler.next();
	entity.active = true;

	// Draw
	world.draw(entity.z)

	entity.turn(function(){
		entity.active = false;
		frame();
	});
}

frame();
