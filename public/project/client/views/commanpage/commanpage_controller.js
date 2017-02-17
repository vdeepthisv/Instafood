(function () {
  "use strict";
  
  angular
  .module("Instafood")
  .controller("HeaderController", HeaderController);

  function HeaderController($http, $q, $scope, $rootScope, $location, UserService) {
    $scope.showNotifications = showNotifications;
    $scope.logout = logout;
    $scope.login = login;
    $scope.signUp = signUp;
    $scope.search = search;

    function showNotifications() {
      $location.url("/displayinfo");
    }

    function search() {
      $location.url("/findfood");
    }

    function signUp() {
      $location.url("/register");
    }

    function login() {
      $location.url("/login");
    }

    function logout(){
      UserService.logout().then(function(){
          $rootScope.user = null;
          $location.path('/login');
      })
    }
   
  }
})();