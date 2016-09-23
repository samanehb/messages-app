/**
 * Process response from apis to make it consumable by client
 * result: an object containing following:
 *      status  : http status code
 *      data    : returned data. This can be an error object 
 */
export function process(result, req, res) {
    // TODO ETag
    // TODO response zipping  copied:
        //If Content-Encoding is set on the response, use the specified algorithm. If it is missing, assume GZIP.
        // Our API will attempt to honor your requested encoding (either GZIP or DEFLATE), falling back to GZIP if the header doesn't arrive or is modified en route
    // TODO print nicely
    if(!result.status) {
        result.status = 500;
    }
    res.status(result.status).send(result.data);
}

/**
 * Get version from req.url
 * Note that this is called after successful routing to existing apis, 
 *  so it relys on the rule that we always add a vX to the beginning of path
 */
export function getApiVersion(req) {
    let match = req.url.match(/^\/v\d\//); // match starting with /v\d/ -> e.g. /v1/ 
    if(!match || !match[0]) {
        return '';
    }
    match = match[0].replace(/\//g,''); // replace the '/'s surrounding v\d
    console.log(match);
    return match;
}