'use strict';

function Fighter(name, x, y){
	PC.call(this, name, 'Fighter', x, y, '#811', 10, 20);
}

Fighter.prototype = Object.create(PC.prototype);

Fighter.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(5, 2), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(10, 2), 1));
}
