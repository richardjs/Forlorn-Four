'use strict';

function Goal(){
	var pos = world.findOpenSpace(WORLD_LEVELS - 1);
	Entity.call(this, 'goal', 'goal', pos.x, pos.y, WORLD_LEVELS - 1, '*', '#FD0', 1, 1);
}

Goal.prototype = Object.create(Entity.prototype);
