'use strict';

function Entity(x, y, z, char, color){
	this.x = x;
	this.y = y;
	this.z = z;

	this.char = char;
	this.color = color;
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

	this.x = x;
	this.y = y;
	this.z = z;
	this.movesRemaining--;

	this.updateFOV();
	world.draw(this.z);

	return true;
}
