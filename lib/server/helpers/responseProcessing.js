'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.process = process;
exports.getApiVersion = getApiVersion;
/**
 * Process response from apis to make it consumable by client
 * result: an object containing following:
 *      status  : http status code
 *      data    : returned data. This can be an error object 
 */
function process(result, req, res) {
    //res.end(responseobj); // must do
    // TODO ETag
    // TODO response zipping  
    //If Content-Encoding is set on the response, use the specified algorithm. If it is missing, assume GZIP.
    // Our API will attempt to honor your requested encoding (either GZIP or DEFLATE), falling back to GZIP if the header doesn't arrive or is modified en route
    // TODO print nicely
    if (!result.status) {
        result.status = 500;
    }
    res.status(result.status).send(result.data);
}

function getApiVersion(req) {
    return 'v1'; // TODO
}