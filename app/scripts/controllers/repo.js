app.controller('RepoCtrl', ['$scope', '$http', '$state', 'githubFactory', function($scope, $http, $state, githubFactory) {

   $scope.labels = [];
   $scope.data = [];

   $scope.loadRepoInfos = function() {

      githubFactory.getRepo($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.repo = data;
         })
         .error(function(data) {
            alert('(GET REPOS) An error occured !');
         });

      githubFactory.getRepoLanguages($scope.username, $scope.repoName)
         .success(function(data) {
            angular.forEach(data, function(value, key) {
               $scope.labels.push(key);
               $scope.data.push(value);
            });
         })
         .error(function(data) {
            alert('(GET REPOS LANGUAGES) An error occured !');
         });

      githubFactory.getRepoContributors($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.contributors = data;
         })
         .error(function(data) {
            alert('(GET REPOS CONTRIBUTORS) An error occured !');
         });

      githubFactory.getRepoBranches($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.branches = data;
         })
         .error(function(data) {
            alert('(GET REPOS BRANCHES) An error occured !');
         });
   }

   $scope.backToUser =  function() {
      $state.go('user', {
         username: $scope.username
      });
   }

   $scope.backToSearch =  function() {
      $state.go('start');
   }

}]);