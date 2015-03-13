'use strict';

function Cleric(name, x, y){
	PC.call(this, name, 'Cleric', x, y, '#bbb', 6, 12, 10);
}

Cleric.prototype = Object.create(PC.prototype);

Cleric.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(3, 1), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(6, 1), 1));
	this.maxSP += Math.floor(Math.max(ROT.RNG.getNormal(5, 2), 1));
	this.hp = this.maxHP;
	this.sp = this.maxSP;
}

Cleric.prototype.action = function(action){
	if(action === 'cast'){
		if(this.sp === 0){
			controller.dialog('%s is out of spell points.'.format(this.name));
			PC.prototype.action.call(this, action);
			return;
		}
		controller.getCoordinate(this.x, this.y, function(x, y){
			var entity = world.entityData[this.z][x][y];
			if(entity){
				var health = Math.floor(ROT.RNG.getNormal(8*world.partyLevel, 8*world.partyLevel/6));
				entity.hp += health;
				if(entity.hp > entity.maxHP){
					entity.hp = entity.maxHP;
				}
				log.message('%s heals %s for %s HP!'.format(
					this.name,
					entity.definiteArticle ? 'the ' + entity.name : entity.name,
					health
				));
				this.movesRemaining = 0;
				this.sp--;
			}
			PC.prototype.action.call(this, action);
		}.bind(this), 5);
	}else{
		PC.prototype.action.call(this, action);
	}
}
