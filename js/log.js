'use strict';

function Log(){
	this.left = WORLD_WIDTH;
	this.top = Math.floor(WORLD_HEIGHT * 2/3);
	this.width = DISPLAY_WIDTH - this.left;
	this.height = DISPLAY_HEIGHT - this.top;
}

Log.prototype.message = function(message){
	display.drawText(this.left, this.top, message, this.width);
}
