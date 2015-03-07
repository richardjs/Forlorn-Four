// Create a multidimensional array
// Usage: createArray(20, 5, 10, 3) creates a 4D array of passed sizes
// Adapted from http://stackoverflow.com/a/17776304
function createArray(size) {
	var a = new Array(size || 0)
	var i = size;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) a[i] = createArray.apply(this, args);
	}
	return a;
}
