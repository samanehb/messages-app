import {process, getApiVersion} from '../../../helpers/responseProcessing';
import {insert} from '../../../database/cloudantClient';
import MessageModel from '../../../models/messageModel';
import ErrorModel from '../../../models/errorModel';

export default function getMessage(req, res) {
    const messageId = req.params ? req.params.messageId : undefined;
    //return new Promise((resolve, reject) => {
    if(!messageId) {
        return process({status: 400, data: new ErrorModel('E101', 'Provide a message Id as path parameter.')}, req, res);
    } else {
        const message = new MessageModel('TODO', messageId);
        return process({status: 200, data: message.getApiModel(getApiVersion(req))}, req, res);
    }
    //});
}