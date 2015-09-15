'use strict';

angular.module('mean.system').factory('Global', [
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: false,
            isEditor: false,
            isAdmin: false
        };
        /*
        if (window.user && window.user.roles) {
            _this._data.authenticated = window.user.roles.length;
            _this._data.isAdmin = window.user.roles.indexOf('admin') !== -1;
            _this._data.isEditor = window.user.roles.indexOf('editor') !== -1;
        }
        */
        return _this._data;
    }
]);
