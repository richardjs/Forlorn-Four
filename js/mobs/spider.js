'use strict';

function spawnSpiders(){
	var count = Math.floor(ROT.RNG.getNormal(15, 3));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(6, 1));
		}while(z < 0 || z > WORLD_LEVELS - 1);
		var pos = world.findOpenSpace(z);
		new Spider(pos.x, pos.y, z);
	}
}

function Spider(x, y, z){
	AgroMob.call(this, 'cave spider', x, y, z, 'S', '#444', 15, 30, 80, {
		moves: 4
	});
	this.description = 'Neither itsy nor bitsy. Still a spider. Probably moves fast.\n\nMost spiders do not pose a danger to humans. Most spiders are also not the size of a horse.';
}

Spider.prototype = Object.create(AgroMob.prototype);
