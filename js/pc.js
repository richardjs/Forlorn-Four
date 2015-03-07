'use strict';

function PC(x, y){
	this.x = x;
	this.y = y;
	this.z = 0;

	this.fov = new ROT.FOV.PreciseShadowcasting(function(x, y){
		if(x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT){
			return true;
		}
		return world.mapData[this.z][x][y] === 0;
	}.bind(this));
	this.fovData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);
	this.updateFOV();
};

PC.prototype.updateFOV = function(){
	// Zero out...
	this.fovData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);
	// ...and recompute
	this.fov.compute(this.x, this.y, VIEW_DISTANCE, function(x, y, distance, visibility){
		this.fovData[this.z][x][y] = true;
		world.seenData[this.z][x][y] = true;
	}.bind(this));
}

PC.prototype.turn = function(done){
	this.done = done;
	controller.getAction(this.action.bind(this));
}

PC.prototype.action = function(action){
	var completed;
	switch(action){
		case 'north':
			completed = this.tryMove(this.x, this.y-1);
			break;
		case 'northeast':
			completed = this.tryMove(this.x+1, this.y-1);
			break;
		case 'east':
			completed = this.tryMove(this.x+1, this.y);
			break;
		case 'southeast':
			completed = this.tryMove(this.x+1, this.y+1);
			break;
		case 'south':
			completed = this.tryMove(this.x, this.y+1);
			break;
		case 'southwest':
			completed = this.tryMove(this.x-1, this.y+1);
			break;
		case 'west':
			completed = this.tryMove(this.x-1, this.y);
			break;
		case 'northwest':
			completed = this.tryMove(this.x-1, this.y-1);
			break;
	}

	if(completed){
		this.done();
	}else{
		controller.getAction(this.action.bind(this));
	}
}

PC.prototype.tryMove = function(x, y){
	if(world.mapData[0][x][y]){
		return false;
	}

	this.x = x;
	this.y = y;

	this.updateFOV();

	return true;
}
