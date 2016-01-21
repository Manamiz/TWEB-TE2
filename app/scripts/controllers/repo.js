app.controller('RepoCtrl', ['$scope', '$http', '$state', 'githubFactory', function($scope, $http, $state, githubFactory) {

   $scope.languagesLabels = [];
   $scope.languagesData = [];

   $scope.contributorsCommitsLabels = [];
   $scope.contributorsCommitsData = [];

   $scope.commitsActivityLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   $scope.commitsActivityData = [0, 0, 0, 0, 0, 0, 0];

   $scope.loadRepoInfos = function() {

      githubFactory.getRepo($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.repo = data;
         })
         .error(function(data) {
            alert('(GET REPOS) An error occured !');
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


      githubFactory.getRepoLanguages($scope.username, $scope.repoName)
         .success(function(data) {
            angular.forEach(data, function(value, key) {
               $scope.languagesLabels.push(key);
               $scope.languagesData.push(value);
            });
         })
         .error(function(data) {
            alert('(GET REPOS LANGUAGES) An error occured !');
         });

      githubFactory.getRepoStatsContributors($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.numberOfCommits = 0;
            angular.forEach(data, function(value, key) {
               $scope.contributorsCommitsLabels.push(value.author.login);
               $scope.contributorsCommitsData.push(value.total);

               $scope.numberOfCommits += value.total;
            });
         })
         .error(function(data) {
            alert('(GET REPOS LANGUAGES) An error occured !');
         });
         
      githubFactory.getRepoStatsCommitActivity($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.commits = data;
            angular.forEach(data, function(value, key) {
               var i = 0;
               angular.forEach(value.days, function(value) {
                  $scope.commitsActivityData[i] += value;
                  i++;
               })
            });
         })
         .error(function(data) {
            alert('(GET REPOS LANGUAGES) An error occured !');
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