'use strict';

function PartyStatus(){
	this.left = WORLD_WIDTH;
	this.top = 2;
	this.width = DISPLAY_WIDTH - this.left;
}

PartyStatus.prototype.draw = function(){
	var y = this.top;
	for(var i = 0; i < world.pcs.length; i++){
		var pc = world.pcs[i];
		display.drawText(
			this.left,
			y++,
			'%c{%s}%s %c{}%s'.format(pc.color, pc.char, pc.name)
		);
		display.drawText(
			this.left,
			y,
			'%s %s'.format(pc.cls, world.partyLevel)
		);
		var strengthStr = 'Str %s'.format(pc.strength);
		display.drawText(
			this.left + this.width - strengthStr.length,
			y++,
			strengthStr
		);
		display.drawText(
			this.left,
			y,
			'HP: %s/%s'.format(pc.hp < pc.maxHP ? '%c{#f11}' + pc.hp + '%c{}' : pc.hp, pc.maxHP)
		);
		if(pc.maxSP){
			var spStr = 'SP: %s/%s'.format(pc.sp, pc.maxSP);
			display.drawText(
				this.left + this.width - spStr.length,
				y,
				spStr
			);
		}
		y++;
	}
}
