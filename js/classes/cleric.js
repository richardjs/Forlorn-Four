'use strict';

function Cleric(name, x, y){
	PC.call(this, name, 'Cleric', x, y, '#bbb', 6, 12, 5);
}

Cleric.prototype = Object.create(PC.prototype);

Cleric.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(3, 1), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(6, 1), 1));
	this.maxSP += Math.floor(Math.max(ROT.RNG.getNormal(5, 2), 1));
}
