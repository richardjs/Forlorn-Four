'use strict';

function spawnShadows(){
	var count = Math.floor(ROT.RNG.getNormal(5, 2));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(5, 1));
		}while(z < 0 || z > WORLD_LEVELS - 1);
		var pos = world.findOpenSpace(z);
		new Shadow(pos.x, pos.y, z);
	}
}

function Shadow(x, y, z){
	AgroMob.call(this, 'shadow', x, y, z, ' ', '#000', 20, 10, 50);
}

Shadow.prototype = Object.create(AgroMob.prototype);

Shadow.prototype.turn = function(done){
	this.active = false;
	AgroMob.prototype.turn.call(this, done);
}
