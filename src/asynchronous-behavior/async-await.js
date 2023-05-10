const paymentSuccess = true;
const marks = 80;

function enroll() {
	console.log('Course enrollment is in progress ... ');

	const promise = new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (paymentSuccess) {
				resolve();
			} else {
				reject('Payment failed! 🚨');
			}
		}, 2000);
	});

	return promise;
}

function progress() {
	console.log('Course on progress ...');

	const promise = new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (marks >= 80) {
				resolve();
			} else {
				reject('You could get enough marks to get certificate. 🙁');
			}
		}, 3000);
	});

	return promise;
}

function getCertificate() {
	console.log('Preparing your certificate...');

	const promise = new Promise(function (resolve) {
		setTimeout(function () {
			resolve('Congrats! You got the certificate. 🎉');
		}, 1000);
	});

	return promise;
}

async function course() {
	try {
		await enroll();
		await progress();
		const msg = await getCertificate();
		console.log(msg);
	} catch (error) {
		console.log(error);
	}
}
course();

// enroll()
// 	.then(progress)
// 	.then(getCertificate)
// 	.then(function (value) {
// 		console.log(value);
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	});
