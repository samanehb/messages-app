import MessageModel from './messageModel';

/**
 * This class is just an extension to MessageModel for returning apiModel in which a property is added to include isPalindrome 
 * On persistant layer, a PalindromeModel and MessageModel have same properties (PalindromeModel is a MessageModel)
 */
export default class PalindromeModel extends MessageModel {

    constructor(content, messageId, _id, _rev) {
        super(content, messageId, _id, _rev);
    }

    /**
     * See super.copy for documentation
     */
    static copy(obj) {
        if(!obj) {
            return undefined;
        }
        return new PalindromeModel(obj.messageContent, obj.messageId, obj._id, obj._rev);
    }

    get isPalindrome() {
        // Cache the result of calculation for this object in case retrieved more than once
        // If this is a highly requested property, we can think of persisting in database as part of the data, since it only changes when data/message changes
        if(this._isPalindrome !== undefined) {
            return this._isPalindrome;
        }
        if(!this._messageContent) {
            // empty string can be assumed a palindrome, however we don't allow empty strings, so shouldnt come here, just to avoid err
            this._isPalindrome = true;
        } else {
            const strippedContent = this._messageContent.replace(/[^\w]|_/g, "").toLowerCase(); // ignore case and everything that is not alphanumeric
            const reversed = [...strippedContent].reverse().join('');
            this._isPalindrome = strippedContent === reversed;        
        }
        return this._isPalindrome;
    }

    /**
     * See super.getApiModel for documentation
     */
    getApiModel(version) {
        // using JSON naming convention for field names (camel case)
        if(version.toLowerCase() === 'v2') {
            return {
                messageContent: this.messageContent, 
                messageId: this.messageId,
                isPalindrome: this.isPalindrome
            };
        } else { // else handle future versions here
            return super.getApiModel(version, true); // return default, this is an invalid state (see documentation of super)
        }
    }
}