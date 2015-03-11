'use strict';

function Cleric(name, x, y){
	PC.call(this, name, 'Cleric', x, y, '#bbb', 6, 12, 5);
}

Cleric.prototype = Object.create(PC.prototype);
