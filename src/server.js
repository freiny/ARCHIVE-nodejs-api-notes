'use strict';
const PORT = process.env.HTTP_PORT;
const express = require('express');
const app = express();

app.get('/', onRoot);
app.get('/api', onAPI);
app.get('/api/test', apiTest);
app.listen(PORT);
appReady()

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
	console.log('BE ping');
}

function apiTest(req, res) {
	console.log('BE ping apiTest()');
	res.json({'msg':'BE apiTest() json response'});
}

function onAPI(req, res) {
	console.log('BE ping apiTest()');
	res.json({'name':'beapi', 'port':PORT});
}

function appReady(){
	if (process.env.APP_ENVIRONMENT === 'dev'){
		console.log('****************** App Ready');
	}
}

function getIP(){
	var ifaces = require('os').networkInterfaces();
	var address = Object.keys(ifaces).reduce(function (result, dev) {
		return result.concat(ifaces[dev].reduce(function (result, details) {
			return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
		}, []));
	});
	return address.toString().substring(2);
}
