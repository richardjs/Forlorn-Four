'use strict';

function PC(x, y, controller){
	this.x = x;
	this.y = y;
	this.controller = controller;
};

PC.prototype.turn = function(done){
	this.done = done;
	this.controller.getAction(this.action.bind(this));
}

PC.prototype.action = function(action){
	var completed;
	switch(action){
		case 'north':
			completed = this.tryMove(this.x, this.y-1);
			break;
		case 'northeast':
			completed = this.tryMove(this.x+1, this.y-1);
			break;
		case 'east':
			completed = this.tryMove(this.x+1, this.y);
			break;
		case 'southeast':
			completed = this.tryMove(this.x+1, this.y+1);
			break;
		case 'south':
			completed = this.tryMove(this.x, this.y+1);
			break;
		case 'southwest':
			completed = this.tryMove(this.x-1, this.y+1);
			break;
		case 'west':
			completed = this.tryMove(this.x-1, this.y);
			break;
		case 'northwest':
			completed = this.tryMove(this.x-1, this.y-1);
			break;
	}

	if(completed){
		this.done();
	}else{
		this.controller.getAction(this.action.bind(this));
	}
}

PC.prototype.tryMove = function(x, y){
	//TODO stub--need proper access to mapData
	if(world.mapData[0][x][y]){
		return false;
	}

	this.x = x;
	this.y = y;
	return true;
}
