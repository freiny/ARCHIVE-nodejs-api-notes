'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const rootRouter = express.Router();
app.use('/', rootRouter);
rootRouter.get('/', function(req, res){
 	res.json({'message': 'root'});
});

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.get('/', function(req, res){
 	res.json({'message': 'api'});
});

app.listen(PORT);
console.log('[LISTEN] port', PORT);

// $ curl localhost:3000
// OUTPUT: {"message":"root"}
// $ curl localhost:3000/
// OUTPUT: {"message":"root"}

// $ curl localhost:3000/test
// OUTPUT: Cannot GET /test

// $ curl localhost:3000/api
// OUTPUT: {"message":"api"}
// $ curl localhost:3000/api/
// OUTPUT: {"message":"api"}

// $ curl localhost:3000/api/test
// OUTPUT: Cannot GET /api/test
