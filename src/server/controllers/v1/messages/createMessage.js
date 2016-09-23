import {process, getApiVersion} from '../../../helpers/responseProcessing';
import {ErrorCodes} from '../../../helpers/errorCodes';
import {Strings} from '../../../strings/strings-en';
import {insert} from '../../../database/cloudantClient';
import MessageModel from '../../../models/messageModel';
import ErrorModel from '../../../models/errorModel';

const MAX_ALLOWED_SIZE = 255;

export default function createMessage(req, res) {
    // convert response body to api model object, this also gets rid of unwanted properties
    const message = MessageModel.copy(req.body);
    // input validation
    if(!message || !message.messageContent || message.messageContent.length === 0 ||
         message.messageContent.length > MAX_ALLOWED_SIZE) {
             return process({status: 400, data: 
                 new ErrorModel(ErrorCodes.MESSAGE_CONTENT_INVALID, 
                    Strings.MESSAGE_CONTENT_VALIDATION.replace('$1', MAX_ALLOWED_SIZE))}, req, res);
    }
    
    insert(message).then((message) => {
        return process({status: 201, data: message.getApiModel(getApiVersion(req))}, req, res);
    }).catch((err) => {
        if(err && err.modelName === 'ErrorModel') {
            // cloudant client already built an api ready error, so use it
            return process({status: 500, data: err}, req, res);
        } else {
            return process({status: 500, data: new ErrorModel(ErrorCodes.MESSAGE_CREATE_FAIL, Strings.MESSAGE_STORE_FAIL)}, req, res);
        }
    });
    
}