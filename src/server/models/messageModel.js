const uuid = require('node-uuid');
import ObjectModel from './objectModel';

const DOC_TYPE = 'message'; // don't change this constant since data is persisted with this type

export default class MessageModel extends ObjectModel{

    /**
     * Create a MessageModel
     * Required param is : content
     * If this message object is just to be created, no need to include id (a UUID will be generated), 
     *  and _id and _rev can be set when persisted to db
     */
    constructor(content, messageId, _id, _rev) {
        super();
        // param: docType: give a type for this object to be used as a key to fetch only this type from database
        this._docType = DOC_TYPE; // not using class name, since it may change later
        this._messageContent = content;
        this._messageId = messageId;
        this._id = _id;
        this._rev = _rev;
    }

    /**
     * See super.copy for documentation
     */
    static copy(obj) {
        if(!obj) {
            return undefined;
        }
        return new MessageModel(obj.messageContent, obj.messageId, obj._id, obj._rev);
    }

    get messageId() {
        if(this._messageId) {
            return this._messageId;
        }
        // create UUID
        this._messageId = uuid.v1();
        return this._messageId;
    }

    get messageContent() {
        return this._messageContent;
    }

    /**
     * See super.getApiModel for documentation
     */
    getApiModel(version) {
        if(version.toLowerCase() === 'v1' || version.toLowerCase() === 'v2') {
            return {
                messageContent: this.messageContent, 
                messageId: this.messageId
            };
        } else { // else handle future versions here
            return super.getApiModel(version, true); // return default, this is an invalid state (see documentation of super)
        }
    }

    /**
     * See super.getPersistedModel for documentation
     * Note: No property can start with _ , except cloudant's special ones -> cloudant restriction 
     */
    getPersistedModel() {
        return {
            messageContent: this.messageContent, 
            messageId: this.messageId, // make sure UUID is set if not already
            _id: this._id,
            _rev: this._rev,
            docType: this._docType // always also add docType, good for indexing, views, etc
        };
    }

}