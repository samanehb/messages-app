/**
 * app entry, setting up server and api middlewares and main paths
 */
import {config} from './appconfig';
const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
//const https = require('https');
//var logger = require('morgan');
import {initializeDb} from './database/cloudantClient';
import ErrorModel from './models/errorModel';

const app = express();

// prefix for all api paths
const api = '/api';


//app.use(logger('dev'));

function initApiHandlers() {
    const messages = require('./routes/messages');

    app.use(bodyParser.json());
    // we only allow application/json content type
    app.use((req, res, next) => {
        if((req.method === 'POST' || req.method === 'PUT')
            && req.headers['content-type'] !== 'application/json') {
            const err = new ErrorModel(undefined, 'Content-type must be application/json');
            err.status = 415; // Unsupported Media Type
            next(err);
        } else {
            next();
        }
    });
    
    // since non-js files are not moved by babel, we need to direct to server
    app.use(express.static(__dirname + '/../../src/server/public'));

    app.use(`${api}`, messages);

    // handle 404 and forwarding to error handler. This middleware is only reached if none of paths above fully handled the request
    app.use((req, res, next) => {
        const err = new ErrorModel(undefined, 'Not Found');
        err.status = 404;
        next(err); // propagate to error handler
    });

    // error handler, build error obj, no stacktraces
    app.use((err, req, res, next) => {
        if(err && err.modelName !== 'ErrorModel') {
            // if error is of type ErrorModel then it is good already, otherwise add getApiModel to make it easy to handle similar to ErrorModel
            // hide error details
            err.getApiModel = () => {
                return {message: err.message} // .message comes from builtin Error object
            };
        }
        res.status(err.status || 500).send(err.getApiModel());
    });
}

function initServer() {
    initApiHandlers();
    // run server
    http.createServer(app).listen(config.port, () => {
        console.log(`server listening on port ${config.port}`);
    });
}

/**
 * Connect to cloudant account, try to create db and initialize it. 
 *  needs to be done first, to prepare before an api call comes in.
 * If it fails (rejected), it is ignored here since it will be tried again on future api calls
 */
initializeDb().then(() => {
    initServer(); // initialized db, allow api calls to come in
}).catch(() => {
    initServer(); // let's ignore, first api call will repeat this
});

