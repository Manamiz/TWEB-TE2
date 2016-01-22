app.controller('UserCtrl', ['$scope', '$http', '$state', 'githubFactory', function($scope, $http, $state, githubFactory) {

   // Charge les infos de l'utilisateur (toutes les requêtes sont faites ici)
   $scope.loadUserInfos = function() {

      githubFactory.getUser($scope.username)
         .success(function(data) {
            $scope.user = data;
         })
         .error(function(data, status) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });

      githubFactory.getUserRepositories($scope.username)
         .success(function(data) {
            $scope.repos = data;

            if($scope.repos.length <= 0)
               $scope.noRepo = true;
         })
         .error(function(data, status) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });

   }

   // Va à l'état repo (page repository)
   $scope.goToRepo = function(repoName) {
      $state.go('repo', {
         username: $scope.username,
         repoName: repoName
      })
   }

   // Retourne à l'état start (page de recherche)
   $scope.backToSearch =  function() {
      $state.go('start');
   }

}]);