'use strict';

function spawnCentipedes(){
	var count = Math.floor(ROT.RNG.getNormal(15, 3));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(3, 1));
		}while(z < 0 || z > WORLD_LEVELS - 1);
		var pos = world.findOpenSpace(z);
		new Centipede(pos.x, pos.y, z);
	}
}

function Centipede(x, y, z){
	AgroMob.call(this, 'giant centipede', x, y, z, 'c', '#b94', 8, 10, 45);
	this.description = 'Lots of legs. Probably one hundred.\n\nDon\'t worry; you remember your friend in second grade telling you that millipedes were dangerous, but not centipedes. Or was it the other way around?';
}

Centipede.prototype = Object.create(AgroMob.prototype);
