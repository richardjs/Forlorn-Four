'use strict';

// enum for map data
var MAP = {
	FLOOR: 0,
	WALL: 1,
	STAIR_UP: 2,
	STAIR_DOWN: 3
}

function World(){
	this.entities = [];
	this.pcs = [];
	this.entityData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);

	this.maps = [];
	this.mapData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);
	this.seenData = createArray(WORLD_LEVELS, WORLD_WIDTH, WORLD_HEIGHT);

	this.lastDrawnZ = 0;

	// Generate map
	for(var level = 0; level < WORLD_LEVELS; level++){
		// Generate map for level
		var map = new ROT.Map.Digger(WORLD_WIDTH, WORLD_HEIGHT, {
			dugPercentage: .65,
			roomWidth: [ROOM_WIDTH_MIN, ROOM_WIDTH_MAX],
			roomHeight: [ROOM_HEIGHT_MIN, ROOM_HEIGHT_MAX],
			corridorLength: [CORRIDOR_LENGTH_MIN, CORRIDOR_LENGTH_MAX]
		});
		map.create(function(x, y, wall){
			if(wall === 1){
				this.mapData[level][x][y] = MAP.WALL;
			}else{
				this.mapData[level][x][y] = MAP.FLOOR;
			}
		}.bind(this));
		this.maps.push(map);

		// Place stairs on the level
		var upRoom = map.getRooms()[Math.floor(map.getRooms().length*Math.random())];
		var stairX;
		var stairY;
		if(level === 0){
			stairX = upRoom.getCenter()[0];
			stairY = upRoom.getCenter()[1];
		}else{
			stairX = Math.floor((upRoom.getRight() - upRoom.getLeft()) * Math.random()) + upRoom.getLeft();
			stairY = Math.floor((upRoom.getBottom() - upRoom.getTop()) * Math.random()) + upRoom.getTop();
		}
		this.mapData[level][stairX][stairY] = MAP.STAIR_UP;
		map.stairUp = {
			x: stairX,
			y: stairY
		};
		if(level !== WORLD_LEVELS - 1){
			var downRoom;
			do{
				downRoom = map.getRooms()[Math.floor(map.getRooms().length*Math.random())];
			}while(downRoom === upRoom);
			stairX = Math.floor((downRoom.getRight() - upRoom.getLeft()) * Math.random()) + upRoom.getLeft();
			stairY = Math.floor((downRoom.getBottom() - upRoom.getTop()) * Math.random()) + upRoom.getTop();
			this.mapData[level][stairX][stairY] = MAP.STAIR_DOWN;
			map.stairDown = {
				x: stairX,
				y: stairY
			};
		}
	}
}

World.prototype.draw = function(z){
	if(typeof(z) === 'undefined'){
		z = this.lastDrawnZ;
	}

	// Combine PCs' FOV data
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

	// Draw map
	for(var x = 0; x < WORLD_WIDTH; x++){
		for(var y = 0; y < WORLD_HEIGHT; y++){
			if(!fovData[x][y] && !this.seenData[z][x][y]){
				display.draw(x, y, '', '', UNSEEN_COLOR);
				continue;
			}

			switch(this.mapData[z][x][y]){
				case MAP.WALL:
					display.draw(x, y, '', '', WALL_COLOR);
					break;
				case MAP.FLOOR:
					if(fovData[x][y]){
						display.draw(x, y, '', '', VISIBLE_FLOOR_COLOR);
					}else{
						display.draw(x, y, '', '', SEEN_FLOOR_COLOR);
					}
					break;
				case MAP.STAIR_UP:
					if(fovData[x][y]){
						display.draw(x, y, '<', '#fff', VISIBLE_FLOOR_COLOR);
					}else{
						display.draw(x, y, '<', '#fff', SEEN_FLOOR_COLOR);
					}
					break;
				case MAP.STAIR_DOWN:
					if(fovData[x][y]){
						display.draw(x, y, '>', '#fff', VISIBLE_FLOOR_COLOR);
					}else{
						display.draw(x, y, '>', '#fff', SEEN_FLOOR_COLOR);
					}
					break;
			}
		}
	}

	// Draw entities
	this.entities.forEach(function(entity){
		if(entity.z !== z){
			return;
		}
		if(!fovData[entity.x][entity.y]){
			return;
		}

		var bgColor;
		if(entity.active){
			bgColor = ACTIVE_ENTITY_COLOR;
		}else{
			bgColor = VISIBLE_FLOOR_COLOR;
		}

		display.draw(entity.x, entity.y, entity.char, entity.color, bgColor);
	}.bind(this));

	this.lastDrawnZ = z;
}

World.prototype.findOpenSpace = function(z){
	var x;
	var y;
	do{
		x = Math.floor(Math.random() * WORLD_WIDTH);
		y = Math.floor(Math.random() * WORLD_HEIGHT);
	}while(this.mapData[z][x][y] === MAP.WALL || this.entityData[z][x][y]);
	return {x: x, y: y}
}
