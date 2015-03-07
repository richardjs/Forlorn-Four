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
			action = 'west';
			break;
		case 'l':
			action = 'east';
			break;
		case 'j':
			action = 'south';
			break;
		case 'k':
			action = 'north';
			break;
		case 'y':
			action = 'northwest';
			break;
		case 'u':
			action = 'northeast';
			break;
		case 'b':
			action = 'southwest';
			break;
		case 'n':
			action = 'southeast';
			break;
	}

	if(action){
		document.body.removeEventListener('keypress', this.listener);
		this.callback(action);
	}
}
