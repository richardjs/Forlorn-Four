'use strict';

function Blob(x, y, z){
	Entity.call(this, 'blob', 'mob', x, y, z, 'b', '#484', 10, 100);
}

Blob.prototype = Object.create(Entity.prototype);
