'use strict';

var app = angular.module('te2App', ['angular-loading-bar', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'chart.js']);


app.config(function($stateProvider) {

   $stateProvider.state('user', {
      url: '/user?username',
      templateUrl: 'views/user.html',
      controller: function($scope, $stateParams, $state) {
         $scope.username = $stateParams.username;
      }
   });
   $stateProvider.state('repo', {
      url: '/repo?username?repoName',
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