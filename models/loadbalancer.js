//This file will contain functions for contacting the loadbalancer
var express = require('express')

function startStyleTransfer(contentimagepath, styleimagepath, callback) {
	console.log(contentimagepath);
	console.log(styleimagepath);

	callback('everything is good from here');
	//When the function is done, the function callback can be used to deliver the result
}

module.exports = {
  startstyletransfer : startStyleTransfer
}