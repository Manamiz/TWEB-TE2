app.controller('RepoCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

   $scope.labels = [];
   $scope.data = [];

   $scope.loadRepoInfos = function() {
      $http.get('https://api.github.com/repos/' + $scope.username + '/' + $scope.repoName)
      .success(function(data) {
         $scope.repo = data;
      })
      .error(function(data) {
         alert('(GET REPOS) An error occured !');
      });

      $http.get('https://api.github.com/repos/' + $scope.username + '/' + $scope.repoName + '/languages')
      .success(function(data) {
         angular.forEach(data, function(value, key) {
            $scope.labels.push(key);
            $scope.data.push(value);
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