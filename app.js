var express = require('express'),
    Redis = require('ioredis'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var client = new Redis(6379, '192.168.59.103'),//CREATE REDIS CLIENT
    app = express();

app.use(logger("tiny"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var router = express.Router();

//GET KEY'S VALUE
router.get('/redis/get/:key', function(req, response) {
    client.get(req.params.key, function (error, val) {
        if (error !== null) console.log("error: " + error);
        else {
            response.send("The value for this key is " + val);
        }
    });
});

//SET KEY'S VALUE
router.get('/redis/set/:key/:value', function(req, response) {
    client.set(req.params.key, req.params.value, function (error, result) {
        if (error !== null) console.log("error: " + error);
        else {
            response.send("The value for '"+req.params.key+"' is set to: " + req.params.value);
        }
    });
});

app.use('/', router);
var server = app.listen(8097, function() {
    console.log('BASIC REDIS server is listening on port %d', server.address().port);
});