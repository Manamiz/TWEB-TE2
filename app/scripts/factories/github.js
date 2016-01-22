// Factory regroupant les requêtes faites à l'API GitHub
app.factory('githubFactory', ['$http', function($http) {

   var urlBase = 'https://api.github.com';
   var githubFactory = {};

   // Cherche un utilisateur
   githubFactory.searchUser = function(username) {
      return $http.get(urlBase + "/search/users", {
         params: {
            q: username
         }
      });
   }

   // Récupère un utilisateur
   githubFactory.getUser = function(username) {
      return $http.get(urlBase + "/users/" + username);
   }

   // Récupère les repositories d'un utilisateur
   githubFactory.getUserRepositories = function(username) {
      return $http.get(urlBase + "/users/" + username + "/repos");
   }

   // Récupère le repository d'un utilisateur
   githubFactory.getRepo = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName);
   }

   // Récupère les langages utilisés dans un repository
   githubFactory.getRepoLanguages = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/languages');
   }

   // Récupère les contributeurs d'un repository
   githubFactory.getRepoContributors = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/contributors');
   }

   // Récupère les branches d'un repository
   githubFactory.getRepoBranches = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/branches');
   }

   // Récupère les statistiques des contributeurs d'un repository
   githubFactory.getRepoStatsContributors = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/stats/contributors');
   }

   // Récupère les statistiques des commits d'un repository
   githubFactory.getRepoStatsCommitActivity = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/stats/commit_activity');
   }

   return githubFactory;
}]);