'use strict';

var _appconfig = require('./appconfig');

var _cloudantClient = require('./database/cloudantClient');

var express = require('express'); /**
                                   * app entry, setting up server and api middlewares and main paths
                                   */

var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
//var logger = require('morgan');


var app = express();

// prefix for all api paths
var api = '/api';

//app.use(logger('dev'));

function init() {

    var messages = require('./routes/messages');

    app.use(bodyParser.json());

    // generic error handling, when no other means have been successful
    app.use(function (req, res, next) {
        req.on('error', function (err) {
            console.error(err.stack);
        });
        res.on('error', function (err) {
            console.error(err);
        });
        next();
    });

    app.get(api + '/tickets', function (req, res) {
        res.end('ticket here');
    });

    app.use('' + api, messages);

    app.get(api + '/books', function (req, res) {
        res.end('book here');
    });

    // handle 404 and forwarding to error handler. This middleware is only reached if none of paths above fully handled the request
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err); // propagate to error handler
    });

    // error handler, build error obj, no stacktraces
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: {}
        });
    });
}

init();
http.createServer(app).listen(_appconfig.config.port, function () {
    console.log('server listening on port ' + _appconfig.config.port);
});
//https.createServer(options, app).listen(443);