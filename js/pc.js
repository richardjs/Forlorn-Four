'use strict';

function PC(x, y){
	Entity.call(this, x, y, 0, '@', '#fff');

	this.fov = new ROT.FOV.PreciseShadowcasting(function(x, y){
		if(x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT){
			return true;
		}
		return world.mapData[this.z][x][y] !== MAP.WALL;
	}.bind(this));
	this.fovData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);
	this.updateFOV();
};

PC.prototype = Object.create(Entity.prototype);

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
	this.movesRemaining = 3;
	controller.getAction(this.action.bind(this));
}

PC.prototype.action = function(action){
	switch(action){
		case 'north':
			this.tryMove(this.x, this.y-1);
			break;
		case 'northeast':
			this.tryMove(this.x+1, this.y-1);
			break;
		case 'east':
			this.tryMove(this.x+1, this.y);
			break;
		case 'southeast':
			this.tryMove(this.x+1, this.y+1);
			break;
		case 'south':
			this.tryMove(this.x, this.y+1);
			break;
		case 'southwest':
			this.tryMove(this.x-1, this.y+1);
			break;
		case 'west':
			this.tryMove(this.x-1, this.y);
			break;
		case 'northwest':
			this.tryMove(this.x-1, this.y-1);
			break;

		case 'down':
			if(world.mapData[this.z][this.x][this.y] === MAP.STAIR_DOWN){
				this.tryMove(
					world.maps[this.z + 1].stairUp.x,
					world.maps[this.z + 1].stairUp.y,
					this.z + 1
				);
			}
			break;
		case 'up':
			if(world.mapData[this.z][this.x][this.y] === MAP.STAIR_UP){
				if(this.z === 0){
					// TODO stub, give prompt
					break;
				}
				this.tryMove(
					world.maps[this.z - 1].stairDown.x,
					world.maps[this.z - 1].stairDown.y,
					this.z - 1
				);
			}
			break;
	}

	if(this.movesRemaining === 0){
		this.done();
	}else{
		controller.getAction(this.action.bind(this));
	}
}
