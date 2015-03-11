'use strict';

function Mage(name, x, y){
	PC.call(this, name, 'Mage', x, y, '#448', 6, 12, 5);
}

Mage.prototype = Object.create(PC.prototype);
