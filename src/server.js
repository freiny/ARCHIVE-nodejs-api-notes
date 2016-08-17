'use strict';
const PORT = process.env.HTTP_PORT;
var rlog = require('./lib/rlog');
var bodyParser = require('body-parser');
var cors = require('cors');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', onRoot);
app.get('/api', apiGet);
app.post('/api', apiPost);
app.post('/api/code', apiCodePost);
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
function apiGet(req, res) {
	console.log('be apiGet()');
	res.json({'name':'beapi'});
}

// ****************************************************************
function apiPost(req, res) {
	console.log('be apiPost() ...');
	res.json({'msg':'be apiPost() json response'});
}
// ****************************************************************
function apiCodePost(req, res) {
	console.log('be onCode() ...');
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


	const script = new vm.Script(preCode + webCode, {
		'filename': 'main.js',
		'displayErrors': true
	});
	const sandbox = {};
	const context = new vm.createContext(sandbox);

	// rlog.hook();

	script.runInContext(context);
	// rlog.unhook();
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
	res.json({'msg':out});
}

// ****************************************************************
function appReady(){
	if (process.env.APP_ENVIRONMENT === 'dev'){
		console.log('****************** App Ready');
		// console.log(process.cwd());
		// console.log('a');
		// console.log('b');
		// rlog.hook();
		// console.log('c');
		// console.log(1);
		// rlog.unhook();
		// console.log(2);
		// console.log(3);
	}
}

// ****************************************************************
