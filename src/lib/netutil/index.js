"use strict";

var obj = {};

obj.devices = {};
obj.addresses = {};

obj.help = function(){
	console.log('netutil');
};

obj.getDevices = function(){
	// return obj.devices;
	return this.devices;
};

obj.getAddresses = function(){
	// return obj.devices;
	return this.addresses;
};

obj.getNetwork = function(){
	var ifaces = require('os').networkInterfaces();
	var address = Object.keys(ifaces).reduce(function (result, dev) {
		return result.concat(ifaces[dev].reduce(function (result, details) {
			return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
		}, []));
	});
	var parts = address.toString().substring(2).split('.');
	return parts[0] + '.' + parts[1] + '.' + parts[2] +  '.';
};

obj.getIP = function(){
	var ifaces = require('os').networkInterfaces();
	var address = Object.keys(ifaces).reduce(function (result, dev) {
		return result.concat(ifaces[dev].reduce(function (result, details) {
			return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
		}, []));
	});
	return address.toString().substring(2);
};

obj.setDevice = function(name, address, port){
	this.devices[name] = {'name':name, 'address':address, 'port':port};
	// this.devices[name] = address + ':' + port;
	this.addresses[address] = {'name':name, 'address':address, 'port':port};
};

obj.findDevice = function(name, port, callback){
	console.log('ip:', this.getIP());
	var exec = require('child_process').exec;
		// exec('nc -v --help', onDone);
	var net = this.getNetwork();
	for (let i=0; i<256; i++){
		var exec = require('child_process').exec;
		var onDone = function(error, stdout, stderr) {
			var address = net + i;
			if (obj.addresses[address] === undefined && error === null){
				// if (error === null) {
					// console.log(address);
				// }
				obj.setDevice(name, address, port);
				// obj.setDevice(name, address, port);
				callback();
			}
			// console.log(stderr);
			// console.log(stdout);
				// console.log('nc -z ' + net + i + ' ' + port, stdout);
		};
		exec('nc -z ' + net + i + ' ' + port, onDone);
	}
};

module.exports = obj;
