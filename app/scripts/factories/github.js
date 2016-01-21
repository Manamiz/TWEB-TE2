// Factory regroupant les requêtes faites à l'API GitHub
app.factory('githubFactory', ['$http', function($http) {

   var urlBase = 'https://api.github.com';
   var githubFactory = {};

   githubFactory.searchUser = function(username) {
      return $http.get(urlBase + "/search/users", {
         params: {
            q: username
         }
      });
   }

   githubFactory.getUser = function(username) {
      return $http.get(urlBase + "/users/" + username);
   }

   githubFactory.getUserRepositories = function(username) {
      return $http.get(urlBase + "/users/" + username + "/repos");
   }

   githubFactory.getRepo = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName);
   }

   githubFactory.getRepoLanguages = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/languages');
   }

   githubFactory.getRepoContributors = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/contributors');
   }

   githubFactory.getRepoBranches = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/branches');
   }

   githubFactory.getRepoStatsContributors = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/stats/contributors');
   }

   githubFactory.getRepoStatsCommitActivity = function(username, repoName) {
      return $http.get(urlBase + '/repos/' + username + '/' + repoName + '/stats/commit_activity');
   }

   return githubFactory;
}]);