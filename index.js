/* Copyright (C) 2017 MetaMakerSpace */


//
// helpers
global.__root = __dirname;


//
// declarations
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(), server,
    config = {
        port: process.env.PORT || 3000
    };


//
// initializations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//
// publics
app.use('/', express.static(__dirname+'/statics'));
app.use('/', function(req, res, next) {
    res.sendFile(__dirname+'/statics/index.html');
});


//
// errors
app.use(function(req, res, next) {
    res.status(404).send('404 Resource Not Found');
});
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('500 Internal Server Error');
});


//
// START
server = app.listen(config.port, function() {
    console.log('Listening at http://%s:%s',
        server.address().address,
        server.address().port
    );
});
