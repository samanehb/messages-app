import {process, getApiVersion} from '../../../helpers/responseProcessing';
import {ErrorCodes} from '../../../helpers/errorCodes';
import {Strings} from '../../../strings/strings-en';
import {getAllMessages} from '../../../database/cloudantClient';
import MessageModel from '../../../models/messageModel';
import ErrorModel from '../../../models/errorModel';

export default function getAll(req, res) {
    const version = getApiVersion(req);
    const serverErr = new ErrorModel(ErrorCodes.MESSAGE_GETALL_FAIL, Strings.MESSAGE_RETREIVE_FAIL);
    getAllMessages().then((messages) => {
        if(!messages) { // even if there are no messages, this should have returned an empty array
            return process({status: 500, data: serverErr}, req, res);
        }
        // map each database document to a proper api model
        const messageModels = messages.map((item) => {
            const mm = MessageModel.copy(item);
            if(mm) {
                return mm.getApiModel(version);
            }
        });
        return process({status: 200, data: messageModels}, req, res);
    }).catch((err) => {
        if(err && err.modelName === 'ErrorModel') {
            // cloudant client already built an api ready error, so use it
            return process({status: 500, data: err}, req, res);
        } else {
            console.log(err);
            return process({status: 500, data: serverErr}, req, res);
        }
    });
    
}