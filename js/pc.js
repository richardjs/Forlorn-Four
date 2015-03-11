'use strict';

function PC(name, cls, x, y, color, strength, hp, sp){
	Entity.call(this, name, 'pc', x, y, 0, '@', color, strength, hp, {
		definiteArticle: false
	});
	world.pcs.push(this);

	this.cls = cls;
	this.maxHP = hp;
	this.sp = sp || 0;
	this.maxSP = this.sp;

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

		case 'wait':
			this.movesRemaining = 0;
			break;
	}

	if(this.movesRemaining === 0){
		this.done();
	}else{
		controller.getAction(this.action.bind(this));
	}
}

PC.prototype.hit = function(other){
	switch(other.type){
		case 'pc':
			var tx = this.x;
			var ty = this.y;
			var tz = this.z;
			this.x = other.x;
			this.y = other.y;
			this.z = other.z;
			other.x = tx;
			other.y = ty;
			other.z = tz;
			world.entityData[this.z][this.x][this.y] = this;
			world.entityData[other.z][other.x][other.y] = other;
			this.movesRemaining--;
			this.updateFOV();
			other.updateFOV();
			world.draw(this.z);
			break;

		case 'mob':
			this.meleeAttack(other);
			break;
	}
}

PC.prototype.kill = function(source){
	world.pcs.remove(this);
	Entity.prototype.kill.call(this, source);
	if(world.pcs.length === 0){
		alert('Game over');
	}
}

PC.prototype.levelUp = function(){}
