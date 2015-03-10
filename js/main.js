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

new Fighter('Fighter', startXs[0], startYs[0]);
new Mage('Mage', startXs[1], startYs[1]);
new Rogue('Rogue', startXs[2], startYs[2]);
new Cleric('Cleric', startXs[3], startYs[3]);

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
