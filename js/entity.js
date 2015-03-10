'use strict';

function Entity(type, x, y, z, char, color, strength, hp){
	this.type = type;

	this.x = x;
	this.y = y;
	this.z = z;

	this.char = char;
	this.color = color;

	this.strength = strength;
	this.hp = hp;

	// Register entity with the game components
	world.entities.push(this);
	world.entityData[z][x][y] = this;
	scheduler.add(this);
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

	if(this.fov){
		this.updateFOV();
	}
	world.draw(this.z);

	return true;
}

Entity.prototype.hit = function(other){
	// Return true if movement should proceed normally
	return false;
}

Entity.prototype.meleeAttack = function(other){
	var thisRoll = Math.max(ROT.RNG.getNormal(this.strength, this.strength/3), 0);
	var otherRoll = Math.max(ROT.RNG.getNormal(other.strength, other.strength/3), 0);
	var damage = Math.max(thisRoll - otherRoll, 0);
	console.log('attack for ' + damage + ' damage');
	other.damage(damage);
}

Entity.prototype.damage = function(damage){
	this.hp -= damage;
	if(this.hp <= 0){
		this.kill();
	}
}

Entity.prototype.kill = function(){
	world.entities.remove(this);
	world.entityData[this.z][this.x][this.y] = undefined;
	scheduler.remove(this);
	world.draw(this.z);
}
