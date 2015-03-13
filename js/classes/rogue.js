'use strict';

function Rogue(name, x, y){
	PC.call(this, name, 'Rogue', x, y, '#851', 8, 16);
	this.stealth = .2;
}

Rogue.prototype = Object.create(PC.prototype);

Rogue.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(3, 2), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(7, 2), 1));
	if(this.stealth < .95){
		this.stealth += .05;
	}
	this.hp = this.maxHP;
	this.sp = this.maxSP;
}
