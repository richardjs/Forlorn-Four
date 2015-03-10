'use strict';

// Game components
window.display = undefined;
window.world = undefined;
window.controller = undefined;
window.scheduler = undefined;
window.log = undefined;

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

// Log
log = new Log();

// Create PCs
// TODO stub
var startX = world.maps[0].stairUp.x;
var startY = world.maps[0].stairUp.y;
var startXs = [startX, startX, startX - 1, startX + 1];
var startYs = [startY - 1, startY + 1, startY, startY];
var colors = ['#811', '#118', '#851', '#888'];
for(var i = 0; i < 4; i++){
	var pc = new PC('Player '+(i+1), startXs[i], startYs[i]);
	pc.color = colors[i];
}

spawnBlobs();
spawnBeetles();

// Function to redraw the whole screen
function redraw(){
	display.clear();
	world.draw();
	log.draw();
}

// Game loop
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
