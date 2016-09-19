const uuid = require('node-uuid');
import ObjectModel from './objectModel';

const DOC_TYPE = 'message';

export default class MessageModel extends ObjectModel{

    /**
     * Create a MessageModel
     * Required param is : content
     * If this message object is just to be created, no need to include id (a UUID will be generated), 
     *  and _id and _rev can be set when persisted to db
     */
    constructor(content, messageId, _id, _rev) {
        super(DOC_TYPE);
        this._messageContent = content;
        this._messageId = messageId;
        this._id = _id;
        this._rev = _rev;
    }

    /**
     * See super.copy for documentation
     */
    static copy(obj) {
        return new MessageModel(obj.messageContent, obj.messageId, obj._id, obj._rev);
        
        // or try this TODO 
        //obj.prototype = MessageModel;
    }

    get messageId() {
        if(this._messageId) {
            return this._messageId;
        }
        // create UUID
        this._messageId = uuid.v1();
        return this._messageId;
    }

    get isPalindrome() {
        // Cache the result of calculation for this object in case retrieved more than once
        // If this is a highly requested property, we can think of persisting in database as part of the data, since it only changes when data/message changes
        if(this._isPalindrome !== undefined) {
            return this._isPalindrome;
        }
        // TODO
        this._isPalindrome = true;
        return this._isPalindrome;
    }

    /**
     * See super.getApiModel for documentation
     */
    getApiModel(version) {
        if(version.toLowerCase() === 'v1') {
            return {
                messageContent: this._messageContent, 
                messageId: this.messageId
            };
        } else { // else handle future versions here
            return {}; // return default, this is an invalid state, just avoiding undefined
        }
    }

    /**
     * See super.getPersistedModel for documentation
     * Note: No property can start with _ , except cloudant's special ones -> cloudant restriction 
     */
    getPersistedModel() {
        return {
            messageContent: this._messageContent, 
            messageId: this.messageId, // make sure UUID is set if not already
            _id: this._id,
            _rev: this._rev,
            docType: this._docType // always also add docType, good for indexing, views, etc
        };
    }

}