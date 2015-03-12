'use strict';

// Game components
window.display = undefined;
window.world = undefined;
window.controller = undefined;
window.scheduler = undefined;
window.log = undefined;
window.partyStatus = undefined;
window.redraw = undefined;

function main(){
	var names = [];
	var classes = [];
	for(var i = 0; i < 4; i++){
		names.push(document.getElementById('name'+i).value);
		var className = document.getElementById('class'+i).value;
		var cls;
		switch(className){
			case 'Assassin':
				cls = Assassin;
				break;
			case 'Berserker':
				cls = Berserker;
				break;
			case 'Cleric':
				cls = Cleric;
				break;
			case 'Fighter':
				cls = Fighter;
				break;
			case 'Mage':
				cls = Mage;
				break;
			case 'Rogue':
				cls = Rogue;
				break;
			case 'Stalwart':
				cls = Stalwart;
				break;
		}
		classes.push(cls);
	}

	document.body.innerHTML = '';

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
	
	new classes[0](names[0], startXs[0], startYs[0]);
	new classes[1](names[1], startXs[3], startYs[3]);
	new classes[2](names[2], startXs[1], startYs[1]);
	new classes[3](names[3], startXs[2], startYs[2]);

	spawnBlobs();
	spawnBeetles();

	partyStatus.draw();

	// Function to redraw the whole screen
	redraw = function(z){
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

		redraw();
		//partyStatus.draw();
	}

	frame();
}
