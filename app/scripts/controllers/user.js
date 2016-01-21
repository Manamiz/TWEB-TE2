app.controller('UserCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

   $scope.loadUserInfos = function() {
      $http.get('https://api.github.com/users/' + $scope.username)
      .success(function(data) {
         $scope.user = data;
      })
      .error(function(data) {
         alert('(GET USERS) An error occured !');
      });

      $http.get('https://api.github.com/users/' + $scope.username + '/repos')
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