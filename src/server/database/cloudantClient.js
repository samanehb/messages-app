import {config} from '../appconfig';
import ErrorModel from '../models/errorModel';
import {ErrorCodes} from '../helpers/errorCodes';
import {Strings} from '../strings/strings-en';
const Cloudant = require('cloudant');
const messagesById = require('./designDocs/messagesById.json'); // TODO keep an array, read all files in that directory

// database connection info
const dbname = config.database.name;
const dbuser = config.database.username;
const dbpass = config.database.password;

// database object (the cloudant client)
let database;

// view names
const MSGS_BY_ID = 'byId';

/**
 * Create database and add the design docs
 */
export function initializeDb() {
    return new Promise((resolve, reject) => {
        if(database) {
            // database already initialized
            return resolve();
        }
        const errObj = new ErrorModel(ErrorCodes.DATABASE_INIT_FAIL, Strings.ERROR_INTERNAL_SERVER);
        // Connect to cloudant account
        Cloudant({account:dbuser, password:dbpass}, (err, cloudant) => {
            if(err || !cloudant) {
                console.log(`Database connection failed. ${err}`);
                // no need to crash, we retry on api calls, and will return 500 if still not successful
                return reject(errObj);
            }
            // connection successful, now initialize the database
            // since this is just an assignment and there is no login for this project, 
            // it is good to delete this db on each startup to avoid having it grow
            cloudant.db.destroy(dbname, (err) => {
                if(err) {
                    console.log(`Error in destroying db: ${err}`);
                    return reject(errObj);
                }
                cloudant.db.create(dbname, (err) => {
                    if(err) {
                        console.log(`Error in creating db: ${err}`);
                        return reject(errObj);
                    }
                    database = cloudant.db.use(dbname);
                    if(!database) {
                        console.log(`Database access failed: ${err}`);
                        return reject(errObj);
                    }
                    database.insert(messagesById, (err) => {
                        if(err) {
                            console.log(`Error in inserting design doc ${messagesById._id}, error: ${err}`);
                            return reject(errObj);
                        }
                        return resolve();
                    });
                });
            });            
        });        
    });
}

/**
 * Function to be called before any attempt to do api operations. This make sure database is initialized
 */
function checkDatabase(reject, callback) {
    if(!database) {
        initializeDb().then(() => {
            return callback(); // initialized, continue
        }).catch((errObj) => {
            return reject(errObj); // reject the call right away
        });
    } else {
        // everything good, continue
        return callback();
    }
}

/**
 * Insert the object to database
 * Returns a promise resolved by the cloudant document after insertion
 * Note: obj must have implemented getPersistedModel and getPersistedModel() must return a non-empty document/obj
 *     , otherwise promise is rejected
 */
export function insert(obj) {
    return new Promise((resolve, reject) => {
        // make sure database is initialized, reject call if not.
        checkDatabase(reject, () => {
            const errNonPersistable = new ErrorModel(ErrorCodes.ATTEMPT_TO_PERSISTE_NONPERSISTING, Strings.ERROR_INTERNAL_SERVER);
            if(!obj.getPersistedModel) { // make sure obj is of proper type/structure (to avoid programming error)
                return reject(errNonPersistable);
            }
            const doc = obj.getPersistedModel();
            if(!doc || doc === {}) { // make sure a persistance model is defined for this model
                return reject(errNonPersistable);
            }
            database.insert(doc, (err, data) => {
                if(err || !data.ok) {
                    // a database error has ocurred 
                    console.log(`Error in insertion: ${err || data.ok}`);
                    return reject(new ErrorModel(ErrorCodes.DATABASE_INSERT_FAIL, Strings.ERROR_INTERNAL_SERVER));
                }
                // update object's info with data from database (document id and rev)
                obj._id = data.id;
                obj._rev = data.rev;
                return resolve(obj);                
            });
        });
    });
}


function getDesignName(designDoc) {
    // this method can be extended for more object types and views
    // _id of a design doc is '_design/' concatenated with the view name
    return designDoc._id.replace('_design/', '');
}

/**
 * Get all message
 * Returns a promise that is resolved by the returned list of database documents (caller needs to convert to appropriate model)
 */
export function getAllMessages() {
    return new Promise((resolve, reject) => {
        // make sure database is initialized, reject call if not.
        checkDatabase(reject, () => {
            database.view(getDesignName(messagesById), MSGS_BY_ID, (err, data) => {
                if(err) {
                    // a database error has ocurred 
                    console.log(`Error in getAllMessages: ${err}`);
                    return reject(new ErrorModel(ErrorCodes.DATABASE_GETALL_FAIL, Strings.ERROR_INTERNAL_SERVER));
                }
                const results = [];
                data.rows.forEach((doc) => {
                    console.log(doc.value);
                    results.push(doc.value);
                });
                return resolve(results);           
            });
        });
    });
}