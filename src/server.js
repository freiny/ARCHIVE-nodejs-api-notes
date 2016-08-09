'use strict';

const express = require('express');
const PORT = process.env.HTTP_PORT;

const app = express();
app.get('/', onRoot);

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


function onRoot(req, res){
	var a = "hello global server world";
	const vm = require('vm');
	const script = new vm.Script(
		'console.log("Hello VM World");'
		, {
	  filename: 'main.js', // filename for stack traces
	  lineOffset: 1,
	  columnOffset: 1,
	  displayErrors: true,
	  timeout: 1000 // ms
	});
	var out = script.runInThisContext()

	res.send('Hello World!\n');
	console.log("ping");



}
