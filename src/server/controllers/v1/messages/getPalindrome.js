import {process} from '../../../helpers/responseProcessing';
import {getById} from './getMessage';
import PalindromeModel from '../../../models/palindromeModel';

/**
 * Defining an api to get whether a message is palindrome, since it doesn't directly match the REST concept of a resource,
 *  needs more discussion on what the use case is and how the api is expected to be.
 * Since I don't have access to the actual requirements (and this is not a real case project), I'm implementing two different approaches
 * in v1 of this api (this file), messages/<id>/palindrome returns different status code based on whether it is palindrome or not, 
 *      but doesn't return any object because no real resource is associated to it
 * in v2 of this api (under v2 folder), messages/<id>/palindrome returns an augmented message object which includes palindrome as a boolean property
 */
export default function getPalindrome(req, res) {
    getById(req, (errStatus, responseObj) => {
        if(!errStatus) {
            // no error, we found the message. now depending on whether it is palindrome, return different status code
            const message = PalindromeModel.copy(responseObj);
            if(message.isPalindrome) {
                errStatus = 204; // success - no content
            } else {
                // 422: Unprocessable Entity - (The request was well-formed but was unable to be followed due to semantic errors.)
                // in this case, it is not a 404 since message is found, the inputs are correct (so not a 400), 
                // but semantically this is not valid call since resource name is /palindrome and this message is not palindrome, so 422 makes a good response
                errStatus = 422;
            }
        }
        return process({status: errStatus}, req, res); // no content
    });
}