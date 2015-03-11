'use strict';

function Rogue(name, x, y){
	PC.call(this, name, 'Rogue', x, y, '#851', 8, 16);
}

Rogue.prototype = Object.create(PC.prototype);
