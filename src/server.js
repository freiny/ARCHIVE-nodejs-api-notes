'use strict';

const express = require('express');
const PORT = process.env.HTTP_PORT;

const app = express();
app.get('/', function (req, res) {
  res.send('Hello World!\n');
	console.log("ping");
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
