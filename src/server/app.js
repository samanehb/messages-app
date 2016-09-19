/**
 * app entry, setting up server and api middlewares and main paths
 */
import {config} from './appconfig';
const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const https = require('https');
//var logger = require('morgan');
import {CloudantClient} from './database/cloudantClient';

const app = express();

// prefix for all api paths
const api = '/api';


//app.use(logger('dev'));

function init() {
    
    const messages = require('./routes/messages');

    app.use(bodyParser.json());

    // generic error handling, when no other means have been successful
    app.use((req, res, next) => {
        req.on('error', (err) => {
            console.error(err.stack);
        });
        res.on('error', (err) => {
            console.error(err);
        });
        next();
    });

    app.get(`${api}/tickets`, (req, res) => {
        res.end('ticket here');
    });

    app.use(`${api}`, messages);

    app.get(`${api}/books`, (req, res) => {
        res.end('book here');
    });

    // handle 404 and forwarding to error handler. This middleware is only reached if none of paths above fully handled the request
    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err); // propagate to error handler
    });

    // error handler, build error obj, no stacktraces
    app.use((err, req, res, next) => {
        res.status(err.status || 500).send({
            message: err.message,
            error: {}
        });
    });
}

init();
http.createServer(app).listen(config.port, () => {
    console.log(`server listening on port ${config.port}`);
});
//https.createServer(options, app).listen(443);
