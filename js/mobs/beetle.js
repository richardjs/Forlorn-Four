'use strict';

function Beetle(x, y, z){
	Entity.call(this, 'giant beetle', 'mob', x, y, z, 'B', '#864', 8, 20);
	this.path = [];
	this.newDestination();
}

Beetle.prototype = Object.create(Entity.prototype);

Beetle.prototype.newDestination = function(){
	var dest = world.findOpenSpace(this.z);
	this.path = world.findPath(this.x, this.y, dest.x, dest.y, this.z);
}

Beetle.prototype.turn = function(done){
	if(this.path.length === 0 || !world.isPathClear(this.path)){
		this.newDestination();
	}

	this.movesRemaining = 2;
	var move = function(){
		if(this.path.length === 0){
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
