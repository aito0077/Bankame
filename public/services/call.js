'use strict';

angular.module('mean.call').factory('Call', ['$resource', function($resource) {
    return $resource('/api/calls/:callId', {
            callId: '@id'
        }, {
            update: {
                method: 'PUT'
            },
        }
    );
}])
.service('currentCall', function () {
    this._current = null;

    this.current = function() {
        return this._current;
    };

    this.setCurrent = function(call) {
        this._current = call;
    };

});
