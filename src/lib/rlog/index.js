"use strict";
var util = require('util');

var obj = {};
obj.temp = {};
obj.hook = function(){
		obj.temp = hook_stdout(function(string, encoding, fd) {
		    util.debug('stdout: ' + util.inspect(string))
		});
};

obj.unhook = function(){
	this.hook();
};
// obj.init = function(){
//
// 	console.log('a');
// 	console.log('b');
//
// 	var unhook =
//
// 	console.log('c');
// 	console.log('d');
//
// 	unhook();
//
// 	console.log('e');
// 	console.log('f');
//
// };

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


module.exports = obj;
