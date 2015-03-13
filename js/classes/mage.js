'use strict';

function Mage(name, x, y){
	PC.call(this, name, 'Mage', x, y, '#448', 6, 12, 3);
}

Mage.prototype = Object.create(PC.prototype);

Mage.prototype.levelUp = function(){
	this.strength += Math.floor(Math.max(ROT.RNG.getNormal(3, 1), 1));
	this.maxHP += Math.floor(Math.max(ROT.RNG.getNormal(6, 1), 1));
	this.maxSP += Math.floor(Math.max(ROT.RNG.getNormal(2, 1), 1));
	this.hp = this.maxHP;
	this.sp = this.maxSP;
}

Mage.prototype.action = function(action){
	if(action === 'cast'){
		if(this.sp === 0){
			controller.dialog('%s is out of spell points.'.format(this.name));
			PC.prototype.action.call(this, action);
			return;
		}
		controller.getCoordinate(this.x, this.y, function(x, y){
			if(this.fovData[this.z][x][y]){
				var entity = world.entityData[this.z][x][y];
				if(entity){
					var damage = Math.max(Math.floor(ROT.RNG.getNormal(7*world.partyLevel, 7*world.partyLevel/3)), 0);
					entity.damage(damage);
					log.message('%s blasts %s for %s damage!'.format(
						this.name,
						entity.definiteArticle ? 'the ' + entity.name : entity.name,
						damage
					));
					this.movesRemaining = 0;
					this.sp--;
				}
			}
			PC.prototype.action.call(this, action);
		}.bind(this), 10);
	}else{
		PC.prototype.action.call(this, action);
	}
}
