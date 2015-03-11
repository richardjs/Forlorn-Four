'use strict';

function Rogue(name, x, y){
	PC.call(this, name, 'Rogue', x, y, '#851', 8, 16);
}

Rogue.prototype = Object.create(PC.prototype);

Rogue.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(3, 2), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(8, 2), 1));
}
