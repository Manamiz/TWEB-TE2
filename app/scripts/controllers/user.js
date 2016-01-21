app.controller('UserCtrl', ['$scope', '$http', '$state', 'githubFactory', function($scope, $http, $state, githubFactory) {

   $scope.loadUserInfos = function() {

      githubFactory.getUser($scope.username)
         .success(function(data) {
            $scope.user = data;
         })
         .error(function(data) {
            alert('(GET USERS) An error occured !');
         });

      githubFactory.getUserRepositories($scope.username)
         .success(function(data) {
            $scope.repos = data;

            if($scope.repos.length <= 0)
               $scope.noRepo = true;
         })
         .error(function(data) {
            alert('(GET USERS REPOS) An error occured !');
         });

   }

   $scope.goToRepo = function(repoName) {
      $state.go('repo', {
         username: $scope.username,
         repoName: repoName
      })
   }

   $scope.backToSearch =  function() {
      $state.go('start');
   }

}]);