import {process, getApiVersion} from '../../helpers/responseProcessing';
import {insert} from '../../database/cloudantClient';
import MessageModel from '../../models/messageModel';
import ErrorModel from '../../models/errorModel';

export default function createMessage(req, res) {
    //return new Promise((resolve, reject) => {
    // convert response body to api model object
    let message = MessageModel.copy(req.body);
    insert(message, (err, message) => {
        if(err) {
            return process({status: 500, data: new ErrorModel('E100', 'Failed to store message.')}, req, res);
        } else {
            return process({status: 201, data: message.getApiModel(getApiVersion(req))}, req, res);
        }
        
    });
    
    //});
    
}