import MessageModel from './messageModel';

/**
 * This class is just an extension to MessageModel for returning apiModel in which a property is added to include MessageModel.isPalindrome 
 * On persistant layer, a PalindromeModel and MessageModel have same properties
 */
export default class PalindromeModel extends MessageModel {

    constructor(content, messageId, _id, _rev) {
        super(content, messageId, _id, _rev);
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
            return {}; // return default, this is an invalid state, just avoiding undefined
        }
    }
}