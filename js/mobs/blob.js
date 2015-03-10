'use strict';

function Blob(x, y, z){
	Entity.call(this, 'blob', 'mob', x, y, z, 'b', '#484', 0, 10);
}

Blob.prototype = Object.create(Entity.prototype);
