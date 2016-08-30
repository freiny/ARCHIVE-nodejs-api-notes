'use strict';
const PORT = process.env.HTTP_PORT;
var bodyParser = require('body-parser');
var formidable = require('formidable');
var cors = require('cors');
var redis = require('redis');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', onRoot);
app.get('/api', apiGet);
app.post('/api', apiPost);
app.options('/api/code', apiCodeOptions);
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
function apiCodeOptions(req, res) {
	console.log('[BE onCodeOptions()]');
	res.json({'msg':'heyba'});
}
// ****************************************************************
function apiCodePost(req, res) {
	console.log('[BE apiCodePost()]');

	var onData = function (err, fields, files) {
		var code = JSON.parse(fields.data);
		var exec = require('child_process').exec;
		var onDone = function(error, stdout, stderr) {
			console.log('onDone...');
			// console.log('ERR:', error);
			// console.log('SOUT:', stdout);
			// console.log('SERR:', stderr);
			// res.json(JSON.stringify(stdout));
			res.json(JSON.stringify(stderr + stdout));

		};
		// exec("ls -la", onDone);
		// exec("node vm.js " + fields.data, onDone);
		exec('node vm.js ' + '"' + code + '"' , onDone);






		// res.json(JSON.stringify({'msg':out}));


	};

	var form = new formidable.IncomingForm();
	form.parse(req, onData);


}

// ****************************************************************
function appReady(){
	if (process.env.APP_ENVIRONMENT === 'dev'){

		var nu = require('./lib/netutil');
		// nu.findDevice('balancer', 4000);
		nu.setDevice('gateway', nu.getNetwork() + 1, 4000);
		nu.findDevice('redis', 6379, function(){
			console.log('DEVICES:');
			console.log(nu.getDevices())
			console.log('ADDRESSES:');
			console.log(nu.getAddresses());

			var redisConf = nu.getDevices()['redis'];
			// var client = redis.createClient({
			// 	'host':redisConf['address'],
			// 	'port':redisConf['port'],
			// 	'password':'mypassword'
			// });
			var client = redis.createClient({
				'host':redisConf.address,
				'port':redisConf.port,
			});
			client.on("error", function (err) {
    		console.log("Error " + err);
			});

			// client.hset('open', "host", "some value", redis.print);
			// client.set("k", "v", redis.print);
			// client.set("k1", "v1", redis.print);
			// client.set("k2", "v2", redis.print);
			// client.set("k3", "v3", redis.print);
			// client.set("k4", "v4", redis.print);
			// client.set("k5", "v5", redis.print);
			// client.del("k2", redis.print);
			// client.del("k4", redis.print);

		});
		// nu.findDevice('redis', 6379);
		console.log('****************** App Ready');

		// var nd = require('./lib/netdev');
		// nd.help();
		//
		// var nu = require('./lib/netutil');
		// nu.help();

		// // var client = redis.createClient(6379, );
		// var client = redis.createClient();
		// client.on("error", function (err) {
    // 	console.log("Error " + err);
		// });



	} else {

	}
}

// ****************************************************************
