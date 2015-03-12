'use strict';

function AgroMob(name, x, y, z, char, color, strength, hp, xp){
	Entity.call(this, name, 'mob', x, y, z, char, color, hp, xp);
	
	this.fov = new ROT.FOV.PreciseShadowcasting(function(x, y){
		if(x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT){
			return true;
		}
		return world.mapData[this.z][x][y] !== MAP.WALL;
	}.bind(this));
	this.fovData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);

	this.path = [];
}

AgroMob.prototype = Object.create(Entity.prototype);

AgroMob.prototype.updateFOV = function(){
	this.fovData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);

	var closestPC = undefined;
	var closestDist = Infinity;
	this.fov.compute(this.x, this.y, VIEW_DISTANCE, function(x, y, distance, visibility){
		this.fovData[this.z][x][y] = true;
		var entity = world.entityData[this.z][x][y];
		if(entity && entity.type === 'pc'){
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
	if(this.agro){
		this.path = world.findPath(this.x, this.y, this.agro.x, this.agro.y, this.z);
		if(this.path.length === 0){
			this.agro = null;
		}
	}else{
		this.newDestination();
	}

	this.movesRemaining = 3;
	var move = function(){
		if(!this.agro && this.path.length === 0){
			this.newDestination();
		}
		if(this.path.length){
			var next = this.path.shift();
			this.tryMove(next.x, next.y, this.z);
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
