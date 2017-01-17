angular.module('app.controllers', [])

.controller('expenseCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $http, $ionicLoading, $ionicPopup) {

    $scope.showAlert = function(title, message) {
      $ionicPopup.alert({
        title: title,
        template: message
      });
    };

    $scope.form = {};

    // show loading icon
    $scope.show = function() {
      $scope.loading = $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner>',
        content: 'Submitting...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200
      });
    };

    // hide loading icon
    $scope.hide = function() {
      $ionicLoading.hide();
    };

    // when submit button is pressed
    $scope.submit = function(expense) {
      $scope.show();
      if ($scope.form.expenseForm.$valid) {
        $scope.addExpense(expense);
      } else {
        $ionicLoading.show({
          template: 'Please enter a valid amount',
          duration: 1000
        });
      }
    };

    // call expense API
    $scope.addExpense = function(expense) {
      $scope.show();
      $scope.buttonDisabled = true;
      var link;
      var apiCall = {
        method: 'POST',
        url: 'https://www.api-end-point.com',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          amount: expense.amount,
          description: expense.description,
          category: expense.category
        }
      };

      $http(apiCall).then(function(successResponse) {
        $scope.hide();
        $scope.buttonDisabled = false;
        $scope.showAlert("Done", "Spreadsheet updated! :)");
      }, function(failedResponse) {
        $scope.hide();
        $scope.buttonDisabled = false;
        $scope.showAlert("Error", "Something went wrong :(");
      });
    };

    // category dropdown
    $scope.categories = [{
      name: 'Food'
    }, {
      name: 'Entertainment'
    }, {
      name: 'Utilities'
    }, {
      name: 'Travel'
    }, {
      name: 'Cigs'
    }, {
      name: 'Transportation'
    }, {
      name: 'To Family'
    }, {
      name: 'Investments'
    }, {
      name: 'Shopping'
    }, {
      name: 'Debts'
    }, {
      name: 'Health'
    }, {
      name: 'Gifts'
    }, {
      name: 'Work'
    }, {
      name: 'Others'
    }];

  }
]);