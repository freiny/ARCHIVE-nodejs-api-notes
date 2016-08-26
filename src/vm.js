var webCode = process.argv[2];
// ----------------------------------------------------------------
// run vm script
//******************************
const util = require('util');
const vm = require('vm');

// var webCode = JSON.parse(fields.data);

var preCode = `
	var vm = {};
	vm.log = [];
	var logger = function(){
			var n=0;
			return function(){
					vm.log[n] = [];
					for(i=0; i<arguments.length; i++){
							vm.log[n].push(arguments[i]);
					}
					n++;
			}
	}
	var log = logger();
`;


const script = new vm.Script(preCode + webCode, {
	'filename': 'main.js',
	'lineOffset': -14,
	'displayErrors': true,
	'timeout': 1000
});
const sandbox = {
	'console': console
};
const context = new vm.createContext(sandbox);

script.runInContext(context);
// // ----------------------------------------------------------------
// // get output for vm script
// console.log(sandbox);
// var log = sandbox.vm.log;
// var out = '';
// for (var i=0; i<log.length; i++){
// 	for (var j=0; j<log[i].length; j++){
// 		console.log();
// 		out += util.inspect(log[i][j]) + ' ';
// 	}
// 	out += '\n'
// }
// // ----------------------------------------------------------------
// console.log(out);
