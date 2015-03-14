'use strict';

function spawnDragons(){
	var count = Math.max(Math.floor(ROT.RNG.getNormal(2, 1)), 1);
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(WORLD_LEVELS - 1, 1));
		}while(z < 0 || z > WORLD_LEVELS - 1);
		var pos = world.findOpenSpace(z);
		new Dragon(pos.x, pos.y, z);
	}
}

function Dragon(x, y, z){
	AgroMob.call(this, 'dragon', x, y, z, 'D', '#800', 80, 100, 350);
}

Dragon.prototype = Object.create(AgroMob.prototype);
