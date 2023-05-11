/**
 * Execution Context
 * Execution Stack: Nested function example
 * Discovering Hoisting
 */
var a = 1;
function one() {
	console.log(a); // 1
	function two() {
		console.log(b); // undefined
		var b = 2;
		function three(d) {
			console.log(c + d); // ReferenceError
			let c = 3;
			// console.log(c + d); // 7
		}
		three(4);
	}
	two();
}
one();
