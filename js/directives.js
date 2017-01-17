angular.module('app.directives', [])

.directive('formManager', [function($ionicLoading) {


  return {
    restrict: 'A',
    controller: function($scope) {

      $scope.$watch('expenseForm.$valid', function() {
        console.log("Form validity changed. Now : " + $scope.expenseForm.$valid);
      });

      $scope.submit = function() {

        console.log("adfasdf");

        if ($scope.expenseForm.$valid) {
          console.log("sfd");
        } else {
          $ionicLoading.show({
            template: 'Form Is Not Valid',
            duration: 1500
          });
        }


      };
    }
  };


}]);