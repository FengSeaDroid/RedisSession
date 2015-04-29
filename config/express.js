var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

module.exports = function () {
    var app = express();
    app.use(logger("tiny"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser('yousecretcode'));
    app.use(expressSession({secret: 'yourothersecretcode', saveUninitialized: true, resave: true}));

    app.get('/session/set/:value', function(req, res) {
        req.session.mySession = req.params.value;
        res.send('session write success');
    });

    app.get('/session/get/', function(req, res) {
        if(req.session.mySession)
            res.send('the session value is: ' + req.session.mySession);
        else
            res.send("no session value");
    });

    app.set('port', 3000);
    app.use(express.static('./public'));
    return app;
};