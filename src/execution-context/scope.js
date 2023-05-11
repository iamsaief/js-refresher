/**
 * Discover Lexical Scope
 */

function hello() {
	var msg = 'Hello World!';
}
hello();
console.log(msg); // ReferenceError
