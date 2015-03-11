'use strict';

function Mage(name, x, y){
	PC.call(this, name, 'Mage', x, y, '#448', 6, 12, 5);
}

Mage.prototype = Object.create(PC.prototype);

Mage.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(3, 1), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(6, 1), 1));
	this.maxSP += Math.floor(Math.max(ROT.RNG.getNormal(5, 2), 1));
}

