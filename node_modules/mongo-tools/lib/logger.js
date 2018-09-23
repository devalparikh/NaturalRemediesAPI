function Logger() {
    'use strict';

    var self = this;

    self.error = function (message) {
        console.error(new Date() + ' - [ERROR]: ' + message);
    };

    self.info = function (message) {
        console.info(new Date() + ' - [INFO]: ' + message);
    };

    self.warn = function (message) {
        console.warn(new Date() + ' - [WARN]: ' + message);
    };

}

module.exports = new Logger();
