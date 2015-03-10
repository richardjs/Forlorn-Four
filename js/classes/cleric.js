'use strict';

function Cleric(name, x, y){
	PC.call(this, name, x, y, '#bbb', 6, 12);
}

Cleric.prototype = Object.create(PC.prototype);
