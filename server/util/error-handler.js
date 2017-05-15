function formatErrorJson(_error) {
    
    var error = {};

    if(_error.code) {
        error.code = _error.code
    };

    if(_error.message) {
        error.message = _error.message;
    } else if(typeof _error == "string") {
        error.message = _error;
    } else {
        error.message = "Oops! We can't determine the error message.";
    }

    error.originalError = _error;

    return error;

}

module.exports.formatErrorJson = formatErrorJson;