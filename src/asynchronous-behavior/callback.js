/**
 * Asynchronous: Callback syntax
 * "I will finish later !"
 * Functions running in parallel with other functions are called asynchronous
 * A good example is JavaScript setTimeout()
 */

function calculator(num1, num2, callback) {
	let sum = num1 + num2;

	if (callback) callback(sum);

	return sum;
}

calculator(5, 10, function (result) {
	console.log(result);
});

console.log('Task 1');

setTimeout(function () {
	console.log('Task 2');
}, 1000);

console.log('Task 3');
