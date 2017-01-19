angular.module('app.controllers', [])

.controller('expenseCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $http, $ionicLoading, $ionicPopup) {

    $scope.form = {};

    $scope.expense = {
      "amount": "",
      "description": ""
    };

    // reset form inputs
    $scope.resetForm = function() {
      $scope.expense.amount = "";
      $scope.expense.description = "";
      $scope.form.expenseForm.$setPristine();
    };

    // show response after form submit
    $scope.popupResult = function(title) {
      $ionicPopup.alert({
        title: title,
        buttons: [{
          type: 'button icon ion-checkmark button-dark'
        }]
      });
      $ionicLoading.hide();
      $scope.buttonDisabled = false;
    };

    // show loading overlay
    $scope.showLoading = function() {
      $scope.loading = $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner>',
        content: 'Submitting...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200
      });
    };

    // when submit button is pressed
    $scope.submit = function(expense) {
      console.log($scope.form.expenseForm.$valid);
      if ($scope.form.expenseForm.$valid) {
        $scope.showLoading();
        $scope.buttonDisabled = true;
        $scope.addExpense(expense);
      } else {
        console.log("inside else");
        $ionicLoading.show({
          template: '<i class="icon ion-alert-circled"></i> Please enter a valid amount',
          showBackdrop: false,
          animation: '',
          duration: 1000,
          showDelay: 0
        });
      }
    };

    // call expense API
    $scope.addExpense = function(expense) {
      $http.get('templates/secrets.json').success(function(data) {
        var apiCall = {
          method: 'POST',
          url: data.apiUrl,
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
            api_token: data.apiToken
          }
        };

        $http(apiCall).then(function(successResponse) {
          $scope.popupResult('<center>Spreadsheet updated :)</center>');
          $scope.resetForm();
        }, function(failedResponse) {
          $scope.popupResult('<center>Something went wrong :(</center>');
        });
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