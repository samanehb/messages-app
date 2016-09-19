"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectModel = function () {

    /**
     * param: docType: give a type for this object to be used as a key to fetch only this type from database
     * not needed to be set if the ObjectModel doesn't need to be persisted
     */
    function ObjectModel(docType) {
        _classCallCheck(this, ObjectModel);

        this._docType = docType; // not using class name, since it may change later
    }

    _createClass(ObjectModel, [{
        key: "getApiModel",


        /**
         * Returns the object that should be returned by or consumed by apis, considering the api version
         * 
         * Implementation notes: use this to hide properties that may be added to this object for application layer logic 
         *  while not needed to be seen outside
         *  This is also important for properly maintaining api models and versioning
         */
        value: function getApiModel() /*version: api versioning string*/{
            return {};
        }

        /**
         * Returns the object the way it should be persisted into database. 
         * 
         * Implementation notes: The returned object should be independent of various versioning of api models
         *  but should also not be affected by properties added to this object during manipulation of data in application layer, 
         *  only contain what needs to be persisted
         */

    }, {
        key: "getPersistedModel",
        value: function getPersistedModel() {
            return {};
        }

        /**
         * Return a simple example of what the api model should look like
         */

    }, {
        key: "getExample",
        value: function getExample() {
            return {};
        }
    }, {
        key: "modelName",
        get: function get() {
            return this.constructor.name;
        }
        /**
         * Converting raw object to this model/prototype
         */

    }], [{
        key: "copy",
        value: function copy() /*obj*/{}
    }]);

    return ObjectModel;
}();

exports.default = ObjectModel;