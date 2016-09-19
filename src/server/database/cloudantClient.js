import {config} from '../appconfig';
//import ObjectModel from '../models/objectModel';
const Cloudant = require('cloudant');

const dbname = config.database.name;
const dbuser = config.database.username;
const dbpass = config.database.password;

// need to be done once, when module loads. scoped to this module
const cloudant = Cloudant({account:dbuser, password:dbpass}, (err) => {
    if(err) {
        console.log('Database connection failed.');
        console.log(err);

        // TODO retry mechanism
    }
});
const db = cloudant.db.use(dbname);

// TODO programatically create database and its indexes / update them

export class CloudantClient {

}

export function insert(obj, callback) {
    if(obj.getPersistedModel) { // if obj is of proper type/structure
        const doc = obj.getPersistedModel();
        if(doc && doc !== {}) { // if a persistance model is defined for this model
            db.insert(doc, (err, data) => {
                if(!err && !data.ok) {
                    // cloudant client must return ok=true, otherwise there is a problem
                    err = 'ok not received';
                }
                console.log("Error:", err);
                console.log("Data:", data);
                // update object's info with data from database
                obj._id = data.id;
                obj._rev = data.rev;
                callback(err, obj);
            });
        }
    }
}