'use strict';

function Log(){
	this.left = WORLD_WIDTH;
	this.top = Math.floor(WORLD_HEIGHT * 2/3);
	this.width = DISPLAY_WIDTH - this.left;
	this.height = DISPLAY_HEIGHT - this.top;

	this.messages = [];
	this.heights = [];
}


Log.prototype.message = function(message){
	this.messages.unshift(message);
	var height = display.drawText(this.left, this.top, '%c{#eee}' + message, this.width);
	this.heights.unshift(height);

	// We need to redraw the whole screen, or else previous messages will appear under the message
	redraw();
}

Log.prototype.draw = function(){
	var totalHeight = 0;
	for(var i = 0; i < this.messages.length; i++){
		var color;
		if(i === 0){
			color = '%c{#eee}';
		}else{
			color = '%c{#aaa}';
		}
		display.drawText(this.left, this.top + totalHeight, color + this.messages[i], this.width);
		totalHeight += this.heights[i];
		
		if(totalHeight >= this.height){
			break;
		}
	}
}
