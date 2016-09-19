'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CloudantClient = undefined;
exports.insert = insert;

var _appconfig = require('../appconfig');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import ObjectModel from '../models/objectModel';
var Cloudant = require('cloudant');

var dbname = _appconfig.config.database.name;
var dbuser = _appconfig.config.database.username;
var dbpass = _appconfig.config.database.password;

// need to be done once, when module loads. scoped to this module
var cloudant = Cloudant({ account: dbuser, password: dbpass }, function (err) {
    if (err) {
        console.log('Database connection failed.');
        console.log(err);

        // TODO retry mechanism
    }
});
var db = cloudant.db.use(dbname);

// TODO programatically create database and its indexes / update them

var CloudantClient = exports.CloudantClient = function CloudantClient() {
    _classCallCheck(this, CloudantClient);
};

function insert(obj, callback) {
    if (obj.getPersistedModel) {
        // if obj is of proper type/structure
        var doc = obj.getPersistedModel();
        if (doc && doc !== {}) {
            // if a persistance model is defined for this model
            db.insert(doc, function (err, data) {
                if (!err && !data.ok) {
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