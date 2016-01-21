'use strict';

app.controller('MainCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

   $state.go('start');

   $scope.goToUser = function(username) {
      $state.go('user', {
         username: username
      });
   }

   $scope.search = function() {

      $scope.users = undefined;
      $scope.noResult = false;

      $http.get('https://api.github.com/search/users', {
         params: {
            q: $scope.username
         }
      }).success(function(data) {
         $scope.users = data.items;
         if($scope.users.length <= 0)
            $scope.noResult = true;
      });

   };
   
}]);