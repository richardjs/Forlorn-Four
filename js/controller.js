'use strict';

function Controller(){
	this.actionListener = this.keypress.bind(this);
	this.cursorListener = this.cursorKeypress.bind(this);
	this.skipAction = false;
}

Controller.prototype.getAction = function(callback){
	this.callback = callback;
	document.body.addEventListener('keypress', this.actionListener);
}

Controller.prototype.keypress = function(event){
	if(this.skipAction){
		console.log('skipping');
		return;
	}

	var action;
	var key = String.fromCharCode(event.charCode);
	switch(key){
		case 'h':
		case '4':
			action = 'west';
			break;
		case 'l':
		case '6':
			action = 'east';
			break;
		case 'j':
		case '2':
			action = 'south';
			break;
		case 'k':
		case '8':
			action = 'north';
			break;
		case 'y':
		case '7':
			action = 'northwest';
			break;
		case 'u':
		case '9':
			action = 'northeast';
			break;
		case 'b':
		case '1':
			action = 'southwest';
			break;
		case 'n':
		case '3':
			action = 'southeast';
			break;

		case '>':
			action = 'down';
			break;
		case '<':
			action = 'up';
			break;

		case '.':
			action = 'wait';
			break;
		
		case 'd':
			action = 'describe';
			break;
	}

	if(action){
		document.body.removeEventListener('keypress', this.actionListener);
		this.callback(action);
	}
}

Controller.prototype.getCoordinate = function(sx, sy, callback, maxRadius){
	this.skipAction = true;
	this.cursorStartX = sx;
	this.cursorStartY = sy;
	this.cursorX = sx;
	this.cursorY = sy;
	this.coordCallback = callback;
	this.coordRadius = maxRadius;
	this.drawCursor();
	document.body.addEventListener('keypress', this.cursorListener);
}

Controller.prototype.cursorKeypress = function(event){
	var key = String.fromCharCode(event.charCode);
	var nx = this.cursorX;
	var ny = this.cursorY;

	switch(key){
		case 'h':
		case '4':
			nx--;
			break;
		case 'l':
		case '6':
			nx++;
			break;
		case 'j':
		case '2':
			ny++;
			break;
		case 'k':
		case '8':
			ny--;
			break;
		case 'y':
		case '7':
			nx--;
			ny--;
			break;
		case 'u':
		case '9':
			nx++;
			ny--
			break;
		case 'b':
		case '1':
			nx--;
			ny++;
			break;
		case 'n':
		case '3':
			nx++;
			ny++;
			break;
		case ' ':
			event.preventDefault();
			this.skipAction = false;
			document.body.removeEventListener('keypress', this.cursorListener);
			redraw();
			this.coordCallback(this.cursorX, this.cursorY);
			return;
	}

	if(this.coordRadius && Math.sqrt(Math.pow(nx - this.cursorStartX, 2) + Math.pow(ny - this.cursorStartY, 2)) > this.coordRadius
			|| nx < 0 || nx+1 > WORLD_WIDTH || ny < 0 || ny+1 > WORLD_HEIGHT){
		return;
	}

	this.cursorX = nx;
	this.cursorY = ny;
	this.drawCursor();
}

Controller.prototype.drawCursor = function(){
	redraw();
	var char = '';
	var color = '';
	var entity = world.entityData[world.lastDrawnZ][this.cursorX][this.cursorY];
	if(entity && world.pcCanSee(this.cursorX, this.cursorY, world.lastDrawnZ)){
		char = entity.char;
		color = entity.color;
	}
	display.draw(
		this.cursorX,
		this.cursorY,
		char,
		color,
		'#aa1'
	);
}

Controller.prototype.dialog = function(text){
	this.skipAction = true;
	display.drawText(0, 0, text, WORLD_WIDTH/2);
	var listener = function(event){
		document.body.removeEventListener('keypress', listener);
		redraw();
		this.skipAction = false;
	}.bind(this);
	document.body.addEventListener('keypress', listener);
}
