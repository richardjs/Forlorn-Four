'use strict';

function World(){
	this.pcs = [];

	var map = new ROT.Map.Digger(WORLD_WIDTH, WORLD_HEIGHT, {
		dugPercentage: .65,
		roomWidth: [ROOM_WIDTH_MIN, ROOM_WIDTH_MAX],
		roomHeight: [ROOM_HEIGHT_MIN, ROOM_HEIGHT_MAX],
		corridorLength: [CORRIDOR_LENGTH_MIN, CORRIDOR_LENGTH_MAX]
	});
	this.mapData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);
	for(var level = 0; level < WORLD_LEVELS; level++){
		map.create(function(x, y, wall){
			this.mapData[level][x][y] = wall;
		}.bind(this));
	}

	this.seenData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);
}

World.prototype.draw = function(z){
	var fovData = createArray(WORLD_WIDTH, WORLD_HEIGHT);
	this.pcs.forEach(function(pc){
		if(pc.z !== z){
			return;;
		}
		for(var x = 0; x < WORLD_WIDTH; x++){
			for(var y = 0; y < WORLD_HEIGHT; y++){
				fovData[x][y] = fovData[x][y] || pc.fovData[z][x][y];
			}
		}
	}.bind(this));

	for(var x = 0; x < WORLD_WIDTH; x++){
		for(var y = 0; y < WORLD_HEIGHT; y++){
			if(!fovData[x][y]){
				if(!this.seenData[z][x][y]){
					display.draw(x, y, '', '', UNSEEN_COLOR);
				}else{
					if(this.mapData[0][x][y]){
						display.draw(x, y, '', '', SEEN_WALL);
					}else{
						display.draw(x, y, '', '', SEEN_FLOOR);
					}
				}
				continue;
			}
			if(this.mapData[0][x][y]){
				display.draw(x, y, '', '', VISIBLE_WALL);
			}else{
				display.draw(x, y, '', '', VISIBLE_FLOOR);
			}
		}
	}

	display.draw(player.x, player.y, '@', '#fff', VISIBLE_FLOOR);
}
