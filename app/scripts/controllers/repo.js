app.controller('RepoCtrl', ['$scope', '$http', '$state', 'githubFactory', function($scope, $http, $state, githubFactory) {

   $scope.languagesLabels = [];
   $scope.languagesData = [];

   $scope.contributorsCommitsLabels = [];
   $scope.contributorsCommitsData = [];

   $scope.commitsActivityLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   $scope.commitsActivityData = [0, 0, 0, 0, 0, 0, 0];

   // Charge les infos du repo (toutes les requêtes sont faites ici)
   $scope.loadRepoInfos = function() {

      githubFactory.getRepo($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.repo = data;
         })
         .error(function(data) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });

      githubFactory.getRepoContributors($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.contributors = data;
         })
         .error(function(data) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });

      githubFactory.getRepoBranches($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.branches = data;
         })
         .error(function(data) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });


      githubFactory.getRepoLanguages($scope.username, $scope.repoName)
         .success(function(data) {
            // Création du graphique des langages
            angular.forEach(data, function(value, key) {
               $scope.languagesLabels.push(key);
               $scope.languagesData.push(value);
            });

            if(!$scope.$$phase) {
               $scope.$apply();
            }
         })
         .error(function(data) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });

      githubFactory.getRepoStatsContributors($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.numberOfCommits = 0;

            // Création du grapgique des commits des contributeurs
            angular.forEach(data, function(value, key) {
               $scope.contributorsCommitsLabels.push(value.author.login);
               $scope.contributorsCommitsData.push(value.total);

               // Compte le nombre de commits total
               $scope.numberOfCommits += value.total;
            });

            if(!$scope.$$phase) {
               $scope.$apply();
            }
         })
         .error(function(data) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });
         
      githubFactory.getRepoStatsCommitActivity($scope.username, $scope.repoName)
         .success(function(data) {
            $scope.commits = data;

            // Création du graphique des commits par jour l'année dernière
            angular.forEach(data, function(value, key) {
               var i = 0;
               
               // On additione les commits de chaque jour qu'on ajoute aux datas du graphique
               angular.forEach(value.days, function(value) {
                  $scope.commitsActivityData[i] += value;
                  i++;
               })
            });

            if(!$scope.$$phase) {
               $scope.$apply();
            }
         })
         .error(function(data) {
            alert("Error " + status + " : \n\n" + data.message);
            $scope.backToSearch();
         });

      if(!$scope.$$phase) {
         $scope.$apply();
      }
      
   }

   // Retourne à l'état utilisateur (page utilisateur)
   $scope.backToUser =  function() {
      $state.go('user', {
         username: $scope.username
      });
   }

   // Retourne à l'état de recherche (page de recherche)
   $scope.backToSearch =  function() {
      $state.go('start');
   }

}]);