'use strict';

app.controller('MainCtrl', ['$scope', '$http', '$state', 'githubFactory', function($scope, $http, $state, githubFactory) {

   // Lors du démarrage on affiche l'état start (page de recherche)
   $state.go('start');

   // Va à l'état user (page utilisateur)
   $scope.goToUser = function(username) {
      $state.go('user', {
         username: username
      });
   }

   // Lance une recherche (requête http)
   $scope.search = function() {

      $scope.users = undefined;
      $scope.noResult = false;

      githubFactory.searchUser($scope.username)
         .success(function(data) {
            $scope.users = data.items;
            
            // Si pas de résultats => affiche 'No result found'
            if($scope.users.length <= 0)
               $scope.noResult = true;
         })
         .error(function(data, status) {
            alert("Error " + status + " : \n\n" + data.message);
         })

   };
   
}]);