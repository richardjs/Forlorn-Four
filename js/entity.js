'use strict';

function Entity(type, x, y, z, char, color){
	this.type = type;

	this.x = x;
	this.y = y;
	this.z = z;

	this.char = char;
	this.color = color;

	world.entityData[z][x][y] = this;
}

Entity.prototype.turn = function(done){
	done();
}

Entity.prototype.tryMove = function(x, y, z){
	if(typeof(z) === 'undefined'){
		z = this.z;
	}

	if(world.mapData[z][x][y] === MAP.WALL){
		return false;
	}

	if(world.entityData[z][x][y]){
		if(!this.hit(world.entityData[z][x][y])){
			return false;
		}
	}

	world.entityData[this.z][this.x][this.y] = undefined;
	world.entityData[z][x][y] = this;

	this.x = x;
	this.y = y;
	this.z = z;
	this.movesRemaining--;

	this.updateFOV();
	world.draw(this.z);

	return true;
}

Entity.prototype.hit = function(other){
	// Return true is movement should proceed normally
	return false;
}
