/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
	// Write your code here
	const length = arr.length;
	let pos = 0;
	let neg = 0;
	let zero = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > 0) pos++;
		else if (arr[i] < 0) neg++;
		else zero++;
	}
	const posRatio = (pos / length).toFixed(6);
	const negRatio = (neg / length).toFixed(6);
	const zeroRatio = (zero / length).toFixed(6);

	console.log(posRatio);
	console.log(negRatio);
	console.log(zeroRatio);
}

plusMinus([-4, 3, -9, 0, 4, 1]);
