'use strict';

function spawnBeetles(){
	var count = Math.floor(ROT.RNG.getNormal(10, 3));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(0, 2));
		}while(z < 0);
		var pos = world.findOpenSpace(z);
		new Beetle(pos.x, pos.y, z);
	}
}

function Beetle(x, y, z){
	Entity.call(this, 'giant beetle', 'mob', x, y, z, 'B', '#864', 8, 15, {
		xp: 30
	});
	this.path = [];
	this.newDestination();
	this.agro = null;
	this.description = 'A humongous coleoptera. It looks like it\'s minding its own business.\n\nNo, it\'s not Ringo.'
}

Beetle.prototype = Object.create(Entity.prototype);

Beetle.prototype.newDestination = function(){
	var dest = world.findOpenSpace(this.z);
	this.path = world.findPath(this.x, this.y, dest.x, dest.y, this.z);
}

Beetle.prototype.turn = function(done){
	if(this.agro){
		if(this.agro.z !== this.z || !this.agro.alive){
			this.agro = null;
		}else{
			this.path = world.findPath(this.x, this.y, this.agro.x, this.agro.y, this.z);
			if(this.path.length === 0 || this.path.length > 30){
				this.agro = null;
			}
		}
	}

	if(!this.agro && (this.path.length === 0 || !world.isPathClear(this.path))){
		this.newDestination();
	}

	this.movesRemaining = 2;
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

Beetle.prototype.damage = function(damage, other){
	Entity.prototype.damage.call(this, damage, other);
	this.agro = other;
}
