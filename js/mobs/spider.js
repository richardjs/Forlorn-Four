'use strict';

function spawnSpiders(){
	var count = Math.floor(ROT.RNG.getNormal(20, 3));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(5, 5));
		}while(z < 0 || z > WORLD_LEVELS - 1);
		var pos = world.findOpenSpace(z);
		new Spider(pos.x, pos.y, z);
	}
}

function Spider(x, y, z){
	AgroMob.call(this, 'cave spiders', x, y, z, 'S', '#444', 20, 30, 80, {
		moves: 4
	});
}

Spider.prototype = Object.create(AgroMob.prototype);
