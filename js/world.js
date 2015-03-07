'use strict';

function World(){
	this.mapData = [];
	for(var level = 0; level < WORLD_LEVELS; level++){
		this.mapData[level] = [];
		for(var x = 0; x < WORLD_WIDTH; x++){
			this.mapData[level][x] = [];
		}
		
		var map = new ROT.Map.Digger(WORLD_WIDTH, WORLD_HEIGHT, {
			dugPercentage: .65,
			roomWidth: [ROOM_WIDTH_MIN, ROOM_WIDTH_MAX],
			roomHeight: [ROOM_HEIGHT_MIN, ROOM_HEIGHT_MAX],
			corridorLength: [CORRIDOR_LENGTH_MIN, CORRIDOR_LENGTH_MAX]
		});
		map.create(function(x, y, wall){
			this.mapData[level][x][y] = wall;
		}.bind(this));
	}
}

World.prototype.draw = function(){
	for(var x = 0; x < WORLD_WIDTH; x++){
		for(var y = 0; y < WORLD_HEIGHT; y++){
			if(!fovData[x][y]){
				if(!seenData[x][y]){
					display.draw(x, y, '', '', UNSEEN_COLOR);
				}else{
					if(world.mapData[0][x][y]){
						display.draw(x, y, '', '', SEEN_WALL);
					}else{
						display.draw(x, y, '', '', SEEN_FLOOR);
					}
				}
				continue;
			}
			if(world.mapData[0][x][y]){
				display.draw(x, y, '', '', VISIBLE_WALL);
			}else{
				display.draw(x, y, '', '', VISIBLE_FLOOR);
			}
		}
	}

	display.draw(player.x, player.y, '@', '#fff', VISIBLE_FLOOR);
}
