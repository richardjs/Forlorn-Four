'use strict';

function Controller(){
	this.listener = this.keypress.bind(this);
}

Controller.prototype.getAction = function(callback){
	this.callback = callback;
	document.body.addEventListener('keypress', this.listener);
}

Controller.prototype.keypress = function(event){
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
	}

	if(action){
		document.body.removeEventListener('keypress', this.listener);
		this.callback(action);
	}
}
