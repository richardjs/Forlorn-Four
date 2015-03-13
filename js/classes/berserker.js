'use strict';

function Berserker(name, x, y){
	PC.call(this, name, 'Berserker', x, y, '#e90', 12, 18, 0, {
		attackMultiplier: 1.5,
		defenseMultiplier: .5
	});
}

Berserker.prototype = Object.create(PC.prototype);

Berserker.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(5, 2), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(10, 2), 1));
	this.hp = this.maxHP;
	this.sp = this.maxSP;
}
