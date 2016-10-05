'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router();
app.use('/', router);
router.get('/', function(req, res){
 	res.json({'message': 'root'});
});

app.listen(PORT);
console.log('[LISTEN] port', PORT);

// $ curl localhost:3000
// OUTPUT: {"message":"root"}
// $ curl localhost:3000/
// OUTPUT: {"message":"root"}

// $ curl localhost:3000/test
// OUTPUT: Cannot GET /test
