import {process, getApiVersion} from '../../../helpers/responseProcessing';
import {getById} from '../../v1/messages/getMessage';
import PalindromeModel from '../../../models/palindromeModel';
import {ErrorCodes} from '../../../helpers/errorCodes';
import ErrorModel from '../../../models/errorModel';
import {Strings} from '../../../strings/strings-en';

/**
 * Defining an api to get whether a message is palindrome, since it doesn't directly match the REST concept of a resource,
 *  needs more discussion on what the use case is and how the api is expected to be.
 * Since I don't have access to the actual requirements (and this is not a real case project), I'm implementing two different approaches
 * in v1 of this api (under v1 folder), messages/<id>/palindrome returns different status code based on whether it is palindrome or not, 
 *      but doesn't return any object because no real resource is associated to it
 * in v2 of this api (this file), messages/<id>/palindrome returns an augmented message object which includes palindrome as a boolean property
 *  the reason a new path and a new resource is created (as opposed to changing messageModel) is:
 *      messageModel is used by other apis that don't or shouldn't have isPalindrome. 
 *                  e.g. there is no requirement to return isPalindrome for getAll
 *                  if there was an update api for message:
 *                      - adding isPalindrome to the object would make PUT logic have to care about making isPalindrome readonly, also confuses user what to do with it when creating the object based on GET
 *                      - not adding isPalindrome to the object would make PUT and GET inconsistent
 */
export default function getPalindrome(req, res) {
    getById(req, (errStatus, responseObj) => {
        const version = getApiVersion(req);
        if(!errStatus) {
            // no error, we found the message.
            const message = PalindromeModel.copy(responseObj);
            // getApiModel for this version will return an object containing isPalindrome
            return process({status: 200, data: message.getApiModel(version)}, req, res);
        }
        // there was an error, so returned object is ErrorModel if handled by getById
        if(responseObj && responseObj.modelName === 'ErrorModel') {
            // getById already built an api ready error, so use it
            return process({status: errStatus, data: responseObj.getApiModel(version)}, req, res);
        } else {
            console.log(responseObj || errStatus);
            return process({status: errStatus, data: new ErrorModel(ErrorCodes.MESSAGE_GET_PALINDROME_FAIL, Strings.ERROR_INTERNAL_SERVER)}, req, res);
        }
    });
}