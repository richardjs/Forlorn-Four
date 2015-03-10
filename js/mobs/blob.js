'use strict';

function spawnBlobs(){
	var count = Math.floor(ROT.RNG.getNormal(30, 5));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(0, 1));
		}while(z < 0);
		var pos = world.findOpenSpace(z);
		new Beetle(pos.x, pos.y, z);
	}
}

function Blob(x, y, z){
	Entity.call(this, 'blob', 'mob', x, y, z, 'b', '#484', 5, 10);
}

Blob.prototype = Object.create(Entity.prototype);
