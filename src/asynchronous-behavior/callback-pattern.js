const paymentSuccess = true;
const marks = 80;

function enroll(callback) {
	console.log('Course enrollment is in progress ... ');

	setTimeout(function () {
		if (paymentSuccess) {
			callback();
		} else {
			console.log('Payment failed! 🚨');
		}
	}, 2000);
}

function progress(callback) {
	console.log('Course on progress ...');

	setTimeout(function () {
		if (marks >= 80) {
			callback();
		} else {
			console.log('You could get enough marks to get certificate. 🙁');
		}
	}, 3000);
}

function getCertificate() {
	console.log('Preparing your certificate...');

	setTimeout(function () {
		console.log('Congrats! You got the certificate. 🎉');
	}, 1000);
}

enroll(function () {
	progress(getCertificate);

	/**
	 * Callback HELL
	 */
	/* B(function(){
        C(function(){
            D(function(){
                E(function(){
                    F(function(){
                        // ...
                    })
                })
            })
        })
    }) */
});
