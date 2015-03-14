'use strict';

function spawnTrolls(){
	var count = Math.floor(ROT.RNG.getNormal(10, 3));
	for(var i = 0; i < count; i++){
		var z;
		do{
			z = Math.floor(ROT.RNG.getNormal(7, 1));
		}while(z < 0 || z > WORLD_LEVELS - 1);
		var pos = world.findOpenSpace(z);
		new Troll(pos.x, pos.y, z);
	}
}

function Troll(x, y, z){
	AgroMob.call(this, 'troll', x, y, z, 'T', '#b94', 40, 60, 110, {
		moves: 2
	});
	this.maxHP = 60;
	this.description = 'A monstrous humanoid that looks ready for war. Also has the ability to regenerate.\n\nFeeding is prohibited.';
}

Troll.prototype = Object.create(AgroMob.prototype);

Troll.prototype.turn = function(done){
	if(this.hp < this.maxHP){
		var regen = Math.floor(ROT.RNG.getNormal(5, 1));
		if(regen + this.hp > this.maxHP){
			regen = this.maxHP - this.hp;
		}
		this.hp += regen;
		log.message('%s regenerates %s health!'.format(
			this.definiteArticle ? 'The ' + this.name : this.name,
			regen
		));
	}

	AgroMob.prototype.turn.call(this, done);
}
