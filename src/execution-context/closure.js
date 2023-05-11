/**
 * Discover Closure
 */
var sum = 0;

function doSum(a) {
	return function (b) {
		return a + b;
	};
}

var temp = doSum(2);
sum = sum + temp(8);
