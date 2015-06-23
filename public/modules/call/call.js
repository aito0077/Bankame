'use strict';

angular.module('mean.call')
.controller('CallController', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'Global', 'Call', 'CallQuery', 'currentCall', function($scope, $state, $stateParams, $location, $timeout, Global, Call, CallQuery, currentCall) {

    $scope.global = Global;
    $scope.stages = ['share_resource', 'apply_project', 'evaluation'];
    $scope.share_resource = 'FUTURE'; 
    $scope.apply_project = 'FUTURE';
    $scope.evaluation = 'FUTURE';

    $scope.hasAuthorization = function(call) {
        return $scope.global.isAdmin || $scope.global.isEditor; 
    };

    $scope.calculateCurrentPhase = function(stage, stage_id) {
        if(stage) {
            if( !moment().isBefore(stage.start_date, 'day') &&  !moment().isAfter(stage.end_date, 'day') ) {
                $scope[stage_id] = 'ACTIVE';
                $state.transitionTo('call by id.'+stage_id);
            }
            if( moment().isBefore(stage.start_date, 'day') ) {
                $scope[stage_id] = 'FUTURE';
            }
            if( moment().isAfter(stage.end_date, 'day') ) {
                $scope[stage_id] = 'PAST';
            }
        }
    };

    $scope.currentPhase = function(stage_id) {
        return $scope.stageStatus[stage_id];
    };

    $('#topics').selectize({
        selectOnTab: true,
        items: $scope.scopes,
        create: function(input) {
            return {
                value: input,
                text: input
            };
        }
    });

    $scope.related_stages = {
        share_resource: 'apply_project',
        apply_project: 'evaluation',
        evaluation: 'show_results'
    };

    $scope.prepareForCreation = function() {
        _.each($scope.stages, function(component) {
            $('input[name="'+component+'"]').daterangepicker( { 
                    format: 'DD-MM-YYYY'
                }, function(start, end, label) {
                    if($scope[component]) {
                        $scope[component].startDate = start;
                        $scope[component].endDate = end;
                    } else {
                        $scope[component] = {
                            startDate: start,
                            endDate: end
                        };
                    }
                    if($scope[$scope.related_stages[component]]) {
                        $scope[$scope.related_stages[component]].startDate = end; 
                    } else {
                        $scope[$scope.related_stages[component]] = {
                            startDate: end,
                            endDate: end
                        };
                    }
                }
            );
        });
    };


    $scope.prepareForEdition = function() {
        Call.get({
            callId: $stateParams.callId

        }, function(call) {
            $scope.call = call;
            $scope.prepareForCreation();
        });

    };

    $scope.create = function(isValid) {
      if (isValid) {
        var call_values = {
            name: this.name,
            context: this.context,
            scopes: (this.scopes || '').split(','),
            stages: {}
        };
        _.each($scope.stages, function(component) {
            if($scope[component]) {
                call_values.stages[component] = {};
                call_values.stages[component].start_date = moment($scope[component].startDate, 'DD-MM-YYYY').toDate();
                call_values.stages[component].end_date = moment($scope[component].endDate, 'DD-MM-YYYY').toDate();
            }
        });

        
        var call = new Call(call_values);

        call.references = [
            {
                name: 'Bases y Condiciones',
                text: $scope.bases,
                url: 'bases'
            },
            {
                name: 'Criterios de Evaluación',
                text: $scope.criterios,
                url: 'criterios'
            }
        ];

        call.$save(function(response) {
            $location.path('call/' + response.id);
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.cancel = function() {
        $location.path('call');
    };

    $scope.remove = function(call) {
      if (call) {
        call.$remove(function(response) {
          for (var i in $scope.call) {
            if ($scope.call[i] === call) {
	      $scope.call.splice(i,1);
            }
          }
          $location.path('call');
        });
      } else {
        $scope.call.$remove(function(response) {
          $location.path('call');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var call = $scope.call;
        if(!call.updated) {
          call.updated = [];
        }
        call.updated.push(new Date().getTime());

        call.$update(function() {
          $location.path('call/' + call.id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
        Call.query(function(calls) {
            $scope.calls = calls;
        });
    };

    
    $scope.findOne = function() {
        if(!currentCall.current()) {
            CallQuery.getOpenCall(function(call){
                $scope.call = call;
                currentCall.setCurrent(call);
                _.each($scope.stages, function(component) {
                    $scope.calculateCurrentPhase(call.stages[component], component);
                });
            });     
        } else {
            $scope.call = currentCall.current();
            $timeout(function () {
                _.each($scope.stages, function(component) {
                    $scope.calculateCurrentPhase($scope.call.stages[component], component);
                });
            });
        }

    };

    $scope.loadData = function() {
        if(!currentCall.current()) {
            CallQuery.getOpenCall(function(call){
                $scope.call = call;
                currentCall.setCurrent(call);
                _.each($scope.stages, function(component) {
                    $scope.calculateCurrentPhase(call.stages[component], component);
                });
            });     
        } else {
            $timeout(function () {
                $scope.call = currentCall.current();
                _.each($scope.stages, function(component) {
                    $scope.calculateCurrentPhase($scope.call.stages[component], component);
                });
            });
        }

    };



}])
.controller('ConvocatoriaProxy', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'Global', 'Call', 'CallQuery', 'currentCall', function($scope, $state, $stateParams, $location, $timeout, Global, Call, CallQuery, currentCall) {
    $scope.call = currentCall.current();

    $scope.load = function() {
        if(!$scope.call) {
            CallQuery.getOpenCall(function(call){
                $scope.call = call;
                currentCall.setCurrent(call);
            });
        } else {
            $scope.selectedCall = currentCall.current();
        }
    };
}]);
