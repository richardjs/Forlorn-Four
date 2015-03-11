'use strict';

// Game components
window.display = undefined;
window.world = undefined;
window.controller = undefined;
window.scheduler = undefined;
window.log = undefined;
window.partyStatus = undefined;

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

// UI elements
log = new Log();
partyStatus = new PartyStatus();

// Create PCs
// TODO stub
var startX = world.maps[0].stairUp.x;
var startY = world.maps[0].stairUp.y;
var startXs = [startX, startX, startX - 1, startX + 1];
var startYs = [startY - 1, startY + 1, startY, startY];

new Fighter('Jack', startXs[0], startYs[0]);
new Mage('Rufus', startXs[1], startYs[1]);
new Rogue('Zachary', startXs[2], startYs[2]);
new Cleric('Percival', startXs[3], startYs[3]);

spawnBlobs();
spawnBeetles();

partyStatus.draw();

// Function to redraw the whole screen
function redraw(z){
	display.clear();
	world.draw();
	log.draw();
	partyStatus.draw();
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

	partyStatus.draw();
}

frame();
