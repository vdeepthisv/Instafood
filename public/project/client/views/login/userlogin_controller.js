(function () {
  "use strict";
  
  angular
    .module("Instafood")
    .controller("LoginController", LoginController);

  function LoginController($scope, $location, $rootScope, UserService, ngDialog) {
    $rootScope.user = null;
    $rootScope.itemId = null;
    $scope.login = login;

    function login() {
      var username = $scope.user.username;
      var password = $scope.user.password;
      UserService.login(username, password).then(loggedInUser);
    }

    function loggedInUser(userObj) {
      if(userObj != null) {
        $rootScope.user = userObj;
        $location.url("/item");
      }
      else {
        ngDialog.open({
            template: 'css/messages/invaliddetails.html',
        });
      }
    }
  }
})();