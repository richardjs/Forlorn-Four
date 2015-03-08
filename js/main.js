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

// Place PCs
// TODO stub
var colors = ['#811', '#118', '#851', '#888'];
for(var i = 0; i < 4; i++){
	var pcX;
	var pcY;
	do{
		pcX = Math.floor(WORLD_WIDTH * Math.random());
		pcY = Math.floor(WORLD_HEIGHT * Math.random());
	}while(world.mapData[0][pcX][pcY]);
	var pc = new PC(pcX, pcY);
	pc.color = colors[i];

	world.entities.push(pc);
	world.pcs.push(pc);
	scheduler.add(pc, true);
}


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
