'use strict';

var app = angular.module('te2App', ['angular-loading-bar', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'chart.js']);

app.run(['$http', function ($http) {
   $http.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
   $http.defaults.headers.common['Authorization'] = 'Basic ' + 'bWFuYW1pejpMb25hdXA0NDg4';
}]);

app.config(function($stateProvider) {

   $stateProvider.state('user', {
      url: '/user?username',
      templateUrl: 'views/user.html',
      controller: function($scope, $stateParams, $state) {
         $scope.username = $stateParams.username;
      }
   });
   $stateProvider.state('repo', {
      url: '/repo?username&repoName',
      templateUrl: 'views/repo.html',
      controller: function($scope, $stateParams, $state) {
         $scope.repoName = $stateParams.repoName;
         $scope.username = $stateParams.username;
      }
   });
   $stateProvider.state('start', {
      url: '/',
      templateUrl: 'views/start.html'
   });
});