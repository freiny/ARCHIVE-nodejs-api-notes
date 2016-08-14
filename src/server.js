'use strict';
const PORT = process.env.HTTP_PORT;
var bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/', onRoot);
app.get('/api', onAPI);
app.post('/api/code', onCode);
app.listen(PORT);
appReady()

// ****************************************************************
function onRoot(req, res){
	var a = 'hello global server world';
	const vm = require('vm');
	const script = new vm.Script(
		'console.log("BE Hello VM World");'
		, {
	  filename: 'main.js',
	  lineOffset: 1,
	  columnOffset: 1,
	  displayErrors: true,
	  timeout: 1000
	});
	var out = script.runInThisContext()

	res.send('BE Hello World! (http response)\n');
	console.log('BE ping onRoot()');
}

// ****************************************************************
function onAPI(req, res) {
	console.log('BE ping onAPI()');
	res.json({'name':'beapi'});
}

// ****************************************************************
function onCode(req, res) {
	console.log('BE ping onCode()');
	// ----------------------------------------------------------------
	// run vm script
	const util = require('util');
	const vm = require('vm');

	var webCode = req.body.msg;
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
		console = {};
		console.log = log;
	`;

	const script = new vm.Script(preCode + webCode);
	const sandbox = {};
	const context = new vm.createContext(sandbox);
	script.runInContext(context);

	// ----------------------------------------------------------------
	// get output for vm script

	var log = sandbox.vm.log;
	var out = '';
	for (var i=0; i<log.length; i++){
		for (var j=0; j<log[i].length; j++){
			// console.log();
			out += util.inspect(log[i][j]) + ' ';
		}
		out += '\n'
	}
	// ----------------------------------------------------------------
	console.log(out);
	// var out = util.inspect(sandbox.out);
	// var log = util.inspect(sandbox.vm.log);
	// console.log(util.inspect(sandbox));
	// console.log('SANDBOX:', sandbox);
	// for (var i=0; i<log.length; i++){
	// console.log(JSON.parse(JSON.stringify(out)));
	// console.log(JSON.parse(JSON.stringify(log)));
	// console.log(typeof JSON.parse(JSON.parse(JSON.stringify(log))));
	// }

	// const vm = require('vm');
	// const script = new vm.Script(
	// 	code
	// 	, {
	//   filename: 'main.js',
	//   lineOffset: 1,
	//   columnOffset: 1,
	//   displayErrors: true,
	//   timeout: 1000,
	// });
	// var out = script.runInThisContext();
	// console.log(out);

	//
	// const vm = require('vm');
	// vm.runInNewContext(`
	//   var util = require('util');
	//   console.log(util.isBoolean(true));
	// `, {
	//   require: require,
	//   console: console
	// });





	res.json({'msg':out});
	console.log('BE ping onRoot()');


}

// ****************************************************************
function appReady(){
	if (process.env.APP_ENVIRONMENT === 'dev'){
		console.log('****************** App Ready');
	}
}

// ****************************************************************
