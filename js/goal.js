'use strict';

function Goal(){
	var pos = world.findOpenSpace(0);
	Entity.call(this, 'goal', 'goal', pos.x, pos.y, 0, '*', '#FD0', 1, 1);
}

Goal.prototype = Object.create(Entity.prototype);
