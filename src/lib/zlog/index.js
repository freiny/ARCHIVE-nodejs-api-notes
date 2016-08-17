"use strict";
var util = require('util');

var obj = {};
obj.temp = {};
obj.hook = function(){
		obj.temp = hook_stderr(function(string, encoding, fd) {
			util.debug('stdout: ' + util.inspect(string))
			// console.error('stdout: ' + util.inspect(string))
		});
};

obj.unhook = function(){
	obj.hook();
};

function hook_stdout(callback) {
		var old_write = process.stdout.write;

		process.stdout.write = (function(write) {
				return function(string, encoding, fd) {
						write.apply(process.stdout, arguments);
						callback(string, encoding, fd);
				}
		})(process.stdout.write);

		return function() {
				process.stdout.write = old_write;
		}
}

function hook_stderr(callback) {
		var old_write = process.stderr.write;

		process.stdout.write = (function(write) {
				return function(string, encoding, fd) {
						write.apply(process.stderr, arguments);
						callback(string, encoding, fd);
				}
		})(process.stderr.write);

		return function() {
				process.stderr.write = old_write;
		}
}


module.exports = obj;
