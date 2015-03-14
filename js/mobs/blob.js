'use strict';

function spawnBlobs(){
	var count = Math.floor(ROT.RNG.getNormal(10, 2));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(0, 1));
		}while(z < 0);
		var pos = world.findOpenSpace(z);
		new Blob(pos.x, pos.y, z);
	}
}

function Blob(x, y, z){
	Entity.call(this, 'blob', 'mob', x, y, z, 'b', '#484', 3, 10, {
		xp: 15
	});
	this.description = 'An amorphous green blob. Technically a BLOB--a Blobby Large OBject. May or may not be alive.\n\nIf the world were a program, this might be what existed before real creatures were implemented.'
}

Blob.prototype = Object.create(Entity.prototype);
