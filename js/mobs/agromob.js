'use strict';

function AgroMob(name, x, y, z, char, color, strength, hp, xp, options){
	Entity.call(this, name, 'mob', x, y, z, char, color, strength, hp, {
		xp: xp
	});
	
	this.fov = new ROT.FOV.PreciseShadowcasting(function(x, y){
		if(x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT){
			return true;
		}
		return world.mapData[this.z][x][y] !== MAP.WALL;
	}.bind(this));
	this.fovData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);

	this.path = [];

	options = options || {};
	if(typeof(options.moves) === 'undefined'){
		this.moves = 3;
	}else{
		this.moves = options.moves;
	}
}

AgroMob.prototype = Object.create(Entity.prototype);

AgroMob.prototype.updateFOV = function(){
	if(!world.pcOnZ(this.z)){
		this.agro = false;
		return;
	}
	/*
	if(Math.random() < .5){
		return;
	}
	*/

	this.fovData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);

	var closestPC = undefined;
	var closestDist = Infinity;
	this.fov.compute(this.x, this.y, VIEW_DISTANCE, function(x, y, distance, visibility){
		this.fovData[this.z][x][y] = true;
		var entity = world.entityData[this.z][x][y];
		if(entity && entity.type === 'pc'){
			if(entity.stealth){
				if(Math.random() < entity.stealth){
					return;
				}
			}
			var dist = Math.sqrt(Math.pow(this.x - entity.x, 2) + Math.pow(this.y - entity.y, 2));
			if(dist < closestDist){
				closestPC = entity;
				closestDist = dist;
			}
		}
	}.bind(this));

	this.agro = closestPC;
	
}

AgroMob.prototype.newDestination = function(){
	var dest = world.findOpenSpace(this.z);
	this.path = world.findPath(this.x, this.y, dest.x, dest.y, this.z);
}

AgroMob.prototype.turn = function(done){
	this.updateFOV();
	if(this.agro && this.agro.alive){
		this.path = world.findPath(this.x, this.y, this.agro.x, this.agro.y, this.z);
		if(this.path.length === 0){
			this.agro = null;
		}
	}else{
		this.newDestination();
	}

	this.movesRemaining = this.moves;
	var move = function(){
		if(!this.agro && this.path.length === 0){
			this.newDestination();
		}
		if(this.path.length){
			var next = this.path.shift();
			this.tryMove(next.x, next.y, this.z);
		}else{
			this.movesRemaining--;
		}

		if(this.movesRemaining === 0){
			done();
			return;
		}

		if(world.pcCanSee(this.x, this.y, this.z)){
			setTimeout(move, 100);			
		}else{
			move();
		}
	}.bind(this);

	move();
}
