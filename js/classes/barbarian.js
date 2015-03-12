'use strict';

function Barbarian(name, x, y){
	PC.call(this, name, 'Barbarian', x, y, '#e90', 12, 18, 0, {
		attackMultiplier: 1.5,
		defenseMultiplier: .5
	});
}

Barbarian.prototype = Object.create(PC.prototype);

Barbarian.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(5, 2), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(10, 2), 1));
}
