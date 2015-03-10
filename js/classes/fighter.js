'use strict';

function Fighter(name, x, y){
	PC.call(this, name, x, y, '#811', 10, 20);
}

Fighter.prototype = Object.create(PC.prototype);
