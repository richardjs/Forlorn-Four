'use strict';

function Mage(name, x, y){
	PC.call(this, name, x, y, '#448', 6, 12);
}

Mage.prototype = Object.create(PC.prototype);
