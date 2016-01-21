'use strict';

app.controller('MainCtrl', ['$scope', '$http', '$state', 'githubFactory', function($scope, $http, $state, githubFactory) {

   $state.go('start');

   $scope.goToUser = function(username) {
      $state.go('user', {
         username: username
      });
   }

   $scope.search = function() {

      $scope.users = undefined;
      $scope.noResult = false;

      githubFactory.searchUser($scope.username)
         .success(function(data) {
            $scope.users = data.items;
            
            if($scope.users.length <= 0)
               $scope.noResult = true;
         });

   };
   
}]);