import {process} from '../../../helpers/responseProcessing';
import {ErrorCodes} from '../../../helpers/errorCodes';
import {Strings} from '../../../strings/strings-en';
import {deleteMessageById} from '../../../database/cloudantClient';
import ErrorModel from '../../../models/errorModel';

export default function deleteById(req, res) {
    const messageId = req.params ? req.params.messageId : undefined;
    if(!messageId) {
        return process({status: 400, data: 
                 new ErrorModel(ErrorCodes.MESSAGE_ID_MISSING, Strings.MESSAGE_ID_MISSING)}, req, res);
    }
    deleteMessageById(messageId).then((id) => {
        if(!id) { // message not found
            return process({status: 404, data: 
                new ErrorModel(ErrorCodes.MESSAGE_NOT_FOUND, Strings.MESSAGE_DELETE_FAIL)}, req, res);
        }
        return process({status: 204}, req, res); // no content
    }).catch((err) => {
        if(err && err.modelName === 'ErrorModel') {
            // cloudant client already built an api ready error, so use it
            return process({status: 500, data: err}, req, res);
        } else {
            console.log(err);
            return process({status: 500, data: new ErrorModel(ErrorCodes.MESSAGE_DELETE_FAIL, Strings.MESSAGE_DELETE_FAIL)}, req, res);
        }
    });
    
}