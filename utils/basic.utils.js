const httpStatus = require("http-status");
const moment = require("moment");
const constants = require("./constants");

module.exports = {
    simpleStringify: function (object) {
        var simpleObject = {};
        for (var prop in object) {
            if (!object.hasOwnProperty(prop)) {
                continue;
            }
            if (typeof (object[prop]) == 'object') {
                continue;
            }
            if (typeof (object[prop]) == 'function') {
                continue;
            }
            simpleObject[prop] = object[prop];
        }
        return JSON.stringify(simpleObject); // returns cleaned up JSON
    },
    logDatetime: function(){
        return moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    logger: function(TAG, message){
        console.log(`[${this.logDatetime()}][${TAG}] ${message}`);
    },
    generateResponse: function(res, statusCode, message, fields){
        let response = {
            statusCode:httpStatus.INTERNAL_SERVER_ERROR,
            message: constants.messages.SOMETHING_WRONG,
        }
        if(statusCode) response.statusCode = statusCode
        if(message) response.message = message
        if(fields)
        {
            response['data'] = fields
        }
        
        return res.status(statusCode).send(response)
    }

}
