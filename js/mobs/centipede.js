'use strict';

function spawnCentipedes(){
	var count = Math.floor(ROT.RNG.getNormal(30, 3));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(2, 2));
		}while(z < 0 || z > WORLD_LEVELS - 1);
		var pos = world.findOpenSpace(z);
		new Centipede(pos.x, pos.y, z);
	}
}

function Centipede(x, y, z){
	AgroMob.call(this, 'giant centipede', x, y, z, 'C', '#b94', 8, 10, 40);
}

Centipede.prototype = Object.create(AgroMob.prototype);
