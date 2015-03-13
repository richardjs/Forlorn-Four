'use strict';

function Stalwart(name, x, y){
	PC.call(this, name, 'Stalwart', x, y, '#22a', 9, 22, 0, {
		attackMultiplier: .5,
		defenseMultiplier: 1.5
	});
}

Stalwart.prototype = Object.create(PC.prototype);

Stalwart.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(5, 2), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(12, 2), 1));
	this.hp = this.maxHP;
	this.sp = this.maxSP;
}
