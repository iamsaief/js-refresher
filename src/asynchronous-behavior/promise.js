/**
 * "I Promise a Result!"
 * "Producing Code" is code that take some time
 * "Consuming Code" is code thar must wait for the result
 * A Promise is a JavaScript object that links producing code and consuming code
 */

const flag = true;

console.log('Task 1');

// Promise definition
const promise = new Promise(function (resolve, reject) {
	setTimeout(function () {
		if (flag) {
			resolve('Task 2');
		} else {
			reject('Failed! 🚨');
		}
	}, 2000);
});

// Promise call
promise
	.then(function (value) {
		console.log(value);
	})
	.catch(function (error) {
		console.log(error);
	});

console.log('Task 3');
