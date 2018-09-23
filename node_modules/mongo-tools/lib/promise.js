'use strict';

var Q = require('q');

module.exports = function (method, query) {
    var deferred = Q.defer();
    method(query, function (err, result) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(result);

    });
    return deferred.promise;
};