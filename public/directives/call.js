'use strict';

angular.module('mean.call')
.filter('isPast', function() {
    return function(dateString) {
        return !moment().isAfter(dateString, 'day');
    };
}).filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).locale('es').format(format);
    };
});

