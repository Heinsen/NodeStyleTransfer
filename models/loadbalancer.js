//This file will contain functions for contacting the loadbalancer
var express = require('express');
var zmq = require('zmq');
var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

var loadBalancerIP = "13.75.157.66"

function startStyleTransfer(contentImagePath, styleImagePath, callback) {
	console.log(contentImagePath);
	console.log(styleImagePath);
	
	var requester = zmq.socket('req');

	requester.on("message", function(reply) {
    		process.exit(0);
	});

	
	requester.connect("tcp://"+loadBalancerIP+":5555");

	//REmove next lane when not on local host. TO BE TESTED WITHOut!
	console .log(addresses);
	styleImagePath = addresses[0] + '/' + styleImagePath;
	contentImagePath = addresses[0] + '/' + contentImagePath;
  	requester.send(addresses[0] + "#" + styleImagePath + "#" + contentImagePath);

	callback('Style transfer started');
	//When the function is done, the function callback can be used to deliver the result
}

module.exports = {
  startstyletransfer : startStyleTransfer
}
