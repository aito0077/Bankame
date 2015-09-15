'use strict';

angular.module('mean.call').factory('CallQuery', ['Call',
  function(Call) {
    return {
      getOpenCall: function(callback) {
        Call.query(function(res) {
          var calls = res.filter(function(call){
            return call.status === 'OPEN';
          });

          if(calls.length > 0){
            callback(calls[0]);  
          }else{
            callback(null);
          }
          
        });
      }

    };
  }
]);
